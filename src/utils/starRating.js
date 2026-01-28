// Utilitaires pour afficher les étoiles de notation
// Options disponibles :
// 1. Unicode stars (☆ ★) - Simple, pas de dépendances
// 2. SVG stars - Plus de contrôle visuel
// 3. CSS shapes - Pure CSS

/**
 * Génère des étoiles HTML basées sur le rating
 * @param {number} rating - Note entre 0 et 5
 * @param {number} maxStars - Nombre maximum d'étoiles (défaut: 5)
 * @param {string} method - Méthode: 'unicode' (défaut), 'svg', 'css'
 * @returns {string} HTML des étoiles
 */
export const generateStars = (rating, maxStars = 5, method = 'unicode') => {
  if (!rating || rating < 0) rating = 0;
  if (rating > maxStars) rating = maxStars;
  
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  
  switch (method) {
    case 'svg':
      return generateSVGStars(fullStars, hasHalfStar, emptyStars);
    case 'css':
      return generateCSSStars(rating, maxStars);
    case 'unicode':
    default:
      return generateUnicodeStars(fullStars, hasHalfStar, emptyStars);
  }
};

/**
 * Génère des étoiles Unicode (☆ ★)
 * Simple, léger, pas de dépendances
 */
const generateUnicodeStars = (fullStars, hasHalfStar, emptyStars) => {
  const filled = '★'.repeat(fullStars);
  // Utiliser une demi-étoile Unicode ou simplement une étoile pleine si pas de support
  const half = hasHalfStar ? '⯨' : ''; // Demi-étoile Unicode (peut ne pas être supportée partout)
  const empty = '☆'.repeat(emptyStars);
  
  // Si demi-étoile non supportée, on peut utiliser une étoile pleine avec opacité via CSS
  const halfStarHTML = hasHalfStar 
    ? `<span class="star-half" style="opacity: 0.5;">★</span>` 
    : '';
  
  return `<span class="star-rating" aria-label="${fullStars + (hasHalfStar ? 0.5 : 0)} sur 5 étoiles">
    <span class="stars-filled">${filled}</span>
    ${halfStarHTML}
    <span class="stars-empty">${empty}</span>
  </span>`;
};

/**
 * Génère des étoiles SVG
 * Plus de contrôle visuel, peut être coloré avec CSS
 */
const generateSVGStars = (fullStars, hasHalfStar, emptyStars) => {
  const stars = [];
  
  // Étoiles pleines
  for (let i = 0; i < fullStars; i++) {
    stars.push(`
      <svg class="star-icon star-filled" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    `);
  }
  
  // Demi-étoile
  if (hasHalfStar) {
    stars.push(`
      <svg class="star-icon star-half" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stop-color="currentColor"/>
            <stop offset="50%" stop-color="transparent" stop-opacity="1"/>
          </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half-fill)"/>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>
    `);
  }
  
  // Étoiles vides
  for (let i = 0; i < emptyStars; i++) {
    stars.push(`
      <svg class="star-icon star-empty" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    `);
  }
  
  return `<span class="star-rating star-rating-svg" aria-label="${fullStars + (hasHalfStar ? 0.5 : 0)} sur 5 étoiles">
    ${stars.join('')}
  </span>`;
};

/**
 * Génère des étoiles avec CSS pur (shapes)
 * Alternative moderne sans dépendances
 */
const generateCSSStars = (rating, maxStars) => {
  const percentage = (rating / maxStars) * 100;
  
  return `<span class="star-rating star-rating-css" aria-label="${rating} sur ${maxStars} étoiles">
    <span class="stars-container">
      <span class="stars-background">${'★'.repeat(maxStars)}</span>
      <span class="stars-fill" style="width: ${percentage}%">${'★'.repeat(maxStars)}</span>
    </span>
  </span>`;
};

/**
 * Format simple pour affichage compact (utilisé dans les cartes)
 */
export const generateCompactStars = (rating) => {
  if (!rating || rating < 0) return '';
  const rounded = Math.round(rating * 2) / 2; // Arrondir à 0.5
  return generateStars(rounded, 5, 'unicode');
};
