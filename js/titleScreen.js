// titleScreen.js
let bgReady = false;
let titleScreenBackground = new Image();
titleScreenBackground.onload = function () {
  bgReady = true;
};
titleScreenBackground.src = "images/StartScreen.png";

// Fonction pour afficher ou mettre à jour la géolocalisation
function displayGeolocation() {
  // Vérifie si le conteneur existe déjà
  let geoContainer = document.getElementById("geoContainer");

  // Si le conteneur n'existe pas, on le crée
  if (!geoContainer) {
    geoContainer = document.createElement("div");
    geoContainer.id = "geoContainer";
    geoContainer.style.position = "absolute";
    geoContainer.style.bottom = "10px";
    geoContainer.style.left = "10px";
    geoContainer.style.padding = "10px";
    geoContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    geoContainer.style.color = "white";
    geoContainer.style.fontFamily = "'Press Start 2P', monospace";
    geoContainer.style.fontSize = "12px";
    geoContainer.style.borderRadius = "5px";
    geoContainer.innerText = "Getting location...";

    // Ajoute le conteneur au document
    document.body.appendChild(geoContainer);
  }

  // Récupération de la géolocalisation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        geoContainer.innerText = `Latitude: ${latitude.toFixed(
          2
        )}, Longitude: ${longitude.toFixed(2)}`;
      },
      (error) => {
        geoContainer.innerText =
          "Unable to retrieve location. Please enable location services.";
        console.error("Geolocation error:", error.message);
      }
    );
  } else {
    geoContainer.innerText = "Geolocation is not supported by your browser.";
  }
}

// Appel unique lors du chargement de la page titre
function renderTitleScreen(delta) {
  if (bgReady) {
    ctx.drawImage(titleScreenBackground, 0, 0, canvas.width, canvas.height);
    startMeteorSpawning();
    drawMeteors(delta);
    ctx.fillStyle = "white";
    ctx.font = "50px 'SpaceMan'";
    ctx.textAlign = "center";
    ctx.fillText("Space Shooter", canvas.width / 2, 100);
    ctx.fillStyle = "#c08dd3";
    ctx.fillText("ultra", canvas.width / 2, 150);
    renderButtons();

    // Affichage unique de la géolocalisation
    if (!document.getElementById("geoContainer")) {
      displayGeolocation();
    }
  }
}

// Appelle la fonction au chargement de l'écran titre
function renderTitleScreen(delta) {
  if (bgReady) {
    ctx.drawImage(titleScreenBackground, 0, 0, canvas.width, canvas.height);
    startMeteorSpawning();
    drawMeteors(delta);
    ctx.fillStyle = "white";
    ctx.font = "50px 'SpaceMan'";
    ctx.textAlign = "center";
    ctx.fillText("Space Shooter", canvas.width / 2, 100);
    ctx.fillStyle = "#c08dd3";
    ctx.fillText("ultra", canvas.width / 2, 150);
    renderButtons();

  }
}
