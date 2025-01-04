//life.js

// Chargement de l'image du sprite avec 5 états
let spriteSheet = new Image();
spriteSheet.src = "images/Hearts/animated/border/hearts_animated_2.png";

let animationsCompleted = 0; // Compteur d'animations terminées
let livesCount = 3; // Compteur de vies

// Largeur et hauteur d'un état dans le sprite sheet
let spriteWidth, spriteHeight;
spriteSheet.onload = function () {
  spriteWidth = spriteSheet.width / 5; // Diviser par 5 pour obtenir la largeur d'un état
  spriteHeight = spriteSheet.height;
};

// Variables pour l'animation
let currentState = 0; // État actuel du sprite
let animationStarted = false;
let animationCompleted = false;

let imagesAnimated = [false, false, false]; // Initialisé pour 3 images
let currentImageIndex = 2; // On commence par l'image la plus à droite

// Fonction pour démarrer l'animation
// Fonction pour démarrer l'animation
function startLifeAnimation() {
  console.log("Début de l'animation pour la perte de vie");
  if (animationStarted) return;

  // Trouver la vie la plus à droite qui n'est pas déjà animée
  currentImageIndex = imagesAnimated.lastIndexOf(false);

  if (currentImageIndex === -1) return; // Si toutes les vies sont déjà animées, ne rien faire

  animationStarted = true;
  animationCompleted = false;
  currentState = 0;

  imagesAnimated[currentImageIndex] = true;

  let animationInterval = setInterval(() => {
    if (currentState < 4) {
      currentState++;
    } else {
      clearInterval(animationInterval);
      animationCompleted = true;
      animationStarted = false;

      animationsCompleted++;
      livesCount--; // Décrémenter le compteur de vies
      checkGameOver();
    }
  }, 200);
}

// Vérifie si toutes les animations sont terminées
function checkGameOver() {
  if (livesCount <= 0) {
    gameOver = true;

    // Stocker le score et rediriger vers le scoreboard
    localStorage.setItem("playerScore", playerScore);
    localStorage.setItem("scoreSubmitted", "false");

    setTimeout(() => {
      window.location.href = "scoreboard.html";
    }, 3000);
  }
}

// Fonction pour dessiner un état spécifique du sprite
function drawLife(xPos, yPos, state = 0) {
  if (!spriteWidth || !spriteHeight) return; // S'assurer que le sprite est chargé

  let sourceX = state * spriteWidth; // Position dans le sprite sheet
  ctx.drawImage(
    spriteSheet,
    sourceX,
    0,
    spriteWidth,
    spriteHeight,
    xPos,
    yPos,
    spriteWidth,
    spriteHeight
  );
}