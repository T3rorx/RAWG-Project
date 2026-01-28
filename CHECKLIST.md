# ✅ Checklist Complète - Projet RAWG Games Database

## 📋 Vue d'ensemble
- [ ] Site SPA (Single Page Application)
- [ ] Utilisation de l'API RAWG
- [ ] Design responsive avec base mobile
- [ ] Architecture Webpack (ou Vite dans notre cas)
- [ ] SCSS obligatoire
- [ ] TailwindCSS optionnel (utilisé dans notre projet)

---

## 🎯 JOUR 1 : Configuration et PageList

### Configuration de base
- [ ] Configuration de l'application (Vite au lieu de Webpack)
- [ ] Router fonctionnel pour les 3 pages (Home, PageList, PageDetail)
- [ ] Structure de fichiers organisée
- [ ] Configuration de l'API RAWG (clé API, base URL)
- [ ] Variables d'environnement (.env) configurées

### Page d'accueil (Home)
- [ ] Template PageList utilisé sur la page d'accueil
- [ ] Affichage des jeux les plus attendus qui sortiront dans l'année suivante
- [ ] Grille 3x3 fixe (9 jeux affichés)
- [ ] Navigation fonctionnelle vers PageDetail

### Template PageList
- [ ] Liste de jeux affichés sous forme de cards
- [ ] Barre de recherche fonctionnelle (dans le header)
- [ ] Select de tri disponible avec options :
  - [ ] Nom
  - [ ] Release Date
  - [ ] Popularity
  - [ ] Average rating
- [ ] Maximum 9 jeux affichés par défaut
- [ ] Bouton "Show more" pour afficher 9 jeux supplémentaires
- [ ] Bouton "Show more" disparaît après 2 clics (27 jeux au total)
- [ ] Cards de jeux avec :
  - [ ] Image de présentation
  - [ ] Nom du jeu
  - [ ] Plateformes disponibles (logos)
- [ ] Effet hover sur les cards affichant :
  - [ ] Date de sortie
  - [ ] Éditeur
  - [ ] Genre(s)
  - [ ] Note moyenne
  - [ ] Nombre de votes
- [ ] Navigation vers PageDetail au clic sur une card

### Navigation depuis PageList
- [ ] Clic sur un studio de développement → affiche les jeux du studio
- [ ] Clic sur un développeur → affiche les jeux du développeur
- [ ] Clic sur un éditeur → affiche les jeux de l'éditeur
- [ ] Clic sur une plateforme → affiche les jeux les plus récemment sortis sur cette plateforme

---

## 🎯 JOUR 2 : SCSS et PageDetail

### Intégration SCSS
- [ ] Variables SCSS pour :
  - [ ] Couleurs récurrentes
  - [ ] Tailles de marges
  - [ ] Typographies
  - [ ] Tailles de typos
  - [ ] Tailles récurrentes
- [ ] Au moins 2 mixins personnalisés (choix libre)
- [ ] Mixin pour le responsive mobile obligatoire :
  ```scss
  @mixin mobile {
    @media (max-width: $mobile-width) {
      @content;
    }
  }
  ```
- [ ] Respect de la maquette Figma (forme globale)
- [ ] Base mobile fonctionnelle (site ne doit pas être 100% cassé)

### Template PageDetail - Données à afficher
- [ ] Nom du jeu
- [ ] Image principale de présentation
- [ ] Description du jeu
- [ ] Date de sortie
- [ ] Nom du/des studio(s) de développement (lien(s) interne(s) vers PageList)
- [ ] Tags correspondants au jeu (lien(s) interne(s) vers PageList)
- [ ] Genre(s) du jeu (lien(s) interne(s) vers PageList)
- [ ] Nom de l'éditeur (lien(s) interne(s) vers PageList)
- [ ] Plateformes disponibles (lien(s) interne(s) vers PageList)
- [ ] Site Web du jeu (lien externe)
- [ ] Vidéo de présentation (Lecteur HTML5 interne)
- [ ] Moyenne des notes
- [ ] Nombre de notes
- [ ] Quatre screenshots du jeu
- [ ] Lien(s) pour acheter le jeu (lien(s) externe(s))

### PageDetail - Affichage conditionnel
- [ ] Si un détail n'existe pas, ne pas l'afficher (pas de "N/A" ou texte vide)

### PageDetail - Navigation
- [ ] Clic sur développeur → PageList avec jeux du développeur
- [ ] Clic sur éditeur → PageList avec jeux de l'éditeur
- [ ] Clic sur genre → PageList avec jeux du genre
- [ ] Clic sur tag → PageList avec jeux du tag
- [ ] Clic sur plateforme → PageList avec jeux de la plateforme (les plus récemment sortis)

---

## 🎯 JOUR 3 : Finalisation et Bonus

### Finalisation PageDetail
- [ ] Toutes les sections affichées correctement
- [ ] Vidéo HTML5 fonctionnelle
- [ ] Screenshots affichés (4 premiers)
- [ ] Liens d'achat fonctionnels
- [ ] Section "Jeux similaires" fonctionnelle

