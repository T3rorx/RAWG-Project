import { API_KEY, API_BASE_URL } from '../config/api.js';

const pageContent = document.querySelector('#pageContent');

export const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        `<article class="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
          <h1 class="text-xl font-bold text-white mb-2">${article.name}</h1>
          <h2 class="text-gray-400 text-sm mb-3">${article.released || 'Date non disponible'}</h2>
          <a href="#pagedetail/${article.id}" class="text-blue-400 hover:text-blue-300 transition-colors">
            Voir les détails
          </a>
        </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      if (resultsContainer) {
        resultsContainer.innerHTML = resultsContent.join("\n");
      }
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="text-center text-gray-400">Loading...</div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
