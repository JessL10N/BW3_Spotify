const params = new URLSearchParams(window.location.search);
const artistId = params.get("id");

// Funzione per recuperare i dettagli dell'artista
function fetchArtistDetails(artistId) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta dei dettagli dell'artista");
      }
      return response.json();
    })
    .then((artist) => {
      showArtistDetails(artist);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Chiamata alla funzione con l'ID dell'artista
if (artistId) {
  fetchArtistDetails(artistId);
}

function showArtistDetails(artist) {
  const container = document.getElementById("artistDetailsContainer");

  // Costruisci il markup HTML
  const artistDetails = `
   <div class="d-flex justify-content-center">
    <div > 
    <img src="${artist.picture_big}" alt="${artist.name}" class="img-fluid " /> 
     <h3>Top 50</h3>
        <div id="tracklistContainer"></div>
    </div>
   
       
         <div class="flex-colonum mt-5 ms-4  ">
          <h2>${artist.name}</h2>
          <p>Numero di album: ${artist.nb_album}</p>
        <p>Numero di fan: ${artist.nb_fan}</p>       
         </div>
        
        </div>
       
      
    `;

  container.innerHTML = artistDetails;

  // Chiamata per recuperare e mostrare la tracklist
  fetchTracklist(artist.tracklist);
}

function fetchTracklist(tracklistUrl) {
  fetch(tracklistUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta della tracklist");
      }
      return response.json();
    })
    .then((data) => {
      showTracklist(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function showTracklist(tracks) {
  const tracklistContainer = document.getElementById("tracklistContainer");

  // Costruisci il markup per la tracklist
  tracks.forEach((track) => {
    const trackItem = document.createElement("div");
    trackItem.innerHTML = `<p>${track.title} - ${track.artist.name}</p>`;
    tracklistContainer.appendChild(trackItem);
  });
}
