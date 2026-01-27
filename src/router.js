import { routes } from './routes.js';

export const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0] || '';
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  } else {
    // Route par défaut si aucune route ne correspond
    if (routes['']) {
      routes['']('');
    }
  }
};

// Initialiser le router au chargement et lors des changements d'URL
window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());
