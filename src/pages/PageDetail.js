import { API_KEY, API_BASE_URL } from '../config/api.js';
import { getPlatformIcon, getPlatformName } from '../utils/platformIcons.js';

const pageContent = document.querySelector('#pageContent');

export const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const {
        name,
        released,
        description,
        background_image,
        background_image_additional,
        developers = [],
        publishers = [],
        genres = [],
        tags = [],
        platforms = [],
        website,
        rating,
        rating_top,
        ratings_count,
        short_screenshots = [],
        movies = [],
        stores = [],
        id,
        screenshots_count = 0
      } = gameData;

      const articleDOM = document.querySelector(".page-detail");
      if (!articleDOM) return;

      // Titre et note (affichés seulement s'ils existent)
      const titleElement = articleDOM.querySelector(".game-title");
      const ratingElement = articleDOM.querySelector(".game-rating");
      if (titleElement) {
        if (name) {
          titleElement.textContent = name;
          titleElement.style.display = 'block';
        } else {
          titleElement.style.display = 'none';
        }
      }
      if (ratingElement) {
        if (rating && ratings_count) {
          const avgRating = rating.toFixed(2);
          ratingElement.textContent = `${avgRating}/5 - ${ratings_count} votes`;
          ratingElement.style.display = 'block';
        } else {
          ratingElement.style.display = 'none';
        }
      }

      // Image principale (affichée seulement si elle existe)
      // Utiliser background_image_additional si background_image n'existe pas
      const mainImage = articleDOM.querySelector(".game-main-image");
      if (mainImage) {
        const imageToUse = background_image || background_image_additional;
        if (imageToUse) {
          mainImage.src = imageToUse;
          mainImage.alt = name || 'Image du jeu';
          mainImage.style.display = 'block';
        } else {
          mainImage.style.display = 'none';
        }
      }

      // Description (affichée seulement si elle existe)
      const descriptionElement = articleDOM.querySelector(".game-description");
      if (descriptionElement) {
        if (description) {
          descriptionElement.innerHTML = description;
          descriptionElement.style.display = 'block';
        } else {
          descriptionElement.style.display = 'none';
        }
      }

      // Date de sortie (affichée seulement si elle existe)
      const releaseElement = articleDOM.querySelector(".game-release-date");
      if (releaseElement) {
        if (released) {
          releaseElement.textContent = released;
          releaseElement.style.display = 'block';
        } else {
          releaseElement.style.display = 'none';
        }
      }

      // Developer (liens cliquables) - affiché seulement s'il existe
      const developerElement = articleDOM.querySelector(".game-developer");
      if (developerElement) {
        if (developers.length > 0) {
          const devLinks = developers.map(dev => {
            const devId = dev.id || dev.slug;
            return `<a href="#pagelist/developer/${devId}" class="detail-link">${dev.name}</a>`;
          }).join(', ');
          developerElement.innerHTML = `<strong>Developer</strong><br/>${devLinks}`;
          developerElement.style.display = 'block';
        } else {
          developerElement.style.display = 'none';
        }
      }

      // Publisher (liens cliquables) - affiché seulement s'il existe
      const publisherElement = articleDOM.querySelector(".game-publisher");
      if (publisherElement) {
        if (publishers.length > 0) {
          const pubLinks = publishers.map(pub => {
            const pubId = pub.id || pub.slug;
            return `<a href="#pagelist/publisher/${pubId}" class="detail-link">${pub.name}</a>`;
          }).join(', ');
          publisherElement.innerHTML = `<strong>Publisher</strong><br/>${pubLinks}`;
          publisherElement.style.display = 'block';
        } else {
          publisherElement.style.display = 'none';
        }
      }

      // Platforms (liens cliquables avec logos) - affiché seulement s'il existe
      const platformsElement = articleDOM.querySelector(".game-platforms");
      if (platformsElement) {
        if (platforms.length > 0) {
          const platformLinks = platforms.map(p => {
            const platformId = p.platform.id || p.platform.slug;
            const platformSlug = p.platform.slug || p.platform.name?.toLowerCase().replace(/\s+/g, '-');
            const platformName = getPlatformName(p.platform.name, platformSlug);
            const iconUrl = getPlatformIcon(platformSlug);
            
            // Si pas d'URL d'icône, afficher juste le nom
            if (!iconUrl) {
              return `<a href="#pagelist/platform/${platformId}" class="platform-link platform-text" title="${platformName}">${platformName}</a>`;
            }
            
            return `
              <a href="#pagelist/platform/${platformId}" class="platform-link" title="${platformName}">
                <img src="${iconUrl}" alt="${platformName}" class="platform-icon" onerror="this.style.display='none'; this.nextElementSibling?.style.display='inline';" />
                <span class="platform-name-fallback" style="display: none;">${platformName}</span>
              </a>
            `;
          }).join('');
          platformsElement.innerHTML = `<strong>Platforms</strong><br/><div class="platform-icons">${platformLinks}</div>`;
          platformsElement.style.display = 'block';
        } else {
          platformsElement.style.display = 'none';
        }
      }

      // Genre (liens cliquables vers recherche par genre) - affiché seulement s'il existe
      const genreElement = articleDOM.querySelector(".game-genre");
      if (genreElement) {
        if (genres.length > 0) {
          const genreLinks = genres.map(g => {
            const genreId = g.id || g.slug;
            return `<a href="#pagelist/genre/${genreId}" class="detail-link">${g.name}</a>`;
          }).join(', ');
          genreElement.innerHTML = `<strong>Genre</strong><br/>${genreLinks}`;
          genreElement.style.display = 'block';
        } else {
          genreElement.style.display = 'none';
        }
      }

      // Tags (liens cliquables vers recherche par tag) - affiché seulement s'il existe
      const tagsElement = articleDOM.querySelector(".game-tags");
      if (tagsElement) {
        if (tags.length > 0) {
          const tagLinks = tags.slice(0, 10).map(t => {
            const tagId = t.id || t.slug;
            return `<a href="#pagelist/tag/${tagId}" class="detail-link">${t.name}</a>`;
          }).join(', ');
          tagsElement.innerHTML = `<strong>Tags</strong><br/>${tagLinks}`;
          tagsElement.style.display = 'block';
        } else {
          tagsElement.style.display = 'none';
        }
      }

      // Website button
      const websiteButton = articleDOM.querySelector(".game-website-button");
      if (websiteButton && website) {
        websiteButton.href = website;
        websiteButton.style.display = 'block';
      } else if (websiteButton) {
        websiteButton.style.display = 'none';
      }

      // Stores (BUY section) - affiché seulement s'il existe
      const storesContainer = articleDOM.querySelector(".game-stores");
      const buySection = articleDOM.querySelector(".game-buy-section");
      if (storesContainer) {
        if (stores.length > 0) {
          storesContainer.innerHTML = stores.map(store => {
            const storeName = store.store?.name;
            const storeUrl = store.url;
            if (storeName && storeUrl) {
              return `
                <div class="store-item">
                  <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="store-link">
                    ${storeName}
                  </a>
                </div>
              `;
            }
            return '';
          }).filter(item => item !== '').join('');
          storesContainer.style.display = storesContainer.innerHTML ? 'block' : 'none';
        } else {
          storesContainer.style.display = 'none';
        }
      }
      // Masquer toute la section BUY si pas de stores
      if (buySection) {
        if (stores.length === 0 || !storesContainer || storesContainer.style.display === 'none') {
          buySection.style.display = 'none';
        } else {
          buySection.style.display = 'block';
        }
      }

      // Trailer (première vidéo) - affiché seulement s'il existe
      const trailerContainer = articleDOM.querySelector(".game-trailer");
      const trailerSection = articleDOM.querySelector(".game-trailer-section");
      if (trailerContainer) {
        if (movies.length > 0 && movies[0].data?.max) {
          const firstMovie = movies[0];
          trailerContainer.innerHTML = `
            <video class="trailer-video" controls>
              <source src="${firstMovie.data.max}" type="video/mp4">
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          `;
          trailerContainer.style.display = 'block';
        } else {
          trailerContainer.style.display = 'none';
        }
      }
      // Masquer toute la section TRAILER si pas de vidéo
      if (trailerSection) {
        if (!movies.length || !movies[0].data?.max) {
          trailerSection.style.display = 'none';
        } else {
          trailerSection.style.display = 'block';
        }
      }

      // Screenshots (4 premiers) - affiché seulement s'il existe
      // Si short_screenshots est vide mais qu'il y a des screenshots, on fait une requête séparée
      const screenshotsContainer = articleDOM.querySelector(".game-screenshots");
      const screenshotsSection = articleDOM.querySelector(".game-screenshots-section");
      
      const displayScreenshots = (screenshotsArray) => {
        if (screenshotsContainer) {
          if (screenshotsArray.length > 0) {
            // Prendre exactement 4 screenshots (ou moins si disponible)
            const screenshots = screenshotsArray.slice(0, 4);
            console.log(`📸 Affichage de ${screenshots.length} screenshots (sur ${screenshotsArray.length} disponibles)`);
            screenshotsContainer.innerHTML = screenshots.map((screenshot, index) => {
              const imageUrl = screenshot.image || screenshot;
              console.log(`  ${index + 1}. ${imageUrl}`);
              return `<img src="${imageUrl}" alt="Screenshot ${index + 1}" class="screenshot-image" onerror="console.error('Erreur chargement screenshot ${index + 1}:', this.src); this.style.display='none';" />`;
            }).join('');
            
            // Vérifier que toutes les images sont bien dans le DOM
            setTimeout(() => {
              const images = screenshotsContainer.querySelectorAll('.screenshot-image');
              console.log(`📸 Images dans le DOM: ${images.length}`);
              images.forEach((img, i) => {
                console.log(`  Image ${i + 1}: ${img.src} - loaded: ${img.complete}, naturalWidth: ${img.naturalWidth}`);
              });
            }, 1000);
            screenshotsContainer.style.display = 'grid'; // Utiliser grid au lieu de block pour la grille 2x2
          } else {
            screenshotsContainer.style.display = 'none';
          }
        }
        // Masquer toute la section SCREENSHOTS si pas de screenshots
        if (screenshotsSection) {
          if (screenshotsArray.length === 0) {
            screenshotsSection.style.display = 'none';
          } else {
            screenshotsSection.style.display = 'block';
          }
        }
      };

      if (short_screenshots.length > 0) {
        // Utiliser short_screenshots si disponible
        displayScreenshots(short_screenshots);
      } else {
        // Si pas de short_screenshots mais qu'il y a un screenshots_count, faire une requête
        const gameId = id || argument;
        if (gameId && screenshots_count > 0) {
          fetch(`${API_BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`)
            .then(response => response.json())
            .then(screenshotsData => {
              console.log('📸 Screenshots API response:', screenshotsData);
              if (screenshotsData.results && screenshotsData.results.length > 0) {
                const screenshots = screenshotsData.results.map(s => s.image);
                console.log(`📸 ${screenshots.length} screenshots récupérés, affichage des 4 premiers`);
                displayScreenshots(screenshots);
              } else {
                console.log('📸 Aucun screenshot trouvé');
                displayScreenshots([]);
              }
            })
            .catch(error => {
              console.error('Erreur lors du chargement des screenshots:', error);
              displayScreenshots([]);
            });
        } else {
          displayScreenshots([]);
        }
      }

      // YouTube videos (autres vidéos) - affiché seulement s'il existe
      const youtubeContainer = articleDOM.querySelector(".game-youtube");
      const youtubeSection = articleDOM.querySelector(".game-youtube-section");
      if (youtubeContainer) {
        if (movies.length > 1) {
          const otherMovies = movies.slice(1, 5).filter(movie => movie.data?.max && movie.preview);
          if (otherMovies.length > 0) {
            youtubeContainer.innerHTML = otherMovies.map((movie, index) => {
              const title = movie.name || `Video ${index + 1}`;
              const thumbnail = movie.preview;
              const videoUrl = movie.data.max;
              return `
                <div class="youtube-item">
                  <img src="${thumbnail}" alt="${title}" class="youtube-thumbnail" />
                  <div class="youtube-info">
                    <h3 class="youtube-title">${title}</h3>
                    <a href="${videoUrl}" target="_blank" class="youtube-link">Voir la vidéo</a>
                  </div>
                </div>
              `;
            }).join('');
            youtubeContainer.style.display = 'block';
          } else {
            youtubeContainer.style.display = 'none';
          }
        } else {
          youtubeContainer.style.display = 'none';
        }
      }
      // Masquer toute la section YOUTUBE si pas de vidéos
      if (youtubeSection) {
        if (movies.length <= 1 || !youtubeContainer || youtubeContainer.style.display === 'none') {
          youtubeSection.style.display = 'none';
        } else {
          youtubeSection.style.display = 'block';
        }
      }

      // Similar Games - charger les jeux similaires basés sur les genres
      const similarGamesContainer = articleDOM.querySelector(".game-similar-games");
      const similarGamesSection = articleDOM.querySelector(".game-similar-section");
      if (similarGamesContainer && id && genres.length > 0) {
        // Utiliser le premier genre pour trouver des jeux similaires
        const primaryGenreId = genres[0].id;
        // Exclure le jeu actuel de la recherche
        fetch(`${API_BASE_URL}/games?key=${API_KEY}&genres=${primaryGenreId}&page_size=7&ordering=-rating`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(similarData => {
            if (similarData.results && similarData.results.length > 0) {
              // Filtrer le jeu actuel et prendre 6 jeux similaires
              const similarGames = similarData.results
                .filter(game => game.id !== id)
                .slice(0, 6);
              
              if (similarGames.length > 0) {
                similarGamesContainer.innerHTML = similarGames.map(game => {
                  const gameId = game.id || game.slug;
                  const imageUrl = game.background_image || 'https://placehold.co/288x193';
                  // Générer les logos de plateformes
                  const platformIcons = game.platforms?.map(p => {
                    const platformSlug = p.platform.slug || p.platform.name?.toLowerCase().replace(/\s+/g, '-');
                    const platformName = getPlatformName(p.platform.name, platformSlug);
                    const iconUrl = getPlatformIcon(platformSlug);
                    
                    if (!iconUrl) {
                      return `<span class="platform-name-small" title="${platformName}">${platformName}</span>`;
                    }
                    
                    return `<img src="${iconUrl}" alt="${platformName}" class="platform-icon-small" title="${platformName}" onerror="this.style.display='none'; this.nextElementSibling?.style.display='inline';" /><span class="platform-name-fallback-small" style="display: none;">${platformName}</span>`;
                  }).join('') || '<span class="no-platforms">N/A</span>';
                  return `
                    <article class="similar-game-card">
                      <a href="#pagedetail/${gameId}" class="similar-game-link">
                        <img src="${imageUrl}" alt="${game.name}" class="similar-game-image" />
                        <div class="similar-game-info">
                          <h3 class="similar-game-name">${game.name}</h3>
                          <div class="similar-game-platforms">${platformIcons}</div>
                        </div>
                      </a>
                    </article>
                  `;
                }).join('');
                similarGamesContainer.style.display = 'grid';
                if (similarGamesSection) similarGamesSection.style.display = 'block';
              } else {
                similarGamesContainer.innerHTML = '<div class="no-similar-games">Aucun jeu similaire disponible.</div>';
                similarGamesContainer.style.display = 'block';
                if (similarGamesSection) similarGamesSection.style.display = 'block';
              }
            } else {
              similarGamesContainer.innerHTML = '<div class="no-similar-games">Aucun jeu similaire disponible.</div>';
              similarGamesContainer.style.display = 'block';
              if (similarGamesSection) similarGamesSection.style.display = 'block';
            }
          })
          .catch(error => {
            console.error('Erreur lors du chargement des jeux similaires:', error);
            similarGamesContainer.innerHTML = '<div class="error-similar">Erreur lors du chargement des jeux similaires.</div>';
            similarGamesContainer.style.display = 'block';
            if (similarGamesSection) similarGamesSection.style.display = 'block';
          });
      } else if (similarGamesSection) {
        // Masquer la section si pas de genres ou pas d'ID
        similarGamesSection.style.display = 'none';
      }
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          // Debug: Afficher toutes les données disponibles
          console.log('🔍 TOUTES LES DONNÉES API DISPONIBLES:', responseData);
          console.log('📋 Clés disponibles:', Object.keys(responseData).sort());
          
          // Vérifier les champs importants
          console.log('\n✅ Champs utilisés:');
          console.log('  - name:', responseData.name);
          console.log('  - description:', responseData.description ? 'OUI' : 'NON');
          console.log('  - background_image:', responseData.background_image ? 'OUI' : 'NON');
          console.log('  - released:', responseData.released);
          console.log('  - developers:', responseData.developers?.length || 0);
          console.log('  - publishers:', responseData.publishers?.length || 0);
          console.log('  - platforms:', responseData.platforms?.length || 0);
          console.log('  - genres:', responseData.genres?.length || 0);
          console.log('  - tags:', responseData.tags?.length || 0);
          console.log('  - website:', responseData.website ? 'OUI' : 'NON');
          console.log('  - rating:', responseData.rating);
          console.log('  - ratings_count:', responseData.ratings_count);
          console.log('  - short_screenshots:', responseData.short_screenshots?.length || 0);
          console.log('  - movies:', responseData.movies?.length || 0);
          console.log('  - stores:', responseData.stores?.length || 0);
          
          // Vérifier les champs potentiellement manquants
          console.log('\n⚠️  Champs potentiellement manquants:');
          const potentiallyMissing = [
            'background_image_additional', 'metacritic', 'metacritic_url',
            'esrb_rating', 'playtime', 'achievements_count', 'reddit_url',
            'reddit_name', 'reddit_description', 'reddit_logo', 'alternative_names',
            'screenshots_count', 'movies_count', 'creators_count', 'ratings',
            'reactions', 'added_by_status', 'parent_platforms'
          ];
          
          potentiallyMissing.forEach(field => {
            if (responseData[field] !== undefined && responseData[field] !== null) {
              if (Array.isArray(responseData[field])) {
                console.log(`  ⚠ ${field}: [${responseData[field].length} éléments]`);
              } else if (typeof responseData[field] === 'object') {
                console.log(`  ⚠ ${field}: [objet]`, responseData[field]);
              } else {
                console.log(`  ⚠ ${field}:`, responseData[field]);
              }
            }
          });
          
          displayGame(responseData);
        })
        .catch((error) => {
          console.error('Erreur lors du chargement du jeu:', error);
          const articleDOM = document.querySelector(".page-detail");
          if (articleDOM) {
            articleDOM.innerHTML = '<div class="error">Erreur lors du chargement du jeu.</div>';
          }
        });
    };

    fetchGame(`${API_BASE_URL}/games`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <!-- Image principale -->
        <div class="game-hero">
          <img src="" alt="" class="game-main-image" />
          <a href="" target="_blank" rel="noopener noreferrer" class="game-website-button">
            Check Website
          </a>
        </div>

        <!-- Intro Text -->
        <div class="game-intro">
          <h1 class="game-title"></h1>
          <div class="game-rating"></div>
          <div class="game-description"></div>
        </div>

        <!-- Métadonnées -->
        <div class="game-metadata">
          <div class="metadata-item">
            <div class="game-release-date"></div>
          </div>
          <div class="metadata-item">
            <div class="game-developer"></div>
          </div>
          <div class="metadata-item">
            <div class="game-platforms"></div>
          </div>
          <div class="metadata-item">
            <div class="game-publisher"></div>
          </div>
          <div class="metadata-item">
            <div class="game-genre"></div>
          </div>
          <div class="metadata-item">
            <div class="game-tags"></div>
          </div>
        </div>

        <!-- BUY Section -->
        <div class="game-buy-section">
          <h2 class="section-title">BUY</h2>
          <div class="game-stores"></div>
        </div>

        <!-- TRAILER Section -->
        <div class="game-trailer-section">
          <h2 class="section-title">TRAILER</h2>
          <div class="game-trailer"></div>
        </div>

        <!-- SCREENSHOTS Section -->
        <div class="game-screenshots-section">
          <h2 class="section-title">SCREENSHOTS</h2>
          <div class="game-screenshots"></div>
        </div>

        <!-- YOUTUBE Section -->
        <div class="game-youtube-section">
          <h2 class="section-title">YOUTUBE</h2>
          <div class="game-youtube"></div>
        </div>

        <!-- SIMILAR GAMES Section -->
        <div class="game-similar-section">
          <h2 class="section-title">SIMILAR GAMES</h2>
          <div class="game-similar-games">Loading similar games...</div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
