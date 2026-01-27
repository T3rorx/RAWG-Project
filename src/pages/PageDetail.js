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
        <div class="article">
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
