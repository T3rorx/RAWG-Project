# ✅ Checklist Complète - Projet RAWG Games Database

## 📋 Vue d'ensemble
- [x] Site SPA (Single Page Application)
- [x] Utilisation de l'API RAWG
- [x] Design responsive avec base mobile
- [x] Architecture Vite (au lieu de Webpack)
- [x] SCSS obligatoire
- [x] TailwindCSS optionnel (utilisé dans notre projet)

---

## 🎯 JOUR 1 : Configuration et PageList

### Configuration de base
- [x] Configuration de l'application (Vite au lieu de Webpack)
- [x] Router fonctionnel pour les 3 pages (Home, PageList, PageDetail)
- [x] Structure de fichiers organisée
- [x] Configuration de l'API RAWG (clé API, base URL)
- [x] Variables d'environnement (.env) configurées

### Page d'accueil (Home)
- [x] Template PageList utilisé sur la page d'accueil
- [x] Affichage des jeux les plus attendus qui sortiront dans l'année suivante
- [x] Grille 3x3 fixe (9 jeux affichés)
- [x] Navigation fonctionnelle vers PageDetail

### Template PageList
- [x] Liste de jeux affichés sous forme de cards
- [x] Barre de recherche fonctionnelle (dans le header)
- [x] Select de tri disponible avec options :
  - [x] Nom
  - [x] Release Date
  - [x] Popularity
  - [x] Average rating
- [x] Maximum 9 jeux affichés par défaut
- [x] Bouton "Show more" pour afficher 9 jeux supplémentaires
- [x] Bouton "Show more" disparaît après 2 clics (27 jeux au total)
- [x] Cards de jeux avec :
  - [x] Image de présentation
  - [x] Nom du jeu
  - [x] Plateformes disponibles (logos)
- [x] Effet hover sur les cards affichant :
  - [x] Date de sortie
  - [x] Éditeur
  - [x] Genre(s)
  - [x] Note moyenne
  - [x] Nombre de votes
- [x] Navigation vers PageDetail au clic sur une card

### Navigation depuis PageList
- [x] Clic sur un studio de développement → affiche les jeux du studio
- [x] Clic sur un développeur → affiche les jeux du développeur
- [x] Clic sur un éditeur → affiche les jeux de l'éditeur
- [x] Clic sur une plateforme → affiche les jeux les plus récemment sortis sur cette plateforme

---

## 🎯 JOUR 2 : SCSS et PageDetail

### Intégration SCSS
- [x] Variables SCSS pour :
  - [x] Couleurs récurrentes
  - [x] Tailles de marges
  - [x] Typographies
  - [x] Tailles de typos
  - [x] Tailles récurrentes
- [x] Au moins 2 mixins personnalisés (choix libre)
  - [x] `@mixin flex-center`
  - [x] `@mixin text-ellipsis`
- [x] Mixin pour le responsive mobile obligatoire :
  ```scss
  @mixin mobile {
    @media (max-width: $mobile-width) {
      @content;
    }
  }
  ```
- [x] Mixins supplémentaires :
  - [x] `@mixin tablet`
  - [x] `@mixin desktop`
- [x] Respect de la maquette Figma (forme globale)
- [x] Base mobile fonctionnelle (site ne doit pas être 100% cassé)

### Template PageDetail - Données à afficher
- [x] Nom du jeu
- [x] Image principale de présentation
- [x] Description du jeu
- [x] Date de sortie
- [x] Nom du/des studio(s) de développement (lien(s) interne(s) vers PageList)
- [x] Tags correspondants au jeu (lien(s) interne(s) vers PageList)
- [x] Genre(s) du jeu (lien(s) interne(s) vers PageList)
- [x] Nom de l'éditeur (lien(s) interne(s) vers PageList)
- [x] Plateformes disponibles (lien(s) interne(s) vers PageList)
- [x] Site Web du jeu (lien externe)
- [x] Vidéo de présentation (Lecteur HTML5 interne)
- [x] Moyenne des notes
- [x] Nombre de notes
- [x] Quatre screenshots du jeu
- [x] Lien(s) pour acheter le jeu (lien(s) externe(s))

### PageDetail - Affichage conditionnel
- [x] Si un détail n'existe pas, ne pas l'afficher (pas de "N/A" ou texte vide)

### PageDetail - Navigation
- [x] Clic sur développeur → PageList avec jeux du développeur
- [x] Clic sur éditeur → PageList avec jeux de l'éditeur
- [x] Clic sur genre → PageList avec jeux du genre
- [x] Clic sur tag → PageList avec jeux du tag
- [x] Clic sur plateforme → PageList avec jeux de la plateforme (les plus récemment sortis)

---

## 🎯 JOUR 3 : Finalisation et Bonus

### Finalisation PageDetail
- [x] Toutes les sections affichées correctement
- [x] Vidéo HTML5 fonctionnelle
- [x] Screenshots affichés (4 premiers)
- [x] Liens d'achat fonctionnels
- [x] Section "Jeux similaires" fonctionnelle

### Animations
- [x] Animation obligatoire : liens internes soulignés au hover (premier exemple du Codepen fourni)
  - [x] Animation avec transition du soulignement (::after avec width transition)
- [x] Animations supplémentaires (optionnel, si inspiration)
  - [x] Transitions sur les cartes
  - [x] Hover effects sur les cards

