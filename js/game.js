// game.js
let gameState = "titleScreen";
let gameOver = false; //Indique si le joueur a perdu
let lastTime = performance.now(); // Temps de la dernière frame
let fireRate = 600; // Temps de la dernière frame
let bonusActive = false; // Indique si le power-up bonus est actif
let bonusOffset = 100; // Décalage des tirs bonus en millisecondes
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
    spaceshipPos -= spaceshipSpeed * delta;
    if (spaceshipPos < 0) spaceshipPos = 0; // Limite à gauche
  }
  if (rightPressed) {
    spaceshipPos += spaceshipSpeed * delta;
    if (spaceshipPos > canvas.width - 75) spaceshipPos = canvas.width - 75; // Limite à droite
  }
  if (upPressed) {
    spaceshipY -= spaceshipSpeed * delta;
    if (spaceshipY < 0) spaceshipY = 0; // Limite en haut
  }
  if (downPressed) {
    spaceshipY += spaceshipSpeed * delta;
    if (spaceshipY > canvas.height - 90) spaceshipY = canvas.height - 90; // Limite en bas
  }
}

// Intervalle pour gérer les tirs synchronisés
setInterval(() => {
  // Tir normal
  addMissile(15, 51, 5);

  // Tir bonus avec décalage si actif
  if (bonusActive) {
    setTimeout(() => {
      addMissile(-1, 65, -15); // Tirs bonus avec ajustements
    }, bonusOffset);
  }
}, fireRate);

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
    lastTime = currentTime; // Réinitialise lastTime pour ignorer le temps en pause
    return; // Empêche les autres mises à jour
  }

  // Ajuste delta pour ignorer le temps passé en pause
  const delta = (currentTime - lastTime) / 1000; // Convertir le delta en secondes
  lastTime = currentTime;

  // Mettez à jour les éléments du jeu ici
  updateSpaceshipPosition(delta);
  render(delta);
  handleSpaceShipCollisions();

  requestAnimationFrame(main); // Boucle la fonction
}

// Démarrer la boucle de jeu
requestAnimationFrame(main);
