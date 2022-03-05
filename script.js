//You can edit ALL of the code here
function setup() {
  fetch(`https://api.tvmaze.com/shows/82/episodes`)
    .then((Response) => Response.json())
    .then((data) => makePageForEpisodes(data));
}
/////////////////////////////makePageForEpisodes Function/////////////////
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  let episodesDiv = document.getElementById(`Episods`);
  episodeList.forEach((element) => {
    let selectSeries = document.getElementById(`selectSeries`);
    let option = document.createElement(`option`);
    let episodeNumber =
      (`0` + element.season).slice(-2) + `E` + (`0` + element.number).slice(-2);
    option.innerText = `S${episodeNumber} - ` + element.name;
    option.value = episodeNumber;
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
    selectSeries.addEventListener(`change`, function () {
      selectBar(selectSeries.value);
    });
  }
}
///////////////////// select Bar////////////////////
function selectBar(selectSeriesValue) {
  const allEpisodes = getAllEpisodes();
  let episodeNum = selectSeriesValue.split(`E`);
  console.log(selectSeriesValue);
  const epList = allEpisodes
    .filter((el) => el.season == episodeNum[0])
    .filter((el) => el.number == episodeNum[1]);
  filterPageForEpisodes(epList);
}

///////////////////////search Bar/////////////////////
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

//////////////////Filter Function////////////
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

///////////////////////////// Copy Right Policy//////////////////////////////

//////////////////////////
window.onload = setup;
