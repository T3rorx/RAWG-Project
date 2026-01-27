import { API_KEY, API_BASE_URL } from '../config/api.js';

const pageContent = document.querySelector('#pageContent');

export const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, released, description } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      if (articleDOM) {
        const titleElement = articleDOM.querySelector("h1.title");
        const releaseElement = articleDOM.querySelector("p.release-date span");
        const descriptionElement = articleDOM.querySelector("p.description");
        
        if (titleElement) titleElement.innerHTML = name;
        if (releaseElement) releaseElement.innerHTML = released;
        if (descriptionElement) descriptionElement.innerHTML = description;
      }
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
          <h1 class="title text-3xl font-bold text-white mb-4"></h1>
          <p class="release-date text-gray-400 mb-4">Release date : <span class="text-white"></span></p>
          <p class="description text-gray-300 leading-relaxed"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
