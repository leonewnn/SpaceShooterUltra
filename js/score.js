// score.js
let playerScore = 2950;
let scoreInterval;

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

  // Afficher le texte du score à l'intérieur du cadre
  ctx.font = "20px 'Courier New', monospace";
  ctx.fillStyle = "#FFFFFF";
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
    // updateDifficulty(playerScore); // Passive score increase
  }, 1000);
}

function stopScoreIncrement() {
  if (scoreInterval) {
    clearInterval(scoreInterval);
    scoreInterval = null;
  }
}

// Fonction pour augmenter le score après chaque destruction de meteor
function increaseScore(amount = 10) {
  playerScore += amount;
  //updateDifficulty(playerScore); // Active score increase from destroying meteors
}
