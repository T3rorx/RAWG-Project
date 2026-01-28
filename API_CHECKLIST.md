# Checklist API RAWG - Données récupérées vs Affichées

## 📊 Champs disponibles dans l'API RAWG

### ✅ Champs actuellement utilisés et affichés

| Champ | Récupéré | Affiché | Emplacement | Notes |
|-------|----------|---------|-------------|-------|
| `id` | ✅ | ✅ | Partout | Utilisé pour les liens |
| `name` | ✅ | ✅ | Titre principal | |
| `name_original` | ❌ | ❌ | - | Non récupéré |
| `description` | ✅ | ✅ | Section description | HTML |
| `released` | ✅ | ✅ | Métadonnées | Date de sortie |
| `background_image` | ✅ | ✅ | Image principale | |
| `background_image_additional` | ✅ | ⚠️ | Fallback | Utilisé seulement si `background_image` manque |
| `rating` | ✅ | ✅ | Titre + hover cards | Note sur 5 |
| `rating_top` | ✅ | ❌ | - | Non affiché |
| `ratings_count` | ✅ | ✅ | Titre + hover cards | Nombre de votes |
| `ratings` | ✅ | ❌ | - | Objet avec détails (non affiché) |
| `developers` | ✅ | ✅ | Métadonnées | Liens cliquables |
| `publishers` | ✅ | ✅ | Métadonnées | Liens cliquables |
| `platforms` | ✅ | ✅ | Métadonnées + cards | Logos avec Iconify |
| `genres` | ✅ | ✅ | Métadonnées | Liens cliquables |
| `tags` | ✅ | ✅ | Métadonnées | Liens cliquables |
| `stores` | ✅ | ✅ | Section BUY | Logos avec liens |
| `website` | ✅ | ✅ | Bouton "Check Website" | |
| `short_screenshots` | ✅ | ✅ | Section SCREENSHOTS | 3 premiers + modal |
| `screenshots_count` | ✅ | ⚠️ | Console seulement | Utilisé pour récupérer tous les screenshots |
| `movies` | ⚠️ | ⚠️ | Section TRAILER | **PROBLÈME : Récupération séparée nécessaire** |
| `movies_count` | ✅ | ❌ | Console seulement | Non affiché |

### ❌ Champs récupérés mais NON affichés

| Champ | Récupéré | Affiché | Potentiel d'affichage | Notes |
|-------|----------|---------|----------------------|-------|
| `metacritic` | ✅ | ❌ | ⭐⭐⭐ | Score Metacritic (0-100) |
| `metacritic_url` | ✅ | ❌ | ⭐⭐⭐ | Lien vers Metacritic |
| `metacritic_platforms` | ✅ | ❌ | ⭐⭐ | Scores par plateforme |
| `esrb_rating` | ✅ | ❌ | ⭐⭐⭐ | Classification ESRB (PEGI) |
| `playtime` | ✅ | ❌ | ⭐⭐ | Temps de jeu moyen (heures) |
| `achievements_count` | ✅ | ❌ | ⭐ | Nombre d'achievements |
| `reddit_url` | ✅ | ❌ | ⭐⭐ | Lien Reddit |
| `reddit_name` | ✅ | ❌ | ⭐ | Nom du subreddit |
| `reddit_description` | ✅ | ❌ | ⭐ | Description Reddit |
| `reddit_logo` | ✅ | ❌ | ⭐ | Logo Reddit |
| `reddit_count` | ✅ | ❌ | ⭐ | Nombre de membres Reddit |
| `alternative_names` | ✅ | ❌ | ⭐ | Noms alternatifs |
| `reactions` | ✅ | ❌ | ⭐ | Réactions (emoji) |
| `added_by_status` | ✅ | ❌ | ⭐⭐ | Stats: yet, owned, toplay, playing |
| `parent_platforms` | ✅ | ❌ | ⭐ | Plateformes parentes |
| `tba` | ✅ | ❌ | ⭐⭐ | "To Be Announced" |
| `updated` | ✅ | ❌ | ⭐ | Date de mise à jour |
| `name_original` | ❌ | ❌ | ⭐ | Nom original (non récupéré) |
| `rating_top` | ✅ | ❌ | ⭐ | Note maximale possible |
| `twitch_count` | ✅ | ❌ | ⭐ | Nombre Twitch |
| `youtube_count` | ✅ | ❌ | ⭐ | Nombre YouTube |
| `reviews_text_count` | ✅ | ❌ | ⭐ | Nombre de reviews textuelles |

### 🔧 Problèmes identifiés

#### 1. Movies/Trailers ⚠️ **CRITIQUE**
- **Problème** : Les `movies` ne sont pas toujours inclus dans la réponse principale de `/games/{id}`
- **Solution** : Faire une requête séparée vers `/games/{id}/movies` si `movies_count > 0` mais `movies` est vide
- **Statut** : ✅ **CORRIGÉ** - Le code récupère maintenant les movies séparément

#### 2. Screenshots
- **Problème** : Seulement `short_screenshots` dans la réponse principale
- **Solution** : ✅ Déjà géré - Requête séparée vers `/games/{id}/screenshots` pour tous les screenshots
- **Statut** : ✅ **OK**

#### 3. Background Image Additional
- **Problème** : Utilisé seulement en fallback
- **Suggestion** : Pourrait être affiché comme image secondaire ou dans une galerie

### 📝 Console.log complet

Le code génère maintenant un console.log complet qui liste :
- ✅ Tous les champs disponibles avec leur statut (✅ disponible / ❌ non disponible)
- ✅ Le nombre d'éléments pour les arrays
- ✅ Les propriétés pour les objets
- ✅ Analyse spécifique des movies/trailers
- ✅ Récupération automatique des movies si nécessaire

### 🎯 Recommandations d'amélioration

#### Priorité Haute ⭐⭐⭐
1. **Afficher Metacritic Score** : Score et lien vers Metacritic
2. **Afficher ESRB Rating** : Classification du jeu (PEGI/ESRB)
3. **Corriger Movies/Trailers** : ✅ **FAIT** - Récupération séparée implémentée

#### Priorité Moyenne ⭐⭐
4. **Afficher Playtime** : Temps de jeu moyen
5. **Afficher Reddit Link** : Lien vers le subreddit du jeu
6. **Afficher Added by Status** : Statistiques (owned, toplay, playing, yet)
7. **Afficher TBA** : Indicateur "To Be Announced" pour les jeux à venir

#### Priorité Basse ⭐
8. **Afficher Alternative Names** : Noms alternatifs du jeu
9. **Afficher Reactions** : Réactions emoji
10. **Afficher Parent Platforms** : Plateformes parentes

### 📊 Résumé

- **Champs récupérés** : ~40 champs
- **Champs affichés** : ~20 champs
- **Champs non utilisés** : ~20 champs
- **Problèmes critiques** : 1 (Movies) ✅ **RÉSOLU**
- **Améliorations possibles** : 10+ champs supplémentaires

### 🔍 Comment utiliser cette checklist

1. Ouvrir la console du navigateur
2. Naviguer vers une page de détail de jeu
3. Vérifier le console.log complet qui liste tous les champs
4. Comparer avec cette checklist
5. Identifier les champs manquants à afficher
