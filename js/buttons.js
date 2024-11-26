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
    gameState = "playScreen";
  },
};

let buttonScoreBoard = {
  width: 360,
  y: 400,
  height: 80,
  color: "#f68d14",
  radius: 20,
  label: "SCOREBOARD",
  onClick: function () {
    console.log("Click scoreboardbtn");
  },
};
let buttonChangeSpaceship = {
  width: 550,
  y: 500,
  height: 80,
  color: "#3d85c6",
  radius: 20,
  label: "CHANGE SPACESHIP",
  onClick: function () {
    console.log("Click change spaceship");
  },
};

let buttons = [buttonPlay, buttonScoreBoard, buttonChangeSpaceship];

function drawButton(btn) {
  ctx.beginPath();
  ctx.roundRect(btn.x, btn.y, btn.width, btn.height, btn.radius);
  ctx.fillStyle = btn.color;
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "30px 'SpaceMan'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(btn.label, btn.x + btn.width / 2, btn.y + btn.height / 2);
}

function renderButtons() {
  buttons.forEach((button) => {
    button.x = (canvas.width - button.width) / 2;
    drawButton(button);
  });
}

canvas.addEventListener("click", function (event) {
  let clickX = event.offsetX;
  let clickY = event.offsetY;

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
});

canvas.addEventListener("click", function handleClick(event) {
  const clickX = event.offsetX;
  const clickY = event.offsetY;

  // Gestion des clics pour le menu principal
  if (gameState === "titleScreen") {
    buttons.forEach(button => {
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
    pauseButtons.forEach(button => {
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
    buttons.forEach(button => {
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
