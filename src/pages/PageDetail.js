import { API_KEY, API_BASE_URL } from '../config/api.js';
import { getPlatformIcon, getPlatformName } from '../utils/platformIcons.js';
import { getStoreIcon, getStoreName } from '../utils/storeIcons.js';

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
      const releaseItem = releaseElement ? releaseElement.closest('.metadata-item') : null;
      if (releaseElement) {
        if (released) {
          releaseElement.innerHTML = `<strong>Release Date</strong><br/>${released}`;
          releaseElement.style.display = 'block';
          if (releaseItem) releaseItem.style.display = 'block';
        } else {
          releaseElement.style.display = 'none';
          if (releaseItem) releaseItem.style.display = 'none';
        }
      }

      // Developer (liens cliquables) - affiché seulement s'il existe
      const developerElement = articleDOM.querySelector(".game-developer");
      const developerItem = developerElement ? developerElement.closest('.metadata-item') : null;
      if (developerElement) {
        if (developers.length > 0) {
          const devLinks = developers.map(dev => {
            const devId = dev.id || dev.slug;
            return `<a href="#pagelist/developer/${devId}" class="detail-link">${dev.name}</a>`;
          }).join(', ');
          developerElement.innerHTML = `<strong>Developer</strong><br/>${devLinks}`;
          developerElement.style.display = 'block';
          if (developerItem) developerItem.style.display = 'block';
        } else {
          developerElement.style.display = 'none';
          if (developerItem) developerItem.style.display = 'none';
        }
      }

      // Publisher (liens cliquables) - affiché seulement s'il existe
      const publisherElement = articleDOM.querySelector(".game-publisher");
      const publisherItem = publisherElement ? publisherElement.closest('.metadata-item') : null;
      if (publisherElement) {
        if (publishers.length > 0) {
          const pubLinks = publishers.map(pub => {
            const pubId = pub.id || pub.slug;
            return `<a href="#pagelist/publisher/${pubId}" class="detail-link">${pub.name}</a>`;
          }).join(', ');
          publisherElement.innerHTML = `<strong>Publisher</strong><br/>${pubLinks}`;
          publisherElement.style.display = 'block';
          if (publisherItem) publisherItem.style.display = 'block';
        } else {
          publisherElement.style.display = 'none';
          if (publisherItem) publisherItem.style.display = 'none';
        }
      }

      // Platforms (liens cliquables avec logos) - affiché seulement s'il existe
      const platformsElement = articleDOM.querySelector(".game-platforms");
      const platformsItem = platformsElement ? platformsElement.closest('.metadata-item') : null;
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
          if (platformsItem) platformsItem.style.display = 'block';
        } else {
          platformsElement.style.display = 'none';
          if (platformsItem) platformsItem.style.display = 'none';
        }
      }

      // Genre (liens cliquables vers recherche par genre) - affiché seulement s'il existe
      const genreElement = articleDOM.querySelector(".game-genre");
      const genreItem = genreElement ? genreElement.closest('.metadata-item') : null;
      if (genreElement) {
        if (genres.length > 0) {
          const genreLinks = genres.map(g => {
            const genreId = g.id || g.slug;
            return `<a href="#pagelist/genre/${genreId}" class="detail-link">${g.name}</a>`;
          }).join(', ');
          genreElement.innerHTML = `<strong>Genre</strong><br/>${genreLinks}`;
          genreElement.style.display = 'block';
          if (genreItem) genreItem.style.display = 'block';
        } else {
          genreElement.style.display = 'none';
          if (genreItem) genreItem.style.display = 'none';
        }
      }

      // Tags (liens cliquables vers recherche par tag) - affiché seulement s'il existe
      const tagsElement = articleDOM.querySelector(".game-tags");
      const tagsItem = tagsElement ? tagsElement.closest('.metadata-item') : null;
      if (tagsElement) {
        if (tags.length > 0) {
          const tagLinks = tags.slice(0, 10).map(t => {
            const tagId = t.id || t.slug;
            return `<a href="#pagelist/tag/${tagId}" class="detail-link">${t.name}</a>`;
          }).join(', ');
          tagsElement.innerHTML = `<strong>Tags</strong><br/>${tagLinks}`;
          tagsElement.style.display = 'block';
          if (tagsItem) tagsItem.style.display = 'block';
        } else {
          tagsElement.style.display = 'none';
          if (tagsItem) tagsItem.style.display = 'none';
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
            const storeSlug = store.store?.slug || store.store?.domain || storeName?.toLowerCase().replace(/\s+/g, '-');
            
            if (storeName && storeUrl) {
              const storeIconUrl = getStoreIcon(storeSlug);
              const displayName = getStoreName(storeName, storeSlug);
              
              return `
                <div class="store-item">
                  <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="store-link">
                    ${storeIconUrl ? `<img src="${storeIconUrl}" alt="${displayName}" class="store-icon" onerror="this.style.display='none';" />` : ''}
                    <span class="store-name">${displayName}</span>
                    <svg class="store-external-icon" width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25808 0.016875C8.39558 0.006875 8.52871 0 8.65871 0L8.65746 0.001875C11.688 0.00848787 11.641 3.07693 11.613 4.90776L11.613 4.90796L11.613 4.90811L11.613 4.90822C11.6119 4.98063 11.6108 5.05111 11.61 5.11938C11.5971 6.26996 12.2207 7.05498 12.8704 7.87289L12.9118 7.925C13.5012 8.62813 14.2793 9.65312 14.7218 10.8281C15.0868 11.7825 15.2268 12.84 14.8687 13.905C14.9251 13.9084 14.9794 13.9275 15.0256 13.96C15.0559 13.9903 15.0852 14.0069 15.1142 14.0234C15.1379 14.0368 15.1614 14.0501 15.185 14.0706C15.445 14.2888 15.5231 14.6075 15.595 14.9431C15.67 15.2681 15.735 15.5481 15.8781 15.7137L15.8812 15.7169V15.7987C16.3081 16.2675 16.4931 16.6125 16.4737 16.9444C16.4575 17.2669 16.2231 17.4906 15.9331 17.6575C15.7625 17.7598 15.5662 17.8552 15.3607 17.9551L15.3607 17.9551C14.8682 18.1944 14.3228 18.4595 13.9506 18.9075C13.3975 19.5519 12.7137 19.9456 12.0731 19.9975C11.4281 20.0462 10.8256 19.7531 10.5006 19.1056V19.1025C10.4899 19.0757 10.4801 19.0523 10.471 19.0308L10.471 19.0307C10.4415 18.9605 10.4203 18.91 10.4031 18.8225C9.95377 18.8541 9.53532 18.7896 9.15392 18.7309C8.82546 18.6804 8.52449 18.634 8.25496 18.6569C7.80247 18.6859 7.43922 18.7615 7.12525 18.8268L7.12522 18.8268L7.12518 18.8268C6.84462 18.8852 6.60343 18.9354 6.37308 18.9369C6.17337 19.3373 5.80404 19.6265 5.36746 19.7244C4.74246 19.89 3.95746 19.7206 3.18683 19.33C2.71591 19.0797 2.16387 19.0146 1.64897 18.954L1.64891 18.954C1.37318 18.9215 1.1081 18.8903 0.871833 18.8325C0.536833 18.7213 0.236833 18.6106 0.091208 18.3306C-0.051917 18.0469 -0.029417 17.6594 0.178708 17.0938C0.239276 16.9056 0.20162 16.6551 0.156255 16.3533L0.146208 16.2862C0.123708 16.1725 0.100583 16.0031 0.100583 15.8406C0.096833 15.6644 0.136208 15.4956 0.211208 15.3387C0.372223 15.0108 0.64225 14.8941 0.891884 14.7861L0.930583 14.7694C0.995657 14.7418 1.05926 14.7176 1.12064 14.6943C1.30569 14.6239 1.47059 14.5612 1.59496 14.4369C1.67221 14.3497 1.74643 14.2474 1.82364 14.1409C1.92197 14.0052 2.02515 13.8629 2.14558 13.7369C2.1684 13.6936 2.20065 13.656 2.23996 13.6269C2.13558 12.9563 2.24683 12.2425 2.47746 11.5494C2.96871 10.0756 4.00371 8.65938 4.74308 7.78375C5.36808 6.89437 5.55308 6.175 5.61808 5.26687C5.62664 5.06427 5.60898 4.79568 5.58868 4.48678C5.48438 2.90033 5.3102 0.250718 8.25808 0.016875ZM9.11121 2.83812H9.09808V2.83938C8.91871 2.83938 8.74621 2.89812 8.60371 3.005C8.43746 3.10875 8.31371 3.26562 8.24558 3.44812C8.15736 3.64987 8.11488 3.86865 8.12121 4.08875V4.10563C8.12216 4.16105 8.12655 4.21637 8.13433 4.27125C8.22547 4.30627 8.34044 4.34307 8.45389 4.37938L8.45392 4.37939L8.45401 4.37942L8.45402 4.37942C8.51868 4.40012 8.58285 4.42066 8.64183 4.44063C8.63308 4.36562 8.62621 4.29063 8.62621 4.21625V4.19938C8.63037 4.08505 8.65581 3.9725 8.70121 3.8675C8.73424 3.76277 8.79239 3.66772 8.87058 3.59063C8.94183 3.5025 9.01058 3.48 9.08871 3.48H9.10121C9.18345 3.48 9.2499 3.53149 9.31923 3.58522L9.32621 3.59063C9.33975 3.61228 9.35236 3.63186 9.36417 3.65018C9.41232 3.72488 9.44697 3.77866 9.47558 3.8675C9.5121 3.97427 9.52986 4.08655 9.52808 4.19938V4.21625C9.52121 4.33313 9.49871 4.44688 9.45621 4.55125C9.4366 4.58443 9.39925 4.62034 9.36405 4.65418C9.34091 4.67643 9.3187 4.69778 9.30308 4.71688C9.36539 4.7302 9.42644 4.74881 9.48558 4.7725C9.53381 4.8115 9.58485 4.82996 9.63964 4.84978C9.66652 4.8595 9.69429 4.86954 9.72308 4.8825C9.74791 4.89196 9.76995 4.90421 9.7913 4.91609L9.79131 4.9161L9.79496 4.91813C9.87449 4.83902 9.93572 4.74345 9.97433 4.63812C10.0556 4.45312 10.0975 4.25125 10.0975 4.04875L10.1006 4.06875C10.1006 4.07219 10.1014 4.07531 10.1021 4.07844C10.1029 4.08156 10.1037 4.08469 10.1037 4.08813V4.00063C10.1037 4.00844 10.1029 4.01656 10.1021 4.02469C10.1014 4.03281 10.1006 4.04094 10.1006 4.04875C10.095 3.8275 10.0487 3.66188 9.96058 3.44688C9.87308 3.27813 9.75558 3.11437 9.59621 3.00125C9.43933 2.89062 9.28683 2.83812 9.11121 2.83812ZM6.63058 2.8875H6.65996C6.77746 2.8875 6.88496 2.92688 6.99246 2.99813C7.11558 3.10563 7.21433 3.23875 7.27933 3.385C7.35433 3.55188 7.39621 3.72063 7.40933 3.94187V3.945C7.41246 4.05562 7.41246 4.115 7.40621 4.16687V4.235L7.33808 4.25437C7.23859 4.29015 7.15524 4.33785 7.07477 4.38389L7.07469 4.38394L7.07469 4.38394L7.07468 4.38394L7.07468 4.38394L7.07467 4.38395L7.07467 4.38395C7.05256 4.3966 7.03066 4.40913 7.00871 4.42125C7.01871 4.34625 7.01871 4.27125 7.01183 4.19938V4.18625C7.0039 4.0932 6.98613 4.03906 6.95928 3.95725L6.94371 3.90938C6.91703 3.82383 6.86882 3.74657 6.80371 3.685C6.76278 3.6485 6.7091 3.62964 6.65433 3.6325H6.63433C6.57621 3.63563 6.52683 3.665 6.48183 3.74312C6.42674 3.8065 6.39172 3.88481 6.38121 3.96813C6.35808 4.05562 6.35121 4.15 6.36121 4.245V4.25437C6.37121 4.36875 6.39058 4.42438 6.42933 4.53438C6.45448 4.61916 6.50172 4.69573 6.56621 4.75625C6.57621 4.76625 6.58308 4.77313 6.59558 4.77563C6.57189 4.79575 6.55131 4.80934 6.53198 4.8221C6.5039 4.84063 6.47846 4.85742 6.44996 4.89L6.43497 4.90069C6.40621 4.9214 6.37548 4.94353 6.33933 4.94938C6.25265 4.84511 6.17626 4.73272 6.11121 4.61375C6.03147 4.43855 5.98728 4.24927 5.98121 4.05688C5.96859 3.86884 5.99062 3.68008 6.04621 3.5C6.09558 3.3375 6.17371 3.18438 6.28371 3.05438C6.39121 2.94375 6.49871 2.88875 6.63183 2.88875L6.63058 2.8875ZM8.78558 4.64187C8.38246 4.36188 8.04996 4.31 7.77308 4.31L7.77371 4.31063C7.63121 4.31063 7.49996 4.33313 7.38683 4.3625C7.04746 4.47375 6.82683 4.695 6.68683 4.86438V4.8675H6.68371C6.65926 4.88846 6.62885 4.90995 6.5541 4.96279L6.53683 4.975C6.50626 4.99478 6.46987 5.02224 6.42719 5.05445L6.42719 5.05445L6.42717 5.05446L6.42716 5.05447C6.35118 5.1118 6.25528 5.18417 6.13683 5.255C5.97058 5.36562 5.91871 5.53125 5.97371 5.75562C6.03246 5.92125 6.21121 6.14313 6.54683 6.34812H6.54996V6.35125C6.67566 6.41806 6.77651 6.50517 6.87247 6.58805L6.87248 6.58806C6.9354 6.6424 6.99623 6.69494 7.06058 6.73875C7.14572 6.79989 7.23488 6.85523 7.32746 6.90438C7.44754 6.9467 7.57463 6.96558 7.70183 6.96C8.03891 6.98159 8.2931 6.85929 8.51689 6.75162L8.54496 6.73812C8.66212 6.68131 8.77054 6.60982 8.87836 6.53873L8.87836 6.53872L8.87837 6.53872L8.87838 6.53871L8.87839 6.53871L8.8784 6.53871L8.87841 6.5387C8.9805 6.47138 9.08205 6.40443 9.18996 6.35063V6.3475C9.64808 6.18187 9.97371 5.905 10.0781 5.64437C10.1298 5.5185 10.125 5.37649 10.065 5.25437V5.365C10.0031 5.25437 9.87996 5.14375 9.66496 5.02938C9.60692 5.00806 9.55318 4.98854 9.50306 4.97034C9.17107 4.84976 8.9979 4.78686 8.78558 4.64187ZM10.1037 6.09312L10.1041 6.0947C9.93156 6.34207 9.62229 6.56692 9.23496 6.6775H9.23183C9.1298 6.70846 9.02301 6.77448 8.90623 6.84668C8.81556 6.90274 8.71887 6.96251 8.61371 7.0125C8.39308 7.12375 8.12558 7.23438 7.78371 7.23438C7.75496 7.23438 7.72558 7.23438 7.69308 7.23125C7.36058 7.23125 7.13933 7.11687 6.96371 6.95125C6.8769 6.89676 6.79979 6.82878 6.72246 6.7606C6.64278 6.69035 6.56286 6.61989 6.47183 6.56375C6.43518 6.53084 6.37033 6.4883 6.31571 6.45248L6.3157 6.45247L6.31569 6.45247C6.27905 6.42843 6.24702 6.40742 6.23121 6.39437C6.16637 7.61548 5.47767 9.10094 4.97771 10.1793C4.8753 10.4002 4.7808 10.604 4.70121 10.785C4.37643 11.5439 4.19321 12.3558 4.16058 13.1806C3.31183 12.0513 3.93308 10.5962 4.26246 9.97125C4.63371 9.27125 4.69183 9.105 4.60433 9.15687C4.26871 9.70125 3.74433 10.57 3.53933 11.4619C3.43496 11.9269 3.41558 12.3862 3.55246 12.8319C3.68933 13.2688 3.98558 13.6625 4.51246 13.9944C5.22558 14.4331 5.71433 14.8731 5.99996 15.26C6.28996 15.6506 6.37808 16.0087 6.28996 16.2306C6.23977 16.3531 6.14604 16.4526 6.02683 16.51C5.92246 16.54 5.79183 16.5656 5.63933 16.5656C5.72978 16.6457 5.80754 16.7391 5.86996 16.8425C5.99996 16.9756 6.11058 17.1256 6.20558 17.2881C7.67621 18.2906 9.41121 17.9031 10.6612 17.0081L10.6657 16.9928C10.7885 16.5719 10.9089 16.1592 10.9287 15.8825C10.9581 15.2863 10.9906 14.7687 11.0981 14.3231C11.2081 13.8931 11.4006 13.5581 11.7587 13.3331C11.804 13.3253 11.8492 13.31 11.8951 13.2944C11.9081 13.29 11.9212 13.2855 11.9343 13.2812C11.9353 13.2428 11.9395 13.2046 11.9468 13.1669C12.0512 12.4994 12.66 12.4475 13.4218 12.7794C14.1575 13.1112 14.4375 13.4113 14.31 13.8013H14.3231C14.3392 13.8013 14.3558 13.801 14.3724 13.8007C14.4061 13.8001 14.4403 13.7996 14.4725 13.8013V13.8369C14.6256 13.3363 14.3068 13.0012 13.4475 12.5544C13.4001 12.5519 13.3547 12.5322 13.31 12.5129C13.2993 12.5083 13.2887 12.5037 13.2781 12.4994C13.3925 12.0281 13.3656 11.5519 13.2581 11.1062C13.0237 10.1206 12.38 9.25375 11.8881 8.81125C11.7975 8.81125 11.8068 8.9225 11.9925 9.08813C12.445 9.505 13.4375 11.0025 12.8975 12.3956C12.7437 12.3562 12.6006 12.3375 12.4706 12.3406C12.2656 11.2037 11.7906 10.2662 11.5531 9.82063C11.1039 8.99099 10.4043 7.27652 10.1041 6.0947L10.1043 6.09437L10.1037 6.09312ZM12.6625 14.7062C12.2137 14.5962 11.9593 14.0587 11.9268 13.5581L11.925 13.56L11.8893 13.58C11.6093 13.7325 11.4525 14.0094 11.3518 14.3969C11.2543 14.7981 11.2218 15.3156 11.1925 15.9112C11.1716 16.2369 11.0594 16.6159 10.9436 17.0073L10.9435 17.0073L10.9435 17.0074C10.8959 17.1681 10.8477 17.331 10.805 17.4931C10.6587 18.0469 10.5837 18.5675 10.7593 18.9L10.7625 18.9031C11.0425 19.4856 11.5212 19.6969 12.0743 19.6512C12.6287 19.6087 13.2562 19.2738 13.7712 18.6587C14.1826 18.1609 14.7571 17.885 15.2454 17.6504L15.2454 17.6504C15.4603 17.5471 15.6585 17.4519 15.8187 17.3494C16.0787 17.1831 16.2225 17.0725 16.2356 16.855C16.2418 16.6594 16.1081 16.3438 15.705 15.9044C15.5045 15.6829 15.4431 15.3935 15.3774 15.0837L15.3631 15.0162C15.2918 14.7294 15.21 14.4525 15.0375 14.2869L15.0343 14.2837C14.8106 14.0687 14.5918 14.055 14.3287 14.0619L14.1531 14.0687C13.8568 14.4294 13.1506 14.8169 12.6625 14.7062ZM2.91308 13.6H2.92308C2.96871 13.6 3.01121 13.6031 3.05308 13.6131C3.36558 13.6588 3.64246 13.89 3.90621 14.2381L4.66433 15.625L4.66746 15.6281C4.8093 15.939 5.06192 16.25 5.32492 16.5737C5.43623 16.7107 5.54941 16.8499 5.65683 16.9925C6.01871 17.49 6.29871 17.9356 6.26621 18.3006V18.3075C6.21683 18.9256 5.86558 19.2606 5.32871 19.385C4.79121 19.4956 4.06183 19.385 3.33308 18.9975C2.75028 18.6756 2.08727 18.6149 1.53222 18.5641C1.31882 18.5446 1.12137 18.5265 0.950583 18.4956C0.644958 18.4406 0.443083 18.3263 0.348083 18.1606C0.257458 17.995 0.253708 17.6588 0.452458 17.135V17.1325C0.541795 16.8759 0.489981 16.5622 0.442695 16.2759L0.429958 16.1981C0.384333 15.8656 0.361833 15.6081 0.465583 15.4163C0.580033 15.1755 0.742987 15.1034 0.941341 15.0156C0.973706 15.0013 1.00701 14.9866 1.04121 14.9706C1.10793 14.9404 1.17806 14.9144 1.24938 14.8879L1.24939 14.8879C1.43929 14.8173 1.6377 14.7436 1.80308 14.58H1.80621V14.5769C1.91894 14.4595 2.01699 14.3262 2.11193 14.1971L2.11194 14.1971L2.11194 14.1971L2.11195 14.1971L2.11196 14.197C2.19544 14.0835 2.27653 13.9733 2.36308 13.88C2.51996 13.7106 2.67871 13.6 2.91308 13.6ZM8.63519 6.15864L8.63521 6.15863L8.63523 6.15862C8.71981 6.11574 8.80172 6.07422 8.88058 6.03813H8.87996C9.06808 5.9275 9.30246 5.76188 9.45558 5.6475C9.60558 5.48125 9.68308 5.38375 9.57558 5.37063C9.51403 5.37063 9.49003 5.40775 9.45545 5.46122C9.43034 5.50005 9.39965 5.54751 9.34496 5.59562C9.25142 5.65672 9.14606 5.73478 9.0431 5.81106C8.95962 5.87291 8.87772 5.93359 8.80496 5.98313C8.51871 6.14875 8.04371 6.37313 7.63933 6.37313C7.24148 6.37313 6.91911 6.15458 6.67583 5.98965L6.66621 5.98313C6.62416 5.94414 6.58488 5.90524 6.54806 5.86878C6.4798 5.80118 6.42002 5.74198 6.36683 5.70625C6.34655 5.68663 6.3313 5.6616 6.31618 5.6368C6.28796 5.59051 6.26022 5.54501 6.20121 5.53688C6.14246 5.53688 6.12621 5.70625 6.26308 5.81625C6.30849 5.84858 6.36277 5.89971 6.4258 5.95907C6.4712 6.00184 6.52115 6.04888 6.57558 6.09625C6.83246 6.26312 7.18746 6.48375 7.63996 6.48375C7.99384 6.48375 8.33166 6.3125 8.63519 6.15864ZM7.97871 4.71688V4.70125C7.97558 4.68438 7.98808 4.66563 8.00433 4.65875C8.06246 4.62313 8.15371 4.63562 8.21933 4.66188C8.27121 4.66188 8.35246 4.71688 8.34621 4.775C8.33933 4.81437 8.27433 4.83063 8.23183 4.83063C8.19942 4.83063 8.17317 4.81215 8.14654 4.7934C8.1362 4.78612 8.1258 4.77879 8.11496 4.7725C8.10313 4.76885 8.08826 4.7667 8.07268 4.76444C8.03227 4.75859 7.9871 4.75206 7.97808 4.71688H7.97871ZM7.42392 4.76452C7.46321 4.75883 7.50717 4.75245 7.51933 4.71687H7.51558V4.70125C7.52246 4.68437 7.50558 4.66562 7.49246 4.65875C7.42746 4.6225 7.34308 4.635 7.27496 4.66187C7.22246 4.66187 7.14496 4.71687 7.15058 4.7725C7.15433 4.81375 7.22246 4.83062 7.26496 4.83062C7.29754 4.83062 7.32343 4.81246 7.34991 4.79388C7.36051 4.78644 7.3712 4.77893 7.38246 4.7725C7.39416 4.76883 7.40869 4.76673 7.42392 4.76452Z" fill="white"/>
                    </svg>
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
          <div class="game-title-container">
            <h1 class="game-title"></h1>
            <div class="game-rating"></div>
          </div>
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
