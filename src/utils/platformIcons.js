// Mapping des plateformes vers leurs logos (utilisant Simple Icons via CDN)
// Documentation: https://simpleicons.org/

export const getPlatformIcon = (platformSlug) => {
  // Mapping des slugs RAWG vers les slugs Simple Icons
  const platformIconMap = {
    // PlayStation
    'playstation': 'playstation',
    'playstation2': 'playstation',
    'playstation3': 'playstation',
    'playstation4': 'playstation',
    'playstation5': 'playstation',
    'psp': 'playstation',
    'ps-vita': 'playstation',
    
    // Xbox
    'xbox': 'xbox',
    'xbox360': 'xbox',
    'xbox-one': 'xbox',
    'xbox-series-x': 'xbox',
    'xbox-old': 'xbox',
    
    // Nintendo
    'nintendo-switch': 'nintendoswitch',
    'wii': 'nintendo',
    'wii-u': 'nintendo',
    'nintendo-3ds': 'nintendo3ds',
    'nintendo-64': 'nintendo',
    'gamecube': 'nintendo',
    'game-boy-advance': 'nintendo',
    'game-boy': 'nintendo',
    'nintendo-ds': 'nintendods',
    
    // PC
    'pc': 'windows',
    'linux': 'linux',
    'mac': 'apple',
    'macos': 'apple',
    'ios': 'apple',
    
    // Mobile
    'android': 'android',
    'iphone': 'apple',
    'ipad': 'apple',
    
    // Autres
    'steam': 'steam',
    'epic-games': 'epicgames',
    'gog': 'gogdotcom',
    'stadia': 'googlestadia',
    'oculus': 'oculus',
    'vr': 'oculus',
  };

  // Normaliser le slug (enlever les espaces, mettre en minuscule)
  const normalizedSlug = platformSlug?.toLowerCase().replace(/\s+/g, '-');
  
  // Chercher dans le mapping
  const iconSlug = platformIconMap[normalizedSlug] || normalizedSlug;
  
  // Retourner l'URL du logo via Simple Icons CDN
  // Format alternatif : utiliser l'API Iconify qui est plus fiable
  // Format: https://api.iconify.design/simple-icons:{icon}.svg?color=%23ffffff
  if (!iconSlug) return null;
  
  // Utiliser Iconify API qui est plus fiable que Simple Icons CDN direct
  // Format: https://api.iconify.design/{collection}:{icon}.svg?color={hexcolor}
  // Le # doit être encodé en %23 pour l'URL
  return `https://api.iconify.design/simple-icons:${iconSlug}.svg?color=%23ffffff`;
};

// Fonction pour obtenir le nom de la plateforme à partir du slug (pour l'attribut alt)
export const getPlatformName = (platformName, platformSlug) => {
  return platformName || platformSlug || 'Platform';
};
