// buttons.js
let buttonPlay = {
  width: 230,
  y: 275,
  height: 80,
  color: "#27a448",
  radius: 20,
  label: "PLAY",
  onClick: function () {
    console.log("Click playbtn");
    gameState = "playScreen"; // Change l'état du jeu
    resetMeteorSpawning(); // Réinitialise les météorites
    startScoreIncrement(); // Commence le score
  },
};

let buttonScoreBoard = {
  width: 360,
  y: 400,
  height: 80,
  color: "#f68d14",
  radius: 20,
  label: "SCOREBOARDD",
  onClick: function () {
    console.log("Click scoreboardbtn");
    window.location.href = "scoreboard.html?fromMenu=true"; // paramètre `fromMenu`
  },
};

let buttonChangeRocket = {
  width: 550,
  y: 500,
  height: 80,
  color: "#3d85c6",
  radius: 20,
  label: "CHANGE ROCKET",
  onClick: function () {
    window.location.href = "rocketSelect.html";
  },
};

let buttons = [buttonPlay, buttonScoreBoard, buttonChangeRocket];

function drawButton(btn) {
  ctx.save();
  ctx.shadowColor = btn.color;
  ctx.shadowBlur = 10;

  ctx.beginPath();
  ctx.roundRect(btn.x, btn.y, btn.width, btn.height, btn.radius);
  ctx.fillStyle = btn.color;
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "30px 'SpaceMan'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(btn.label, btn.x + btn.width / 2, btn.y + btn.height / 2);
  ctx.restore();
}

function renderButtons() {
  buttons.forEach((button) => {
    button.x = (canvas.width - button.width) / 2;
    drawButton(button);
  });
}

canvas.addEventListener("click", function (event) {
  if (gameState !== "titleScreen") return; // Ne traiter que les clics du menu principal dans l'écran titre

  const clickX = event.offsetX;
  const clickY = event.offsetY;

  buttons.forEach((button) => {
    if (
      clickX >= button.x &&
      clickX <= button.x + button.width &&
      clickY >= button.y &&
      clickY <= button.y + button.height
    ) {
      console.log("Bouton principal cliqué :", button.label);
      button.onClick();
    }
  });
});

canvas.addEventListener("click", function handleClick(event) {
  const clickX = event.offsetX;
  const clickY = event.offsetY;

  // Gestion des clics pour le menu principal
  if (gameState === "titleScreen") {
    buttons.forEach((button) => {
      if (
        clickX >= button.x &&
        clickX <= button.x + button.width &&
        clickY >= button.y &&
        clickY <= button.y + button.height
      ) {
        button.onClick();
      }
    });
  }

  // Gestion des clics pour le menu de pause
  if (isPaused && gameState === "playScreen") {
    pauseButtons.forEach((button) => {
      if (
        clickX >= button.x &&
        clickX <= button.x + button.width &&
        clickY >= button.y &&
        clickY <= button.y + button.height
      ) {
        button.onClick();
      }
    });
  }
});

canvas.addEventListener("click", function handleButtonClick(event) {
  const clickX = event.offsetX;
  const clickY = event.offsetY;

  if (gameState === "titleScreen") {
    // Gestion des boutons du menu principal
    buttons.forEach((button) => {
      if (
        clickX >= button.x &&
        clickX <= button.x + button.width &&
        clickY >= button.y &&
        clickY <= button.y + button.height
      ) {
        button.onClick();
      }
    });
  }
});
