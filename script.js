//You can edit ALL of the code here
function setup() {
  fetch(`https://api.tvmaze.com/shows/82/episodes`)
    .then((Response) => Response.json())
    .then((data) => makePageForEpisodes(data));
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  let episodesDiv = document.getElementById(`Episods`);
  episodeList.forEach((element) => {
    let selectSeries = document.getElementById(`selectSeries`);
    let option = document.createElement(`option`);
    option.innerText = element.name;
    selectSeries.appendChild(option);
  });
  
  for (let episode of episodeList) {
    let episodeDiv = document.createElement(`div`);
    episodeDiv.className = `episodeDiv`;
    let episodeName = document.createElement(`h4`);
    let episodeImage = document.createElement(`img`);
    episodeImage.className = `episodeImage`;
    let episodeDescribe = document.createElement(`div`);
    let episodeNumber =
      (`0` + episode.season).slice(-2) + `E` + (`0` + episode.number).slice(-2);
    episodeName.innerText = `${episode.name} - S${episodeNumber}`;
    episodeDescribe.innerHTML = episode.summary;
    episodesDiv.appendChild(episodeDiv);
    episodeDiv.appendChild(episodeName);
    episodeDiv.appendChild(episodeImage);
    episodeDiv.appendChild(episodeDescribe);

    try {
      episodeImage.src = episode.image.medium;
    } catch {
      episodeImage.src = "img/notFound.jpg";
    }
    let searchBar = document.getElementById(`searchBar`);

    searchBar.addEventListener(`keyup`, function () {
      runSearchBar(searchBar.value);
    });
  }
}

function runSearchBar(searchText) {
  const allEpisodes = getAllEpisodes();

  const epList = allEpisodes
    .filter((el) => el.summary != null)
    .filter(
      (ep) =>
        ep.name.toLowerCase().includes(searchText.toLowerCase()) ||
        ep.summary.toLowerCase().includes(searchText.toLowerCase())
    );
  filterPageForEpisodes(epList);
}

function filterPageForEpisodes(episodeList) {
  let episodesDiv = document.getElementById(`Episods`);
  episodesDiv.innerHTML = ``;
  for (let episode of episodeList) {
    let episodeDiv = document.createElement(`div`);
    episodeDiv.className = `episodeDiv`;
    let episodeName = document.createElement(`h4`);
    let episodeImage = document.createElement(`img`);
    episodeImage.className = `episodeImage`;
    let episodeDescribe = document.createElement(`div`);
    let episodeNumber =
      (`0` + episode.season).slice(-2) + `E` + (`0` + episode.number).slice(-2);
    episodeName.innerText = `${episode.name} - S${episodeNumber}`;
    episodeDescribe.innerHTML = episode.summary;
    episodesDiv.appendChild(episodeDiv);
    episodeDiv.appendChild(episodeName);
    episodeDiv.appendChild(episodeImage);
    episodeDiv.appendChild(episodeDescribe);
    try {
      episodeImage.src = episode.image.medium;
    } catch {
      episodeImage.src = "img/notFound.jpg";
    }
  }
}

window.onload = setup;
