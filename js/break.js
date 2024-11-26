// break.js

// Indicateur de pause
let isPaused = false;

// Tableau pour stocker les boutons de la fenêtre de pause
let pauseButtons = [];

// Fonction pour dessiner la fenêtre de pause
function renderPauseMenu(ctx) {
  pauseButtons = []; // Réinitialiser les boutons de pause

  const menuWidth = 300;
  const menuHeight = 200;
  const menuX = (canvas.width - menuWidth) / 2;
  const menuY = (canvas.height - menuHeight) / 2;

  // Dessiner le fond de la pause
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(menuX, menuY, menuWidth, menuHeight);

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.strokeRect(menuX, menuY, menuWidth, menuHeight);

  // Texte "Pause"
  ctx.font = "24px 'Courier New', monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("Pause", menuX + menuWidth / 2, menuY + 40);

  // Ajouter les boutons de pause
  drawPauseButton(ctx, "Reprendre", menuX + menuWidth / 2, menuY + 90, resumeGame);
  drawPauseButton(ctx, "Menu Principal", menuX + menuWidth / 2, menuY + 140, goToMainMenu);
}

// Fonction pour dessiner un bouton
function drawPauseButton(ctx, label, x, y, onClick) {
  const buttonWidth = 200;
  const buttonHeight = 40;

  // Dessiner le bouton
  ctx.fillStyle = "#27a448";
  ctx.fillRect(
    x - buttonWidth / 2,
    y - buttonHeight / 2,
    buttonWidth,
    buttonHeight
  );

  // Dessiner le texte
  ctx.font = "20px 'Courier New', monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);

  // Ajouter les informations du bouton pour la détection des clics
  pauseButtons.push({
    x: x - buttonWidth / 2,
    y: y - buttonHeight / 2,
    width: buttonWidth,
    height: buttonHeight,
    onClick,
  });
}

// Gestion des clics sur les boutons de pause
canvas.addEventListener("click", function handlePauseClick(event) {
  if (!isPaused) return; // Ignorer les clics si le jeu n'est pas en pause

  const clickX = event.offsetX;
  const clickY = event.offsetY;

  // Vérifie si le clic correspond à un bouton
  for (const button of pauseButtons) {
    if (
      clickX >= button.x &&
      clickX <= button.x + button.width &&
      clickY >= button.y &&
      clickY <= button.y + button.height
    ) {
      button.onClick(); // Appelle l'action associée au bouton
      break; // Stop après le clic sur un bouton
    }
  }
});

// Fonction pour reprendre le jeu
function resumeGame() {
  isPaused = false; // Reprendre le jeu
  console.log("Jeu repris !");
  requestAnimationFrame(main); // Redémarre la boucle de rendu
}

// Fonction pour retourner au menu principal
function goToMainMenu() {
  isPaused = false; // Arrêter la pause
  gameState = "titleScreen"; // Retourner à l'écran titre
  console.log("Retour au menu principal !");
  requestAnimationFrame(main); // Redémarre la boucle de rendu
}
