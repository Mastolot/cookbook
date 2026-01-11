// ==============================
// FONCTIONS UTILITAIRES
// ==============================

/**
 * Formate le temps en minutes vers un format lisible
 * @param {number} minutes - Temps en minutes
 * @returns {string} - Temps formaté (ex: "1h 30min" ou "45 min")
 */
function formatTemps(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const heures = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${heures}h ${mins}min` : `${heures}h`;
}

/**
 * Retourne la classe CSS pour le badge de difficulté
 * @param {string} difficulte - Niveau de difficulté
 * @returns {string} - Classe CSS
 */
function getBadgeColor(difficulte) {
    const classes = {
        'facile': 'badge-facile',
        'moyen': 'badge-moyen',
        'difficile': 'badge-difficile'
    };
    return classes[difficulte.toLowerCase()] || 'badge-moyen';
}

// ==============================
// CHARGEMENT DES DONNÉES
// ==============================

/**
 * Charge les recettes depuis le fichier JSON
 * @returns {Promise<Object|null>} - Les données des recettes ou null en cas d'erreur
 */
async function chargerRecettes() {
    try {
        const response = await fetch('data/recettes.json');
        if (!response.ok) {
            throw new Error('Erreur de chargement des recettes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de charger les recettes. Veuillez réessayer plus tard.');
        return null;
    }
}

// ==============================
// AFFICHAGE DES RECETTES
// ==============================

/**
 * Crée le HTML d'une card de recette
 * @param {Object} recette - Objet recette
 * @returns {string} - HTML de la card
 */
function creerRecetteCard(recette) {
    const tempsTotal = recette.tempsPréparation + recette.tempsCuisson;
    
    return `
        <div class="recipe-card" onclick="window.location.href='recette.html?id=${recette.id}'">
            <div class="recipe-image">
                <img src="${recette.image}" alt="${recette.nom}" onerror="this.parentElement.innerHTML='${recette.nom}'">
            </div>
            <div class="recipe-content">
                <h3 class="recipe-card-title">${recette.nom}</h3>
                <p class="recipe-description">${recette.description}</p>
                <div class="recipe-badges">
                    <span class="badge badge-category">${recette.catégorie}</span>
                    <span class="badge ${getBadgeColor(recette.difficulté)}">${recette.difficulté}</span>
                </div>
                <div class="recipe-meta">
                    ⏱️ ${formatTemps(tempsTotal)} • 👥 ${recette.portions} personnes
                </div>
            </div>
        </div>
    `;
}

/**
 * Affiche une liste de recettes dans un conteneur
 * @param {Array} recettes - Tableau de recettes
 * @param {string} containerId - ID du conteneur HTML
 */
function afficherRecettes(recettes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (recettes.length === 0) {
        container.innerHTML = '<p class="no-results">Aucune recette trouvée</p>';
        return;
    }
    
    container.innerHTML = recettes.map(recette => creerRecetteCard(recette)).join('');
}

// ==============================
// RECHERCHE PAR INGRÉDIENTS
// ==============================

/**
 * Extrait tous les ingrédients uniques de toutes les recettes
 * @param {Array} recettes - Tableau de recettes
 * @returns {Array} - Tableau d'ingrédients uniques
 */
function extraireIngredients(recettes) {
    const ingredients = new Set();
    
    recettes.forEach(recette => {
        recette.ingrédients.forEach(ingredient => {
            ingredients.add(ingredient.nom.toLowerCase());
        });
    });
    
    return Array.from(ingredients).sort();
}

/**
 * Filtre les recettes en fonction d'une recherche textuelle
 * @param {Array} recettes - Tableau de recettes
 * @param {string} recherche - Terme de recherche
 * @returns {Array} - Recettes filtrées
 */
function filtrerRecettesParNom(recettes, recherche) {
    if (!recherche) return recettes;
    
    const termeRecherche = recherche.toLowerCase();
    return recettes.filter(recette => 
        recette.nom.toLowerCase().includes(termeRecherche) ||
        recette.description.toLowerCase().includes(termeRecherche)
    );
}

/**
 * Filtre les recettes par catégorie, difficulté, temps et végétarien
 * @param {Array} recettes - Tableau de recettes
 * @param {Object} filtres - Objet contenant les filtres
 * @returns {Array} - Recettes filtrées
 */
function filtrerRecettes(recettes, filtres) {
    return recettes.filter(recette => {
        // Filtre par catégorie
        if (filtres.categorie && recette.catégorie.toLowerCase() !== filtres.categorie.toLowerCase()) {
            return false;
        }
        
        // Filtre par difficulté
        if (filtres.difficulte && recette.difficulté.toLowerCase() !== filtres.difficulte.toLowerCase()) {
            return false;
        }
        
        // Filtre par temps
        if (filtres.temps) {
            const tempsTotal = recette.tempsPréparation + recette.tempsCuisson;
            if (filtres.temps === '30' && tempsTotal >= 30) return false;
            if (filtres.temps === '60' && (tempsTotal < 30 || tempsTotal > 60)) return false;
            if (filtres.temps === '60+' && tempsTotal <= 60) return false;
        }
        
        // Filtre par recherche texte
        if (filtres.recherche) {
            const terme = filtres.recherche.toLowerCase();
            if (!recette.nom.toLowerCase().includes(terme)) {
                return false;
            }
        }

        // Filtre végétarien
        if (filtres.vegetarien && !recette.tags.includes('végétarien')) {
            return false;
        }
        
        return true;
    });
}

// ==============================
// GESTION DES FAVORIS (non utilisé mais disponible)
// ==============================

/**
 * Récupère les IDs des recettes favorites depuis localStorage
 * @returns {Array} - Tableau d'IDs
 */
function getFavoris() {
    const favoris = localStorage.getItem('favoris');
    return favoris ? JSON.parse(favoris) : [];
}

/**
 * Ajoute ou retire une recette des favoris
 * @param {number} recetteId - ID de la recette
 */
function toggleFavori(recetteId) {
    let favoris = getFavoris();
    const index = favoris.indexOf(recetteId);
    
    if (index > -1) {
        favoris.splice(index, 1);
    } else {
        favoris.push(recetteId);
    }
    
    localStorage.setItem('favoris', JSON.stringify(favoris));
}

/**
 * Vérifie si une recette est favorite
 * @param {number} recetteId - ID de la recette
 * @returns {boolean}
 */
function estFavori(recetteId) {
    const favoris = getFavoris();
    return favoris.includes(recetteId);
}

// ==============================
// EXPORT DES FONCTIONS
// ==============================

// Les fonctions sont disponibles globalement
// Pas besoin d'export car on utilise du JavaScript vanilla sans modules
