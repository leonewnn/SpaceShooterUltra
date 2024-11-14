// game.js
let gameState = 'titleScreen';
let gameOver = false;
let lastTime = 0;
let fireRate = 600; // Temps de la dernière frame
window.ctx = canvas.getContext('2d'); // Déclare `ctx` comme variable globale


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'titleScreen') {
        renderTitleScreen();
    } else if (gameState === 'playScreen') {
        renderPlayScreen(); 
    }
}

//Affiche Game Over dès que le joueur a perdu
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

// Fonction pour mettre à jour la position du vaisseau avec delta
function updateSpaceshipPosition(delta) {
    if (leftPressed) {
        spaceshipPos -= spaceshipSpeed * delta;
    }
    if (rightPressed) {
        spaceshipPos += spaceshipSpeed * delta;
    }
}

setInterval(addMissile, fireRate);

// Fonction principale avec delta
function main(currentTime) {
    if (gameOver) {
        renderGameOver(); // Affiche "Game Over" si le jeu est terminé
        return; // Arrête la boucle de jeu
    }

    let delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    updateSpaceshipPosition(delta);
    render();

    handleSpaceShipCollisions();
    
    requestAnimationFrame(main);
    drawImpacts();
}

// Démarrer la boucle de jeu
requestAnimationFrame(main);
