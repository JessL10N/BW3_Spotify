function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getAlbumDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');
  if (albumId) {
      fetchAlbumDetails(albumId);
  } else {
      console.error("ID NON IN URL");
  }
}

// INIZIO PAGINA
document.addEventListener('DOMContentLoaded', getAlbumDetails);

// CHIAMA API
async function fetchAlbumDetails(albumId) {
  try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`);
      if (!response.ok) throw new Error("ERRORE DATI ALBUM");
      const data = await response.json();

      //QUERIES
      const row = document.querySelector("#album-row");
      const trackList = document.querySelector("#track-list");

      //TRACKS CYCLE AND LI CREATE
      data.tracks.data.forEach((track) => {
          const li = document.createElement("li");
          li.innerHTML = `${track.title} - ${formatDuration(track.duration)}`;
          trackList.appendChild(li);
      });

      //HTML STRUCTURE
      row.innerHTML = `
      <div class="container-fluid m-3">
          <div class="row align-items-center">
              <div class="container col-4">
                  <img src="${data.cover_xl}" alt="${data.title}" class="img-fluid"> 
              </div>
              <div class="container col-8">
                  <label for="album-title">ALBUM</label>
                  <h1 id="album-title">${data.title}</h1>
                  <p>
                      <img src="${data.artist.picture}" alt="${data.artist.name}" class="img-fluid"> 
                      ${data.artist.name} 
                      ${data.release_date} 
                      ${data.nb_tracks} tracks 
                      ${formatDuration(data.duration)}
                  </p>
              </div>
          </div>
      </div>`;
  } catch (error) {
      console.error("Errore:", error);
  }
}
