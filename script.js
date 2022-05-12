//You can edit ALL of the code here

function setup() {
  // let selectSeriesValue = makePageForSeries();

  showSummaries();
  // makeMenu(selectSeriesValue);
}
//////////////////////////////make menu///////////////////
function makeMenu(selectSeriesValue) {
  fetch(`https://api.tvmaze.com/shows/${selectSeriesValue}/episodes`)
    .then((Response) => Response.json())
    .then((data) => {
      data.forEach((element) => {
        let option = document.createElement(`option`);
        let episodeNumber =
          (`0` + element.season).slice(-2) +
          `E` +
          (`0` + element.number).slice(-2);
        option.innerText = `S${episodeNumber} - ` + element.name;
        option.value = episodeNumber;
        selectEpisode.appendChild(option);
      });
    });
}
//////////////////////////////showSummaries///////////////////
function showSummaries() {
  let episodesDiv = document.getElementById(`Episods`);
  episodesDiv.innerHTML = "";
  let allShowList = getAllShows();
  for (let episode of allShowList) {
    let episodeDiv = document.createElement(`div`);
    episodeDiv.className = `episodeDiv`;
    let episodeName = document.createElement(`h4`);
    let episodeImage = document.createElement(`img`);
    episodeImage.className = `episodeImage`;
    let episodeDescribe = document.createElement(`div`);
    episodeName.innerText = episode.name;
    episodeDescribe.innerHTML = episode.summary;
    episodesDiv.appendChild(episodeDiv);
    episodeDiv.appendChild(episodeName);
    episodeDiv.appendChild(episodeImage);
    episodeDiv.appendChild(episodeDescribe);

    try {
      episodeImage.src = episode.image.medium;
    } catch (err) {
      episodeImage.alt = "Image Not Found";
    }
  }
}
/////////////////////////////Make series////////////
function makePageForSeries() {
  let allShowList = getAllShows();

  allShowList.forEach((element) => {
    let selectSeries = document.getElementById(`selectSeries`);
    let option = document.createElement(`option`);
    option.innerText = element.name;
    option.value = element.id;
    selectSeries.appendChild(option);
  });
  let selectSeries = document.getElementById(`selectSeries`);
  selectSeries.addEventListener(`change`, function () {
    if (selectSeries.value == "Show Series Summary") {
      setup();
    } else {
      selectSeriesFunction(selectSeries.value);
    }
  });
  let searchBar = document.getElementById(`searchBar`);
  searchBar.addEventListener(`keyup`, function () {
    if (selectSeries.value == "Show Series Summary") {
      runSearchBarForSeries(searchBar.value, selectSeries);
    }
  });
  return selectSeries.value;
}

function runSearchBarForSeries(searchText, selectSeries) {
  const seriesLisrt = selectSeries
    .filter((el) => el.summary != null)
    .filter(
      (ep) =>
        ep.name.toLowerCase().includes(searchText.toLowerCase()) ||
        ep.summary.toLowerCase().includes(searchText.toLowerCase())
    );
}
/////////////////////////////makePageForEpisodes Function/////////////////
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  let episodesDiv = document.getElementById(`Episods`);
  let selectEpisode = document.getElementById(`selectEpisode`);
  selectEpisode.innerHTML = "";
  let option = document.createElement(`option`);
  option.innerText = "Show all Episodes";
  selectEpisode.appendChild(option);
  episodeList.forEach((element) => {
    let option = document.createElement(`option`);
    let episodeNumber =
      (`0` + element.season).slice(-2) + `E` + (`0` + element.number).slice(-2);
    option.innerText = `S${episodeNumber} - ` + element.name;
    option.value = episodeNumber;
    selectEpisode.appendChild(option);
  });
  episodesDiv.innerHTML = "";
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
    } catch (err) {
      episodeImage.alt = "Image Not Found";
    }
  }
  let searchBar = document.getElementById(`searchBar`);
  console.log(`this is search line`, selectSeries.value);
  searchBar.addEventListener(`keyup`, function () {
    runSearchBar(searchBar.value, episodeList);
  });
  selectEpisode.addEventListener(`change`, function () {
    selectBar(selectEpisode.value, episodeList);
  });
  let backHome = document.getElementById(`ShowSeriesSummery`);

  backHome.addEventListener(`click`, function () {
    setup();
  });
}

///////////////////////selectSeries//////////////////
function selectSeriesFunction(selectSeriesValue) {
  fetch(`https://api.tvmaze.com/shows/${selectSeriesValue}/episodes`)
    .then((Response) => Response.json())
    .then((data) => {
      makePageForEpisodes(data);
    });
}
///////////////////// select Bar////////////////////
function selectBar(selectSeriesValue, episodeList) {
  const allEpisodes = episodeList;
  let episodeNum = selectSeriesValue.split(`E`);
  // console.log(selectSeriesValue);
  if (selectSeriesValue === "Show all Episodes") {
    const epList = allEpisodes;
    filterPageForEpisodes(epList);
  } else {
    const epList = allEpisodes
      .filter((el) => el.season == episodeNum[0])
      .filter((el) => el.number == episodeNum[1]);
    filterPageForEpisodes(epList);
  }
}

///////////////////////search Bar/////////////////////
function runSearchBar(searchText, episodeList) {
  const allEpisodes = episodeList;

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
      episodeImage.alt = "Image Not Found";
    }
  }
}

///////////////////////////// Copy Right Policy//////////////////////////////

//////////////////////////
window.onload = setup;
