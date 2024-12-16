// controls.js
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;
let spaceshipSpeed = 700; // Vitesse en pixels par seconde

function setupControls() {
  // Détecte les pressions sur les touches
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      leftPressed = true;
    } else if (event.key === "ArrowRight") {
      rightPressed = true;
    } else if (event.key === "ArrowUp") {
      upPressed = true;
    } else if (event.key === "ArrowDown") {
      downPressed = true;
    }

    if (event.key === " ") {
      spacePressed = true;
      console.log("Space bar pressed");
    }
  });

  // Détecte les relâchements des touches
  window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
      leftPressed = false;
    } else if (event.key === "ArrowRight") {
      rightPressed = false;
    } else if (event.key === "ArrowUp") {
      upPressed = false;
    } else if (event.key === "ArrowDown") {
      downPressed = false;
    }
    if (event.key === " ") {
      spacePressed = false;
    }
  });
}

window.addEventListener("keydown", (event) => {
  console.log("Touche appuyée :", event.key); // Vérifie si les événements sont détectés
  if (event.key === "e") {
    console.log("Pause/Resume togglé !");
    isPaused = !isPaused;

    if (isPaused) {
      pauseGame();
    } else {
      resumeGame();
    }
  }
});

setupControls();