### Animations
- [ ] Animation obligatoire : liens internes soulignés au hover (premier exemple du Codepen fourni)
- [ ] Animations supplémentaires (optionnel, si inspiration)

### URL et Navigation SPA
- [ ] Navigation via hash (#)
- [ ] URL pour un jeu : `/game/{slug}` (ou `#pagedetail/{id}`)
- [ ] Router fonctionnel avec hashchange
- [ ] Pas de rechargement de page

### Design et UX
- [ ] Design cohérent avec les maquettes Figma
- [ ] Responsive design (base mobile)
- [ ] Transitions fluides
- [ ] États hover fonctionnels
- [ ] Liens externes vs internes différenciés visuellement

---

## 🚀 FONCTIONNALITÉS BONUS (Optionnel)

### Niveau 1 - Bonus de base
- [ ] Hover sur une card → afficher la vidéo de présentation (si disponible)
- [ ] Grille Masonry pour afficher les jeux dans PageList
- [ ] Transitions de page au changement de page

### Niveau 2 - Bonus avancé
- [ ] Template Screenshots affichant l'ensemble des screenshots d'un jeu
- [ ] Slider d'images au clic sur une image du template Screenshots
- [ ] Filtres supplémentaires sur PageList (à gauche) :
  - [ ] Par genre
  - [ ] Par plateforme
  - [ ] Par date de sortie
  - [ ] Par éditeur

---

## 🔧 CONTRAINTES TECHNIQUES

### Architecture
- [ ] SPA (Single Page Application)
- [ ] Pas de rechargement de page
- [ ] Navigation via hash (#)
- [ ] Router client-side fonctionnel

### Styling
- [ ] SCSS obligatoire
- [ ] Variables SCSS pour couleurs, marges, typos, tailles
- [ ] Au moins 3 mixins (dont 1 pour mobile)
- [ ] TailwindCSS optionnel (utilisé dans notre projet)
- [ ] Respect de la maquette (forme globale)

### Responsive
- [ ] Base mobile fonctionnelle
- [ ] Site ne doit pas être 100% cassé sur mobile
- [ ] Breakpoints définis

### API et Données
- [ ] Utilisation de l'API RAWG
- [ ] Gestion des erreurs API
- [ ] Gestion de la limite de requêtes (jeux similaires, vidéos YouTube)
- [ ] Pagination fonctionnelle (Show more)

### Liens et Navigation
- [ ] Liens internes : changement de couleur ou soulignement au hover
- [ ] Liens externes : soulignés par défaut
- [ ] Animation obligatoire sur les liens internes (soulignement au hover)

---

## 📱 PAGES ET TEMPLATES

### Page d'accueil
- [ ] Utilise le template PageList
- [ ] Affiche les jeux les plus attendus (année suivante)
- [ ] Grille 3x3 (9 jeux)
- [ ] Navigation vers PageDetail

### Template PageList
- [ ] Liste de jeux en cards
- [ ] Recherche fonctionnelle
- [ ] Tri fonctionnel
- [ ] Pagination (Show more)
- [ ] Hover sur cards
- [ ] Navigation vers PageDetail
- [ ] Filtres par développeur/éditeur/plateforme/genre/tag

### Template PageDetail
- [ ] Toutes les informations du jeu
- [ ] Affichage conditionnel (masquer si absent)
- [ ] Liens internes vers PageList
- [ ] Liens externes (site web, achats)
- [ ] Vidéo HTML5
- [ ] Screenshots (4 premiers)
- [ ] Jeux similaires
- [ ] Navigation vers PageList via clics sur métadonnées

---

## ✅ VALIDATION FINALE

### Fonctionnalités
- [ ] Toutes les fonctionnalités de base implémentées
- [ ] Navigation fonctionnelle entre toutes les pages
- [ ] Recherche fonctionnelle
- [ ] Tri fonctionnel
- [ ] Filtres fonctionnels
- [ ] Affichage conditionnel des données

### Design
- [ ] Respect de la maquette (forme globale)
- [ ] SCSS bien structuré avec variables et mixins
- [ ] Responsive fonctionnel
- [ ] Animations implémentées

### Code
- [ ] Code propre et organisé
- [ ] Architecture claire
- [ ] Gestion d'erreurs
- [ ] Pas de doublons dans les données affichées
- [ ] Performance acceptable

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
- ⚠️ URL d'un jeu : utiliser le slug de l'API
- ⚠️ Maximum 27 jeux affichés (3 pages de 9)

### Structure attendue
- Configuration Vite (ou Webpack)
- Router fonctionnel
- Pages : Home, PageList, PageDetail
- Utilitaires : API config, platform icons, store icons
- Styles : SCSS avec variables et mixins
- Responsive : base mobile

---

**Date de création :** $(date)
**Dernière mise à jour :** $(date)
