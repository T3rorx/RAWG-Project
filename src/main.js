import './style.scss';
import './router.js';

// Gestionnaire global pour la recherche et le tri
// Fonctionne sur toutes les pages
const initGlobalSearch = () => {
  const globalSearchInput = document.getElementById('globalSearchInput');
  const globalSortSelect = document.getElementById('globalSortSelect');
  
  if (globalSearchInput) {
    let searchTimeout;
    
    globalSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.trim();
      clearTimeout(searchTimeout);
      
      searchTimeout = setTimeout(() => {
        // Si on a un terme de recherche, rediriger vers PageList avec la recherche
        if (searchTerm) {
          window.location.hash = `#pagelist/search/${encodeURIComponent(searchTerm)}`;
        } else {
          // Si le champ est vide et qu'on est sur PageList, on peut revenir à la liste par défaut
          const currentHash = window.location.hash;
          if (currentHash.startsWith('#pagelist')) {
            window.location.hash = '#pagelist';
          }
        }
      }, 500); // Debounce de 500ms
    });
    
    // Gérer la touche Entrée pour une recherche immédiate
    globalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(searchTimeout);
        const searchTerm = e.target.value.trim();
        if (searchTerm) {
          window.location.hash = `#pagelist/search/${encodeURIComponent(searchTerm)}`;
        }
      }
    });
  }
  
  if (globalSortSelect) {
    globalSortSelect.addEventListener('change', (e) => {
      const sortValue = e.target.value;
      const currentHash = window.location.hash;
      
      // Si on est sur PageList, on déclenche un événement personnalisé que PageList peut écouter
      if (currentHash.startsWith('#pagelist')) {
        window.dispatchEvent(new CustomEvent('globalSortChange', { detail: { sort: sortValue } }));
      } else {
        // Si on n'est pas sur PageList, on redirige vers PageList
        // Le tri sera appliqué par PageList lors de son initialisation
        window.location.hash = '#pagelist';
      }
    });
  }
};

// Initialiser les gestionnaires globaux une fois le DOM chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalSearch);
} else {
  initGlobalSearch();
}
