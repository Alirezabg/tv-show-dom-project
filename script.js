//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  
  let episodesDiv = document.getElementById(`Episods`);

  for (let episode of episodeList) {
    let episodeName = document.createElement(`p`);
    let episodeDiv = document.createElement(`div`);
    episodeDiv.appendChild(episodeName);
    episodesDiv.appendChild(episodeDiv);
    episodeName.innerText = "Name : " + episode.name;
    let episodeImage = document.createElement(`img`);
    episodeDiv.appendChild(episodeImage);
    episodeImage.src = episode.image.medium;
    console.log(episode, episode.name);
    
  }
  
}

window.onload = setup;


