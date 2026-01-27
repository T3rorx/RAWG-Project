Créer un router et un système de template
1. Introduction
Il existe ce que l'on appelle des Single Page Application. Ce sont des sites Web situés sur une seule page HTML. En cliquant sur des liens, on remplace simplement le contenu, ou alors on déplace le contenu pour en afficher un nouveau. À première vue, cela n'est pas très utile. Mais lorsqu'on y réfléchit, on peut trouver plusieurs avantages à cela.

Pour commencer, cela nous empêche de subir les chargements de nos navigateurs lorsque l'on change de page. De plus, cela permet de faire des transitions de page. Ou alors, au clic sur un lien, on peut exécuter des fonctions. Le but est de faire ressentir de plus en plus à l'utilisateur une impression d'application native alors que l'on est sur une page Internet.

Le projet suivant est très long et chargé. Ne t'attarde pas sur ces notions de manière théorique. Il faudra plutôt que tu les étudies une fois devant les divers problèmes auxquels tu devras faire face.

2. Historique et contexte
La date de "naissance" des SPA est assez incertaine. Mais en avril 2002, on peut déjà trouver Stuart Morris, un étudiant de l'université de Cardiff. Celui-ci code SlashDotSlash, qui, pour l'époque, semble déjà être l'ébauche d'une SPA. Sur cette page, on peut trouver son processus de réflexion et ses travaux de recherche. Plusieurs décennies plus tard, la majorité des sites web récents suivent son modèle (en l'ayant amélioré).

De plus en plus d'applications sont trouvables sur ce format. Nous aborderons ce thème en profondeur plus tard dans la formation. La plupart des SPA sont faites avec des frameworks.

Notre objectif aujourd'hui sera de faire une simili-SPA en JavaScript vanilla, moins performante et optimisée, car il serait extrêmement long de mettre en place l'ensemble des mécanismes mis en place par ces frameworks. Mais le concept est là.

3. Démarrer une simili-SPA
3.1. Mettre en place un router
Pour mettre en place notre SPA, nous allons utiliser l'API du projet des jours à venir : RAWG.

Nous aurons 2 templates : PageList et PageDetail. Le premier template nous affiche une liste de jeux vidéo. Le second affiche les détails sur un jeu précis.

Dans notre application, nous allons avoir 3 pages :

La page d'accueil qui affichera une liste des jeux les plus récents
Une page qui affichera la liste des jeux suite à une recherche de l'utilisateur
Une page qui affichera les détails d'un jeu (lorsque l'utilisateur clique dessus)
Comme la page d'accueil et la page de résultat de recherche affichent les mêmes choses, mais avec un contenu différent, elles utiliseront toutes les 2 le template PageList.

Un router est un composant qui va nous permettre d'afficher une page différente selon l'URL. Par exemple si l'URL est comme telle : monurl.com/pagelist/toto alors nous allons afficher notre template PageList et nous avons un paramètre toto nous permettant de savoir quel contenu afficher dans cette page.

Pour avoir une SPA, nous aurons donc besoin d'un seul fichier HTML : index.html.

<!DOCTYPE html>
<html>
  <head>
    <title>Basic routing</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <a href="#">Home</a>
    <a href="#pagelist">PageList</a>
    <a href="#pagelist/borderlands">PageList borderlands</a>

    <section id="pageContent">Choisissez un lien</section>

    <script src="js/Home.js"></script>
    <script src="js/PageList.js"></script>
    <script src="js/PageDetail.js"></script>
    <script src="js/routes.js"></script>
    <script src="js/index.js"></script>
  </body>
</html>
Comme tu peux le remarquer, nos liens ont un # devant leur URL. Nous faisons cela pour activer l'eventListener "hashchange", qui active une fonction quand l'URL change. Grâce à cela, on clique sur un lien, mais on n’a pas de temps de chargement entre les pages.

Dans notre fichier routes.js, nous listons les templates à afficher en fonction de l'URL

const routes = {
  '': Home,
  'pagelist': PageList,
  'pagedetail': PageDetail,
};
Dans nos fichiers Home, PageList et PageDetail, tu vas pour le moment placer des fonctions du même nom. Affichant simplement des console.log(). Par exemple :

const PageList = (argument = '') => {
  console.log('Page List', argument);
};
Dans notre fichier index.js, nous allons mettre ce code qui nous servira de router :

const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());
Expliquons-le un peu. Nous créons des eventListener : dès que le DOM est chargé ou que l'URL change, nous appelons la fonction callRoute(). Celle-ci va chercher la partie hash dans l'URL actuelle de la page, et la sépare en plusieurs parties selon la position du /. Par exemple :

L'URL http://monsite.com/#pagelist/borderlands donnera le tableau : ['pagelist', 'borderlands'].

L'URL http://monsite.com/#pagedetail/3543 donnera le tableau : ['pagedetail', '3543'].

L'URL http://monsite.com/#pagelist donnera le tableau : ['pagelist'].

On a donc décomposé le "hash" de l'URL en plusieurs parties, dans un tableau contenant des chaînes de caractères :

