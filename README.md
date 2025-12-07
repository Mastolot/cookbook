# 🍳 Mes Recettes - Site de Recettes Françaises

Un site web statique élégant pour partager et découvrir des recettes de cuisine françaises, optimisé pour GitHub Pages.

## 🌟 Fonctionnalités

### Pages Principales
- **Page d'accueil** : Hero section accueillante avec les 6 dernières recettes ajoutées
- **Index des recettes** : Affichage en grille responsive avec filtres avancés
- **Détail de recette** : Vue complète avec ingrédients, étapes détaillées et actions
- **Recherche par ingrédients** : Trouvez des recettes selon ce que vous avez dans le frigo

### Fonctionnalités Principales

#### 🔍 Filtres et Recherche
- Recherche par nom de recette
- Filtrage par catégorie (entrée, plat, dessert, accompagnement)
- Filtrage par difficulté (facile, moyen, difficile)
- Filtrage par temps de préparation
- Tri alphabétique, par temps ou par difficulté

#### 🥘 Recherche par Ingrédients
- Autocomplétion intelligente
- Ajout/suppression d'ingrédients
- Résultats triés par pourcentage de correspondance
- Affichage des ingrédients manquants

#### ❤️ Système de Favoris
- Sauvegarde locale avec localStorage
- Boutons cœur sur chaque recette
- Page dédiée aux recettes favorites

#### 📱 Design Responsive
- Mobile-first
- Grille adaptative : 3 colonnes (desktop), 2 (tablette), 1 (mobile)
- Navigation optimisée pour tous les écrans

#### 🎨 Interface Moderne
- Palette de couleurs chaleureuse (terracotta, beige, vert olive)
- Typographie élégante (Playfair Display + Lato)
- Animations subtiles au survol
- Accessibilité WCAG AA

## 📁 Structure du Projet

```
Cookbook/
├── index.html              # Page d'accueil
├── recettes.html           # Index des recettes
├── recette.html            # Template de détail
├── recherche.html          # Recherche par ingrédients
├── style.css               # Styles CSS
├── script.js               # Logique JavaScript
├── data/
│   └── recettes.json       # Base de données des recettes
├── images/                 # Photos des recettes
│   └── placeholder.svg     # Image par défaut
└── README.md              # Ce fichier
```

## 🚀 Installation et Déploiement

### Utilisation Locale

1. Clonez le repository :
```bash
git clone https://github.com/votre-nom/cookbook.git
cd cookbook
```

2. Ouvrez `index.html` dans votre navigateur, ou utilisez un serveur local :
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js
npx serve

# Avec PHP
php -S localhost:8000
```

3. Accédez à `http://localhost:8000`

### Déploiement sur GitHub Pages

1. Créez un repository GitHub
2. Poussez le code :
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-nom/cookbook.git
git push -u origin main
```

3. Activez GitHub Pages :
   - Allez dans Settings > Pages
   - Sélectionnez la branche `main`
   - Sauvegardez

4. Votre site sera disponible à : `https://votre-nom.github.io/cookbook/`

## 📸 Ajout d'Images

Pour ajouter des images de recettes :

1. Placez vos images dans le dossier `images/`
2. Nommez-les selon les recettes (ex: `lasagnes-saumon.jpg`)
3. Les chemins sont déjà configurés dans `recettes.json`
4. Format recommandé : JPG/PNG, 800x600px minimum

Note : Une image `placeholder.svg` est affichée par défaut si l'image est manquante.

## 🍽️ Recettes Incluses

Le site contient actuellement 2 recettes :

1. **Lasagnes au Saumon et Courgettes** - Des lasagnes crémeuses avec du saumon frais, des courgettes snackées et une béchamel citronnée au zaatar
2. **Paneer Butter Masala** - Curry indien crémeux et onctueux avec des cubes de paneer dans une sauce riche à base de tomates, beurre, noix de cajou et épices du nord de l'Inde

## ✏️ Personnalisation

### Ajouter une Recette

Éditez `data/recettes.json` et ajoutez un objet avec cette structure :

```json
{
  "id": 3,
  "nom": "Nom de la recette",
  "description": "Description courte et appétissante",
  "image": "images/nom-recette.jpg",
  "tempsPréparation": 20,
  "tempsCuisson": 30,
  "portions": 4,
  "difficulté": "moyen",
  "catégorie": "plat",
  "ingrédients": [
    {"nom": "farine", "quantité": 250, "unité": "g"},
    {"nom": "œufs", "quantité": 3, "unité": "pièces"}
  ],
  "étapes": [
    "Préchauffez le four à 180°C.",
    "Mélangez les ingrédients secs.",
    "Ajoutez les ingrédients liquides.",
    "Enfournez pour 30 minutes."
  ],
  "tags": ["facile", "rapide", "végétarien"]
### Modifier les Couleurs

Dans `style.css`, modifiez les variables CSS :

```css
:root {
  --background: #FAFAF9;
  --surface: #FFFFFF;
  --text-primary: #1A1A1A;
  --text-secondary: #737373;
  --accent: #E85D35;
  --accent-hover: #D04A25;
}
## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec variables CSS et Grid/Flexbox
- **JavaScript Vanilla** - Logique sans frameworks
- **LocalStorage API** - Sauvegarde de l'état des checkboxes d'ingrédients
- **Google Fonts** - Inter & Crimson Pro
- **JSON** - Base de données des recettes
- **CSS3** - Styles modernes avec variables CSS et Grid/Flexbox
- **JavaScript Vanilla** - Logique sans frameworks
- **LocalStorage API** - Sauvegarde des favoris
- **Google Fonts** - Playfair Display & Lato
- **JSON** - Base de données des recettes

## 📱 Compatibilité

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Android 90+

## ♿ Accessibilité

- Contrastes WCAG AA respectés
- Attributs `aria-label` sur les éléments interactifs
- Textes alternatifs sur les images
- Navigation au clavier
- Structure sémantique HTML5

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 👨‍💻 Auteur

Créé avec ❤️ pour partager la passion de la cuisine française.

## 🎯 Améliorations Futures

- [ ] Mode sombre
- [ ] Impression optimisée des recettes
- [ ] Conversion des unités (métrique/impérial)
- [ ] Calculateur de portions
- [ ] Notes et commentaires
- [ ] Export PDF des recettes
- [ ] Partage sur réseaux sociaux
- [ ] Version multilingue

---

Bon appétit ! 🍽️
