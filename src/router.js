import { routes } from './routes.js';

export const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0] || '';
  
  // Pour les URLs comme #pagelist/developer/123, on combine les parties après le nom de la page
  // Format: pageName/filterType/filterValue ou pageName/argument
  let pageArgument = '';
  if (pathParts.length > 1) {
    // Si on a 3 parties (ex: pagelist/developer/123), on combine les 2 dernières
    if (pathParts.length >= 3) {
      pageArgument = `${pathParts[1]}/${pathParts[2]}`;
    } else {
      // Sinon, on prend juste la partie suivante
      pageArgument = pathParts[1];
    }
  }
  
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
