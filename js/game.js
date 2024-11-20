// game.js
let gameState = "titleScreen";
let gameOver = false; //Indique si le joueur a perdu
let lastTime = 0;
let fireRate = 600; // Temps de la dernière frame
window.ctx = canvas.getContext("2d"); // Déclare `ctx` comme variable globale

function render(delta) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameState === "titleScreen") {
    renderTitleScreen(delta);
  } else if (gameState === "playScreen") {
    renderPlayScreen(delta);
  }
}

function renderGameOver() {
  // Dessiner le fond d'écran du jeu (comme dans renderPlayScreen)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(playScreenBackground, 0, 0, canvas.width, canvas.height);

  // Afficher le message "Game Over" au centre
  ctx.font = "48px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

// Fonction pour mettre à jour la position du vaisseau avec delta
function updateSpaceshipPosition(delta) {
  if (leftPressed) {
    spaceshipPos -= spaceshipSpeed * delta; // Utilise delta pour ajuster la vitesse
  }
  if (rightPressed) {
    spaceshipPos += spaceshipSpeed * delta;
  }
}

setInterval(addMissile, fireRate); // 1000 ms = 1 seconde

// Fonction principale avec delta
function main(currentTime) {
  if (gameOver) {
    renderGameOver(); // Affiche "Game Over" si le jeu est terminé
    return;
  }

  if (isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface l'écran
    renderPlayScreen(); // Affiche l'écran du jeu en arrière-plan
    renderPauseMenu(ctx); // Dessine le menu de pause
    return; // Empêche les autres mises à jour
  }
  let delta = (currentTime - lastTime) / 1000; // Convertir le delta en secondes
  lastTime = currentTime;

  // Appeler les fonctions de mise à jour et de rendu
  updateSpaceshipPosition(delta);

  render(delta);
  handleSpaceShipCollisions();

  requestAnimationFrame(main);
  drawImpacts();
}

// Démarrer la boucle de jeu
requestAnimationFrame(main);
