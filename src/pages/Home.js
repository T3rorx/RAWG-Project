import { PageList } from './PageList.js';

// La page d'accueil utilise le template PageList
// Elle affiche les jeux les plus attendus qui sortiront dans l'année suivante
export const Home = (argument = '') => {
  // Home utilise PageList sans argument pour afficher les jeux par défaut
  PageList('');
};
