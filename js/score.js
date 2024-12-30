// score.js
let playerScore = 0;
let scoreInterval;
const highScoreSound = new Audio('audio/Won.wav');
highScoreSound.volume = 0.05;
let highScoreSoundPlayed = false;
let scoreAnimation = { active: false, startTime: 0, duration: 3000 };

// Fonction pour styliser et afficher le score en haut à droite avec un cadre
function drawScore() {
  const scoreBoxWidth = 150;
  const scoreBoxHeight = 40;
  const scoreBoxX = canvas.width - scoreBoxWidth - 20;
  const scoreBoxY = 20;

  // Dessiner le cadre
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(scoreBoxX, scoreBoxY, scoreBoxWidth, scoreBoxHeight);

  // Dessiner la bordure du cadre
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.strokeRect(scoreBoxX, scoreBoxY, scoreBoxWidth, scoreBoxHeight);

  // Gérer l'animation du score
  let fontSize = 20;
  let fontColor = "#FFFFFF";
  if (scoreAnimation.active) {
    const elapsed = Date.now() - scoreAnimation.startTime;
    const progress = Math.min(elapsed / scoreAnimation.duration, 1);
    fontSize = 20 + 10 * progress; // Augmenter la taille de la police
    fontColor = `rgba(255, 255, 0, ${1 - progress})`; // Changer la couleur vers le jaune
    if (progress >= 1) {
      scoreAnimation.active = false; // Terminer l'animation
    }
  }

  // Afficher le texte du score à l'intérieur du cadre
  ctx.font = `${fontSize}px 'Courier New', monospace`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    "Score: " + playerScore,
    scoreBoxX + scoreBoxWidth / 2,
    scoreBoxY + scoreBoxHeight / 2
  );
}

function startScoreIncrement() {
  scoreInterval = setInterval(() => {
    playerScore += 2;
    checkHighScore(); // Vérifie si le score actuel dépasse le précédent record
  }, 1000);
}

function stopScoreIncrement() {
  if (scoreInterval) {
    clearInterval(scoreInterval);
    scoreInterval = null;
  }
}

function increaseScore(amount = 10) {
  playerScore += amount;
  checkHighScore(); // Vérifie si le score actuel dépasse le précédent record
}

// js/score.js
function checkHighScore() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const highScore = highScores.length > 0 ? highScores[0].score : null;

  if (highScore !== null && playerScore > highScore && !highScoreSoundPlayed) {
    highScoreSound.play();
    highScoreSoundPlayed = true; // Marquer le son comme joué

    // Démarrer l'animation du score
    scoreAnimation.active = true;
    scoreAnimation.startTime = Date.now();
  }
}