la première partie (index 0) est le nom (pageName) de notre page,
la seconde (index 1) si elle existe, est un "argument" (pageArgument) qu'on pourra utiliser dans cette page.
Ensuite, on va récupérer la fonction à exécuter pour la page demandée, grâce à l'objet de mapping routes. Un "objet de mapping" est simplement un objet standard (qui contient des clés et des valeurs, donc), qui va juste servir à faire correspondre des éléments entre eux. Ici, on veut faire correspondre des noms de page (les strings pagelist, ou pagedetail, etc.) à des fonctions JS à exécuter (PageList(), PageDetail()...).

On va donc chercher directement la fonction correspondant à notre page dans la constante routes, en utilisant la syntaxe suivante : routes[pageName]. Si cette clé existe, sa valeur une fonction qu'on peut donc exécuter directement ! On aurait même pu faire directement : routes[pageName](pageArgument), mais pour la lisibilité du code c'est mieux de déclarer une const pageFunction, c'est plus parlant.

Par exemple, si pageName vaut 'pagedetail', et que pageArgument vaut 3543, alors on récupère la fonction PageDetail qui se trouve dans la clé 'pagedetail' de l'objet routes, et on l'exécute en lui passant 3543 comme argument, ce qui équivaudrait à écrire PageDetail(3543).

Si déjà tu lances ton site actuellement, à chaque fois que tu "changeras" de page en cliquant sur les liens, tu verras tes différents console.log() s'afficher selon la page (et donc la fonction) exécutée.

3.2. Mettre en place une vue
Désormais, quand on arrive sur l'URL "PageList", on exécute la fonction associée. Maintenant, nous devons afficher du contenu dans notre page en fonction de notre URL :

const PageList = (argument = '') => {
  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">Hey, this page is a PageList template, about : ${argument}</div>
      </section>
    `;
  };
};
En faisant cela, nous créons un template de page. En fonction de notre argument, nous changeons le contenu de la page. Si jamais on souhaite afficher l'ensemble des articles disponibles dans l'API, nous pouvons créer une nouvelle méthode preparePage.

const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        `<article class="cardGame">
          <h1>${article.name}</h1>
          <h2>${article.released}</h2>
          <a href="#pagedetail/${article.id}">${article.id}</a>
        </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">Loading...</div>
      </section>
    `;

    preparePage();
  };

  render();
};
Dans notre render, on appelle la fonction pour préparer nos données à afficher. Dedans, on récupère notre argument passé en URL. On enlève les espaces en trop (avec trim()) et on remplace les espaces entre les mots par des -, afin que le terme de recherche soit plus clair pour l'API.

Si on a un argument, on appelle l'API en lui demandant de rechercher les jeux contenant notre terme de recherche dans leur nom. Puis on les stocke dans une variable articles que l'on affiche en innerHTML. Si on n’a pas d'argument, on affiche les jeux initiaux prévus par l'API sans recherche.

Tu l'as sûrement vu, on a besoin d'une clé d'API de RAWG pour que notre exemple fonctionne : pour chaque requête, il faut lui passer une querystring avec une valeur valide pour key=. Bien entendu, cette clé devra être stockée dans un fichier à part (et ignoré) !

Le template de la page détail
Nous avons une page détail. Tu peux trouver une ébauche de code ci-dessous :

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, released, description } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
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
Quand on clique sur un lien généré précédemment dans le template PageList, on passe une URL ressemblant à cet exemple : /#pagedetail/3388. On appelle donc le template PageDetail. Celui-ci a aussi une méthode render(), qui affiche notre code HTML... sans le contenu, juste la structure. Le contenu est affiché dans la fonction displayGame().

💡 Faire des composants

Grâce à notre système de SPA et de fonctions retournant du HTML, nous pouvons créer des objets réutilisables. Imaginons que tu souhaites réutiliser plusieurs fois un même bout de code, par exemple un bouton, tu vas pouvoir le stocker dans des fonctions. Tu peux même mettre des paramètres pour changer le contenu ! En voici un exemple (bon, celui-ci est très simple et inutile, mais tu comprends le principe) :

const Button = (text) => {
  return `<button class="awesome-button">${text}</button>`;
};
Dans tes autres pages, tu pourras ainsi intégrer ton bout de code plusieurs fois ! Par exemple :

// Le début de ton template HTML
`<div class="multiple-button">
  ${Button("Click here")}
  ${Button("Read more")}
  ${Button("One more !")}
</div>`;
4. Ce qu'il faut retenir
Il est assez simple de mettre en place un router et des templates JavaScript. Ceux-ci nous permettent de mettre en place une SPA. Ainsi, nous n'avons pas les chargements classiques du navigateur, et on a une impression plus native de notre site web. Nous venons de créer une base de framework très basique, en quelques lignes. Mais tu remarqueras quelque chose : ce n'est PAS DU TOUT agréable à écrire, et pour bien faire les choses il faudrait encore beaucoup améliorer tout ça ! Mais il faut en passer par là, pour bien que tu comprennes comment fonctionne un framework dans le fond.

Il est désormais temps d'utiliser ce starter pour passer au projet du jour ! Mais attention, il va falloir le transformer en un projet qui utilise Webpack, les imports de tous les fichiers dans le HTML sont donc à enlever, et il faut les transformer en import / export !