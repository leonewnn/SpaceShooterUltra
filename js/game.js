// Set default rocket if none selected
if (!localStorage.getItem("selectedRocket")) {
  localStorage.setItem("selectedRocket", "default");
}

// game.js
let gameState = "titleScreen";
let gameOver = false; // Indique si le joueur a perdu
let lastTime = performance.now(); // Temps de la dernière frame
let bonusActive = false; // Indique si le power-up bonus est actif
let bonusOffset = 100; // Décalage des tirs bonus en millisecondes
window.ctx = canvas.getContext("2d"); // Déclare `ctx` comme variable globale

let lastFireTime = 0; // Temps du dernier tir

function render(delta) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameState === "titleScreen") {
    renderTitleScreen(delta);
  } else if (gameState === "playScreen") {
    //   console.log("Score actuel :", playerScore);
    drawSpaceParticles(delta);
    updateDifficulty(playerScore);
    renderPlayScreen(delta);
    updateScreenShake();
    drawSpaceParticles(delta);

    if (screenShake.duration <= 0) {
      ctx.restore();
    }
  }
}

function renderGameOver() {
  // Dessiner le fond d'écran du jeu (comme dans renderPlayScreen)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(playScreenBackground, 0, 0, canvas.width, canvas.height);

  // Afficher le message "Game Over" au centre
  ctx.font = "48px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

function handleShooting(currentTime) {
  if (currentTime - lastFireTime >= gameDifficulty.current.fireRate) {
    // Tir normal
    addMissile(15, 51, 5);

    // Tir bonus avec décalage si actif
    if (bonusActive) {
      setTimeout(() => {
        addMissile(-1, 65, -15); // Tirs bonus avec ajustements
      }, bonusOffset);
    }

    lastFireTime = currentTime;
  }
}

// Fonction pour démarrer la musique du menu
function startMenuMusic() {
  if (gameState === "titleScreen" && !isPaused) {
    isMusicStarted = true; // Empêche les relances multiples
    menuMusic.volume = isMuted ? 0 : gameVolume; // Applique le volume global
    menuMusic
      .play()
      .then(() => {
        console.log("Musique du menu démarrée !");
      })
      .catch((error) => {
        console.error("Impossible de démarrer la musique du menu :", error);
      });
  }
}

// Détection de l'interaction utilisateur
window.addEventListener("mousemove", startMenuMusic);
window.addEventListener("mousedown", startMenuMusic);
window.addEventListener("keydown", startMenuMusic);

// Fonction pour mettre à jour la position du vaisseau avec delta
function updateSpaceshipPosition(delta) {
  if (leftPressed) {
    spaceshipPos -= spaceshipSpeed * delta;
    if (spaceshipPos < 0) spaceshipPos = 0; // Limite à gauche
  }
  if (rightPressed) {
    spaceshipPos += spaceshipSpeed * delta;
    if (spaceshipPos > canvas.width - 75) spaceshipPos = canvas.width - 75; // Limite à droite
  }
  if (upPressed) {
    spaceshipY -= spaceshipSpeed * delta;
    if (spaceshipY < 0) spaceshipY = 0; // Limite en haut
  }
  if (downPressed) {
    spaceshipY += spaceshipSpeed * delta;
    if (spaceshipY > canvas.height - 90) spaceshipY = canvas.height - 90; // Limite en bas
  }
}

// Fonction principale avec delta
function main(currentTime) {
  if (gameOver) {
    stopMusic(); // Arrête la musique en cas de Game Over
    renderGameOver(); // Affiche "Game Over" si le jeu est terminé
    return;
  }

  // Gestion de la musique dans le menu principal
  if (gameState === "titleScreen" && !isPaused) {
    if (currentMusic) {
      stopMusic(); // Arrête la musique de la phase
    }
    if (menuMusic.paused && isMenuMusicAllowed) {
      menuMusic.volume = isMuted ? 0 : gameVolume;
      menuMusic.play(); // Relance la musique du menu si nécessaire
    }
  } else {
    if (!menuMusic.paused) {
      menuMusic.pause(); // Met la musique du menu en pause
      menuMusic.currentTime = 0; // Réinitialise la musique
    }
  }

  // Gestion de la musique pendant le jeu
  if (gameState === "playScreen" && !isGameMusicAllowed) {
    isGameMusicAllowed = true; // Active la musique pour le jeu
    playMusicForPhase(gameDifficulty.level - 1); // Joue la musique de la phase actuelle
  }

  if (isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface l'écran
    renderPlayScreen(); // Affiche l'écran du jeu en arrière-plan
    renderPauseMenu(ctx); // Dessine le menu de pause
    lastTime = currentTime; // Réinitialise lastTime pour ignorer le temps en pause

    // Mettre en pause la musique in-game
    if (currentMusic && !currentMusic.paused) {
      pauseCurrentMusic();
    }

    // Empêcher la musique du menu de se lancer
    if (!menuMusic.paused) {
      menuMusic.pause();
      menuMusic.currentTime = 0;
    }

    return; // Empêche les autres mises à jour
  } else {
    // Reprendre la musique in-game si elle était en pause
    if (currentMusic && currentMusic.paused) {
      resumeCurrentMusic();
    }
  }

  // Ajuste delta pour ignorer le temps passé en pause
  const delta = (currentTime - lastTime) / 1000; // Convertir le delta en secondes
  lastTime = currentTime;

  // Met à jour les éléments du jeu ici
  updateSpaceshipPosition(delta);
  updateScreenShake(); // Met à jour les effets de secousse d'écran
  render(delta);
  handleSpaceShipCollisions();
  handleShooting(currentTime); // Gérer les tirs

  requestAnimationFrame(main); // Boucle la fonction
}

// Démarrer la boucle de jeu
requestAnimationFrame(main);