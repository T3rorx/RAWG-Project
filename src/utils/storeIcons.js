// Mapping des stores vers leurs icônes (utilisant Iconify API)
// Documentation: https://icon-sets.iconify.design/simple-icons/

export const getStoreIcon = (storeSlug) => {
  // Mapping des slugs RAWG vers les slugs Simple Icons (Iconify)
  const storeIconMap = {
    // Stores principaux
    'steam': 'steam',
    'playstation-store': 'playstation',
    'xbox-store': 'xbox',
    'xbox360': 'xbox',
    'xbox-one': 'xbox',
    'xbox-series-x': 'xbox',
    'nintendo': 'nintendo',
    'nintendo-switch': 'nintendoswitch',
    'epic-games': 'epicgames',
    'gog': 'gogdotcom',
    'itch': 'itchdotio',
    'apple-appstore': 'appstore',
    'google-play': 'googleplay',
    'android': 'android',
    'ios': 'apple',
    'game-stop': 'gamestop',
    'humble': 'humblebundle',
    'ubisoft': 'ubisoft',
    'origin': 'origin',
    'ea-app': 'ea',
    'battle-net': 'battlenet',
    'green-man-gaming': 'greenmangaming',
  };

  const normalizedSlug = storeSlug?.toLowerCase().replace(/\s+/g, '-');
  const iconSlug = storeIconMap[normalizedSlug];
  
  if (iconSlug) {
    return `https://api.iconify.design/simple-icons:${iconSlug}.svg?color=%23ffffff`;
  }
  return null;
};

export const getStoreName = (storeName, storeSlug) => {
  return storeName || storeSlug || 'Store';
};
