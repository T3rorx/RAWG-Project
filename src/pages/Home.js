import { API_KEY, API_BASE_URL } from '../config/api.js';
import { getPlatformIcon, getPlatformName } from '../utils/platformIcons.js';
import { generateCompactStars } from '../utils/starRating.js';

const pageContent = document.querySelector('#pageContent');

// La page d'accueil affiche 9 jeux dans une grille 3x3
// Elle affiche les jeux les plus attendus qui sortiront dans l'année suivante
export const Home = (argument = '') => {
  const fetchGames = () => {
    // Jeux les plus attendus qui sortiront dans l'année suivante
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const url = `${API_BASE_URL}/games?key=${API_KEY}&page_size=9&dates=${currentYear}-01-01,${nextYear}-12-31&ordering=-rating`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        const games = responseData.results || [];
        displayGames(games);
      })
      .catch((error) => {
        console.error('❌ Erreur lors du chargement des jeux:', error);
        const articlesContainer = document.querySelector('.home .articles');
        if (articlesContainer) {
          articlesContainer.innerHTML = '<div class="error">Erreur lors du chargement des jeux. Vérifiez la console pour plus de détails.</div>';
        }
      });
  };

  const displayGames = (games) => {
    const resultsContent = games.map((article) => {
      // Générer les logos de plateformes (sans doublons)
      // Utiliser l'ID de la plateforme comme clé principale pour éviter les doublons
      const uniquePlatforms = new Map();
      article.platforms?.forEach(p => {
        const platformId = p.platform.id;
        const platformSlug = p.platform.slug || p.platform.name?.toLowerCase().replace(/\s+/g, '-');
        // Utiliser l'ID comme clé principale, et le slug normalisé comme clé secondaire
        const key = platformId || platformSlug?.toLowerCase().replace(/\s+/g, '-');
        if (key && !uniquePlatforms.has(key)) {
          uniquePlatforms.set(key, p);
        }
      });
      
      // Toutes les plateformes sur une seule ligne, alignées à droite
      const platformArray = uniquePlatforms.size > 0 
        ? Array.from(uniquePlatforms.values())
        : [];
      
      const generatePlatformHTML = (platforms) => {
        if (platforms.length === 0) return '';
        return platforms.map(p => {
          const platformSlug = p.platform.slug || p.platform.name?.toLowerCase().replace(/\s+/g, '-');
          const platformName = getPlatformName(p.platform.name, platformSlug);
          const iconUrl = getPlatformIcon(platformSlug);
          
          if (!iconUrl) {
            return `<span class="platform-name-small" title="${platformName}">${platformName}</span>`;
          }
          
          return `<img src="${iconUrl}" alt="${platformName}" class="platform-icon-small" title="${platformName}" onerror="this.style.display='none'; this.nextElementSibling?.style.display='inline';" /><span class="platform-name-fallback-small" style="display: none;">${platformName}</span>`;
        }).join('');
      };
      
      const platformsHTML = generatePlatformHTML(platformArray);
      
      const genres = article.genres?.map(g => g.name).join(', ') || 'N/A';
      const publishers = article.publishers?.map(p => p.name).join(', ') || 'N/A';
      const rating = article.rating || 0;
      const ratingsCount = article.ratings_count || 0;
      const starsHTML = generateCompactStars(rating);
      const released = article.released || 'Date non disponible';
      const image = article.background_image || 'https://placehold.co/400x225';
      const gameId = article.id || article.slug;

      return `
        <article class="game-card" data-game-id="${gameId}">
          <a href="#pagedetail/${gameId}" class="game-card-link-wrapper">
            <div class="game-card-default">
              <img src="${image}" alt="${article.name}" class="game-card-image" />
              <h1 class="game-card-name">${article.name}</h1>
              <div class="game-card-platforms-wrapper">
                <div class="game-card-platforms game-card-platforms-right">${platformsHTML || '<span class="no-platforms">N/A</span>'}</div>
              </div>
            </div>
            <div class="game-card-hover">
              <div class="game-card-hover-content">
                <p class="game-card-released"><strong>Release Date:</strong> ${released}</p>
                <p class="game-card-publisher"><strong>Publisher:</strong> ${publishers}</p>
                <p class="game-card-genres"><strong>Genres:</strong> ${genres}</p>
                <p class="game-card-rating">
                  <strong>Rating:</strong> ${starsHTML} ${rating.toFixed(2)}/5 (${ratingsCount} votes)
                </p>
              </div>
            </div>
          </a>
        </article>
      `;
    });

    const resultsContainer = document.querySelector('.home .articles');
    if (resultsContainer) {
      resultsContainer.innerHTML = resultsContent.join("\n");
    }
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="home">
        <div class="articles">
          <div class="text-center text-gray-400">Loading...</div>
        </div>
      </section>
    `;

    fetchGames();
  };

  render();
};
