//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  let episodesDiv = document.getElementById(`Episods`);

  for (let episode of episodeList) {
    let episodeName = document.createElement(`h4`);
    let episodeDiv = document.createElement(`div`);
    let episodeImage = document.createElement(`img`);
    let episodeDescribe = document.createElement(`div`);
    episodeDiv.appendChild(episodeName);
    episodesDiv.appendChild(episodeDiv, episodeDescribe);
    let episodeNumber =
      (`0` + episode.season).slice(-2) + `E` + (`0` + episode.number).slice(-2);
    episodeName.innerText = `${episode.name} - S${episodeNumber}`;
    episodeDescribe.innerHTML = episode.summary;

    episodeDiv.appendChild(episodeImage);
    episodeImage.src = episode.image.medium;

    console.log(episode, episode.name);
  }
}

window.onload = setup;
