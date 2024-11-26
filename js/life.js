// Chargement de l'image du sprite avec 5 états
let spriteSheet = new Image();
spriteSheet.src = "images/Hearts/animated/border/hearts_animated_2.png";

let animationsCompleted = 0; //Compteur d'animations terminées

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
function startLifeAnimation() {
  console.log("Début de l'animation pour la perte de vie");
  if (animationStarted || imagesAnimated[currentImageIndex]) return;

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
      currentImageIndex = imagesAnimated.lastIndexOf(false);
      checkGameOver();
    }
  }, 200);
}

// Vérifie si toutes les animations sont terminées
function checkGameOver() {
  if (animationsCompleted >= imagesAnimated.length) {
    gameOver = true;

    // Stocker le score et rediriger vers le scoreboard
    localStorage.setItem("playerScore", playerScore);
    localStorage.setItem("scoreSubmitted", "false");

    setTimeout(() => {
      window.location.href = "scoreboard.html";
    }, 3000);
  }
}

// Fonction pour sauvegarder le score dans localStorage (dans scoreboard.html)
function saveHighScore(name, score) {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ name, score });
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(10); // Garde uniquement les 10 meilleurs scores
  localStorage.setItem("highScores", JSON.stringify(highScores));
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
