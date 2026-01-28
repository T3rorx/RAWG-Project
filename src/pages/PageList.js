import { API_KEY, API_BASE_URL } from '../config/api.js';
import { getPlatformIcon, getPlatformName } from '../utils/platformIcons.js';

const pageContent = document.querySelector('#pageContent');

export const PageList = (argument = '') => {
  let currentPage = 1;
  let currentSearch = '';
  let currentSort = 'rating'; // Par défaut : tri par rating (jeux les plus attendus)
  let allGames = [];
  let displayedCount = 0;
  let filterType = ''; // 'developer', 'publisher', 'platform', 'genre', 'tag'
  let filterValue = '';

  // Parser l'argument pour déterminer le type de filtre
  const parseArgument = (arg) => {
    if (!arg) return { type: '', value: '' };
    
    // Format: developer/123, publisher/456, platform/789, genre/123, tag/123, search/terme
    // Le navigateur décode automatiquement l'URL, donc on peut split directement
    const parts = arg.split('/');
    if (parts.length >= 2) {
      const type = parts[0];
      // Rejoindre les parties restantes au cas où la valeur contiendrait des '/' (peu probable mais possible)
      const value = parts.slice(1).join('/');
      return { type, value: decodeURIComponent(value) };
    }
    // Si pas de '/', c'est une recherche simple (format ancien pour compatibilité)
    return { type: 'search', value: decodeURIComponent(arg) };
  };

  const preparePage = () => {
    const parsed = parseArgument(argument);
    filterType = parsed.type;
    filterValue = parsed.value;
    currentPage = 1;
    displayedCount = 0;
    allGames = [];

    // Pour les plateformes : trier par défaut par date de sortie (les plus récents d'abord)
    // Seulement si on vient d'arriver sur cette page (pas si l'utilisateur a changé le tri)
    if (filterType === 'platform') {
      // Vérifier si le tri n'a pas été modifié par l'utilisateur
      const sortSelect = document.querySelector('.page-list .sort-select');
      if (!sortSelect || sortSelect.value === 'rating') {
        currentSort = 'released';
      } else {
        currentSort = sortSelect.value;
      }
    }

    // Initialiser les valeurs des inputs globaux
    const globalSearchInput = document.getElementById('globalSearchInput');
    const globalSortSelect = document.getElementById('globalSortSelect');
    
    // Synchroniser le champ de recherche global
    if (globalSearchInput) {
      if (filterType === 'search') {
        globalSearchInput.value = filterValue;
      } else {
        globalSearchInput.value = '';
      }
    }
    
    // Synchroniser le select de tri global
    if (globalSortSelect) {
      globalSortSelect.value = currentSort;
    }

    fetchGames();
  };

  const buildApiURL = (page = 1) => {
    let url = `${API_BASE_URL}/games?key=${API_KEY}&page_size=9&page=${page}`;
    let hasFilter = false;
    
    // Gestion des filtres
    if (filterType === 'developer') {
      url += `&developers=${filterValue}`;
      hasFilter = true;
    } else if (filterType === 'publisher') {
      url += `&publishers=${filterValue}`;
      hasFilter = true;
    } else if (filterType === 'platform') {
      url += `&platforms=${filterValue}`;
      hasFilter = true;
      // Pour les plateformes : afficher uniquement les jeux déjà sortis (les plus récemment sortis)
      // Format: dates=YYYY-MM-DD,YYYY-MM-DD (de, jusqu'à)
      const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
      url += `&dates=1970-01-01,${today}`; // Dates de 1970 jusqu'à aujourd'hui (jeux déjà sortis)
    } else if (filterType === 'genre') {
      url += `&genres=${filterValue}`;
      hasFilter = true;
    } else if (filterType === 'tag') {
      url += `&tags=${filterValue}`;
      hasFilter = true;
    } else if (filterType === 'search' || currentSearch) {
      const searchTerm = filterType === 'search' ? filterValue : currentSearch;
      url += `&search=${encodeURIComponent(searchTerm)}`;
      hasFilter = true;
    }

    // Gestion du tri (appliqué après les filtres)
    switch (currentSort) {
      case 'name':
        url += '&ordering=name';
        break;
      case 'released':
        url += '&ordering=-released';
        break;
      case 'popularity':
        url += '&ordering=-added';
        break;
      case 'rating':
        url += '&ordering=-rating';
        break;
      default:
        // Pour les plateformes, trier par défaut par date de sortie décroissante
        if (filterType === 'platform') {
          url += '&ordering=-released';
        } else {
          url += '&ordering=-rating';
        }
    }

    // Par défaut (pas de filtre) : jeux les plus attendus qui sortiront dans l'année suivante
    if (!hasFilter) {
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      url += `&dates=${currentYear}-01-01,${nextYear}-12-31`;
    }

    return url;
  };

  const fetchGames = () => {
    const articlesContainer = document.querySelector('.page-list .articles');
    if (articlesContainer) {
      articlesContainer.innerHTML = '<div class="text-center text-gray-400">Loading...</div>';
    }

    const apiUrl = buildApiURL(currentPage);
    console.log('🔍 URL API:', apiUrl); // Debug

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('📊 Réponse API:', responseData); // Debug
        console.log('📊 Nombre de jeux:', responseData.results?.length || 0); // Debug
        
        if (currentPage === 1) {
          allGames = responseData.results || [];
        } else {
          allGames = [...allGames, ...(responseData.results || [])];
        }
        
        displayedCount = allGames.length;
        console.log('📊 Jeux affichés:', displayedCount); // Debug
        displayResults(allGames);
        updateShowMoreButton();
      })
      .catch((error) => {
        console.error('❌ Erreur lors du chargement des jeux:', error);
        const articlesContainer = document.querySelector('.page-list .articles');
        if (articlesContainer) {
          articlesContainer.innerHTML = '<div class="error">Erreur lors du chargement des jeux. Vérifiez la console pour plus de détails.</div>';
        }
      });
  };

  const displayResults = (articles) => {
    const resultsContent = articles.map((article) => {
      // Générer les logos de plateformes (sans doublons)
      const uniquePlatforms = new Map();
      article.platforms?.forEach(p => {
        const platformSlug = p.platform.slug || p.platform.name?.toLowerCase().replace(/\s+/g, '-');
        // Utiliser le slug normalisé comme clé pour éviter les doublons
        const normalizedSlug = platformSlug?.toLowerCase().replace(/\s+/g, '-');
        if (!uniquePlatforms.has(normalizedSlug)) {
          uniquePlatforms.set(normalizedSlug, p);
        }
      });
      
      const platformIcons = uniquePlatforms.size > 0 
        ? Array.from(uniquePlatforms.values()).map(p => {
            const platformSlug = p.platform.slug || p.platform.name?.toLowerCase().replace(/\s+/g, '-');
            const platformName = getPlatformName(p.platform.name, platformSlug);
            const iconUrl = getPlatformIcon(platformSlug);
            
            // Si pas d'URL d'icône, ne rien afficher (ou afficher le nom en fallback)
            if (!iconUrl) {
              return `<span class="platform-name-small" title="${platformName}">${platformName}</span>`;
            }
            
            return `<img src="${iconUrl}" alt="${platformName}" class="platform-icon-small" title="${platformName}" onerror="this.style.display='none'; this.nextElementSibling?.style.display='inline';" /><span class="platform-name-fallback-small" style="display: none;">${platformName}</span>`;
          }).join('')
        : '<span class="no-platforms">N/A</span>';
      
      const genres = article.genres?.map(g => g.name).join(', ') || 'N/A';
      const publishers = article.publishers?.map(p => p.name).join(', ') || 'N/A';
      const rating = article.rating ? article.rating.toFixed(2) : 'N/A';
      const ratingsCount = article.ratings_count || 0;
      const released = article.released || 'Date non disponible';
      const image = article.background_image || 'https://placehold.co/400x225';
      const gameId = article.id || article.slug;

      return `
        <article class="game-card" data-game-id="${gameId}">
          <a href="#pagedetail/${gameId}" class="game-card-link-wrapper">
            <div class="game-card-default">
              <img src="${image}" alt="${article.name}" class="game-card-image" />
              <h1 class="game-card-name">${article.name}</h1>
              <div class="game-card-platforms">${platformIcons}</div>
            </div>
            <div class="game-card-hover">
              <div class="game-card-hover-content">
                <p class="game-card-released"><strong>Release Date:</strong> ${released}</p>
                <p class="game-card-publisher"><strong>Publisher:</strong> ${publishers}</p>
                <p class="game-card-genres"><strong>Genres:</strong> ${genres}</p>
                <p class="game-card-rating"><strong>Rating:</strong> ${rating}/5 (${ratingsCount} votes)</p>
              </div>
            </div>
          </a>
        </article>
      `;
    });

    const resultsContainer = document.querySelector('.page-list .articles');
    if (resultsContainer) {
      resultsContainer.innerHTML = resultsContent.join("\n");
    }
  };

  const updateShowMoreButton = () => {
    const showMoreButton = document.querySelector('.page-list .show-more-button');
    if (showMoreButton) {
      // Max 27 jeux (3 pages de 9)
      if (displayedCount >= 27) {
        showMoreButton.style.display = 'none';
      } else {
        showMoreButton.style.display = 'block';
        showMoreButton.textContent = 'Show more';
      }
    }
  };

  const handleSearch = (searchTerm) => {
    currentSearch = searchTerm;
    currentPage = 1;
    displayedCount = 0;
    allGames = [];
    filterType = searchTerm ? 'search' : '';
    filterValue = searchTerm;
    fetchGames();
  };

  const handleSort = (sortValue) => {
    currentSort = sortValue;
    currentPage = 1;
    displayedCount = 0;
    allGames = [];
    fetchGames();
  };

  const handleShowMore = () => {
    currentPage++;
    fetchGames();
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">
          <div class="text-center text-gray-400">Loading...</div>
        </div>
        <button class="show-more-button" style="display: none;">Show more</button>
      </section>
    `;

    // Event listeners
    const showMoreButton = document.querySelector('.page-list .show-more-button');
    
    // Synchroniser le champ de recherche global avec l'état actuel
    const globalSearchInput = document.getElementById('globalSearchInput');
    if (globalSearchInput) {
      // Synchroniser avec la recherche actuelle (mais ne pas ajouter d'event listener ici,
      // car c'est géré globalement dans main.js)
      if (filterType === 'search') {
        globalSearchInput.value = filterValue;
      } else {
        globalSearchInput.value = currentSearch;
      }
    }
    
    // Connecter le select de tri global
    const globalSortSelect = document.getElementById('globalSortSelect');
    if (globalSortSelect) {
      // Synchroniser avec le tri actuel
      globalSortSelect.value = currentSort;
      
      // Écouter les changements dans le select global
      globalSortSelect.addEventListener('change', (e) => {
        handleSort(e.target.value);
      });
      
      // Écouter aussi l'événement personnalisé depuis main.js
      const handleGlobalSortChange = (event) => {
        handleSort(event.detail.sort);
      };
      window.addEventListener('globalSortChange', handleGlobalSortChange);
      
      // Nettoyer l'event listener quand on quitte la page
      // (géré automatiquement par le garbage collector quand la fonction render est réappelée)
    }

    if (showMoreButton) {
      showMoreButton.addEventListener('click', handleShowMore);
    }

    preparePage();
  };

  render();
};