### URL et Navigation SPA
- [x] Navigation via hash (#)
- [x] URL pour un jeu : `#pagedetail/{id}` (utilise l'ID)
- [x] Router fonctionnel avec hashchange
- [x] Pas de rechargement de page

### Design et UX
- [x] Design cohérent avec les maquettes Figma
- [x] Responsive design (base mobile)
- [x] Transitions fluides
- [x] États hover fonctionnels
- [x] Liens externes vs internes différenciés visuellement

---

## 🚀 FONCTIONNALITÉS BONUS (Optionnel)

### Niveau 1 - Bonus de base
- [ ] Hover sur une card → afficher la vidéo de présentation (si disponible)
- [ ] Grille Masonry pour afficher les jeux dans PageList
- [ ] Transitions de page au changement de page

### Niveau 2 - Bonus avancé
- [ ] Template Screenshots affichant l'ensemble des screenshots d'un jeu
- [x] Slider d'images au clic sur une image du template Screenshots
- [ ] Filtres supplémentaires sur PageList (à gauche) :
  - [ ] Par genre
  - [ ] Par plateforme
  - [ ] Par date de sortie
  - [ ] Par éditeur

---

## 🔧 CONTRAINTES TECHNIQUES

### Architecture
- [x] SPA (Single Page Application)
- [x] Pas de rechargement de page
- [x] Navigation via hash (#)
- [x] Router client-side fonctionnel

### Styling
- [x] SCSS obligatoire
- [x] Variables SCSS pour couleurs, marges, typos, tailles
- [x] Au moins 3 mixins (dont 1 pour mobile)
  - [x] `@mixin mobile`
  - [x] `@mixin tablet`
  - [x] `@mixin desktop`
  - [x] `@mixin flex-center`
  - [x] `@mixin text-ellipsis`
- [x] TailwindCSS optionnel (utilisé dans notre projet)
- [x] Respect de la maquette (forme globale)

### Responsive
- [x] Base mobile fonctionnelle
- [x] Site ne doit pas être 100% cassé sur mobile
- [x] Breakpoints définis ($mobile-width, $tablet-width, $desktop-width)

### API et Données
- [x] Utilisation de l'API RAWG
- [x] Gestion des erreurs API
- [x] Gestion de la limite de requêtes (jeux similaires, vidéos YouTube)
- [x] Pagination fonctionnelle (Show more)

### Liens et Navigation
- [x] Liens internes : changement de couleur ou soulignement au hover
- [x] Liens externes : soulignés par défaut
- [x] Animation obligatoire sur les liens internes (soulignement au hover)
  - [x] Animation avec transition (::after avec width transition)

---

## 📱 PAGES ET TEMPLATES

### Page d'accueil
- [x] Utilise le template PageList
- [x] Affiche les jeux les plus attendus (année suivante)
- [x] Grille 3x3 (9 jeux)
- [x] Navigation vers PageDetail

### Template PageList
- [x] Liste de jeux en cards
- [x] Recherche fonctionnelle
- [x] Tri fonctionnel
- [x] Pagination (Show more)
- [x] Hover sur cards
- [x] Navigation vers PageDetail
- [x] Filtres par développeur/éditeur/plateforme/genre/tag

### Template PageDetail
- [x] Toutes les informations du jeu
- [x] Affichage conditionnel (masquer si absent)
- [x] Liens internes vers PageList
- [x] Liens externes (site web, achats)
- [x] Vidéo HTML5
- [x] Screenshots (4 premiers)
- [x] Jeux similaires
- [x] Navigation vers PageList via clics sur métadonnées

---

## ✅ VALIDATION FINALE

### Fonctionnalités
- [x] Toutes les fonctionnalités de base implémentées
- [x] Navigation fonctionnelle entre toutes les pages
- [x] Recherche fonctionnelle
- [x] Tri fonctionnel
- [x] Filtres fonctionnels
- [x] Affichage conditionnel des données

### Design
- [x] Respect de la maquette (forme globale)
- [x] SCSS bien structuré avec variables et mixins
- [x] Responsive fonctionnel
- [x] Animations implémentées (partiellement - hover effects)

### Code
- [x] Code propre et organisé
- [x] Architecture claire
- [x] Gestion d'erreurs
- [x] Pas de doublons dans les données affichées (corrigé récemment)
- [x] Performance acceptable

### Tests
- [ ] Test sur desktop
- [ ] Test sur mobile
- [ ] Test de toutes les navigations
- [ ] Test de la recherche
- [ ] Test des filtres
- [ ] Test des liens internes/externes

---

## 📝 NOTES IMPORTANTES

### Points d'attention
- ⚠️ RAWG limite le nombre de requêtes gratuites (jeux similaires, vidéos YouTube)
- ⚠️ Les maquettes sont dans le dossier `maquettes/`
- ⚠️ Les logos SVG sont fournis si besoin
- ⚠️ URL d'un jeu : utilise l'ID (ou slug) de l'API
- ⚠️ Maximum 27 jeux affichés (3 pages de 9)

### Structure attendue
- [x] Configuration Vite (ou Webpack)
- [x] Router fonctionnel
- [x] Pages : Home, PageList, PageDetail
- [x] Utilitaires : API config, platform icons, store icons
- [x] Styles : SCSS avec variables et mixins
- [x] Responsive : base mobile

### Éléments à finaliser
- [x] Animation obligatoire des liens internes (soulignement animé au hover) ✅
- [ ] Tests complets sur différents appareils
- [ ] Fonctionnalités bonus (optionnel)

---

**Date de création :** $(date)
**Dernière mise à jour :** 2026-01-27
