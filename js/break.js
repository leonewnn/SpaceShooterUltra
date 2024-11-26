// break.js

// Indicateur de pause
let isPaused = false;

// Tableau pour stocker les boutons de la fenêtre de pause
let pauseButtons = [];

// Fonction pour dessiner la fenêtre de pause
function renderPauseMenu(ctx) {
  pauseButtons = []; // Réinitialiser les boutons de pause

  const menuWidth = 400;
  const menuHeight = 250;
  const menuX = (canvas.width - menuWidth) / 2;
  const menuY = (canvas.height - menuHeight) / 2;

  // Dessiner un fond semi-transparent avec des coins arrondis
  ctx.fillStyle = "rgba(0, 0, 64, 0.9)"; // Bleu foncé semi-transparent
  ctx.beginPath();
  ctx.roundRect(menuX, menuY, menuWidth, menuHeight, 20); // Coins arrondis
  ctx.fill();

  // Ajouter une bordure lumineuse arrondie
  ctx.strokeStyle = "cyan"; // Couleur lumineuse
  ctx.lineWidth = 4;
  ctx.stroke();

  // Texte "Pause"
  ctx.font = "36px 'SpaceMan', monospace"; // Utiliser la police SpaceMan
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("PAUSE", menuX + menuWidth / 2, menuY + 50);

  // Ajouter les boutons
  drawPauseButton(ctx, "resume", menuX + menuWidth / 2, menuY + 120, resumeGame);
  drawPauseButton(ctx, "main menu", menuX + menuWidth / 2, menuY + 190, goToMainMenu);
}

// Fonction pour dessiner un bouton
function drawPauseButton(ctx, label, x, y, onClick) {
  const buttonWidth = 300;
  const buttonHeight = 50;

  ctx.fillStyle = "rgba(0, 128, 255, 0.8)"; // Bleu clair semi-transparent
  ctx.beginPath();
  ctx.roundRect(
    x - buttonWidth / 2,
    y - buttonHeight / 2,
    buttonWidth,
    buttonHeight,
    15 // Rayon des coins arrondis
  );
  ctx.fill();

  // Ajouter une bordure lumineuse arrondie
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Texte du bouton
  ctx.font = "20px 'SpaceMan', monospace"; // Utiliser la police SpaceMan
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);

  // Ajouter les informations pour détecter les clics
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
