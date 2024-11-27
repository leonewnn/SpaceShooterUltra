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
  if (event.key === "e") {
    isPaused = !isPaused; // Bascule entre pause et reprise
    console.log(isPaused ? "Jeu en pause" : "Jeu repris");

    if (isPaused) {
      pauseMeteorSpawning(); // Arrête les météorites
      stopScoreIncrement(); // Arrête le score
    } else {
      resumeMeteorSpawning(); // Reprend les météorites
      startScoreIncrement(); // Reprend le score
    }
  }
});

setupControls();
