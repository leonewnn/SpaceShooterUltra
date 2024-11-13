// game.js
let gameState = 'titleScreen';
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
    let delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    updateSpaceshipPosition(delta);
    render();
    
    requestAnimationFrame(main);
    drawImpacts();
}

// Démarrer la boucle de jeu
requestAnimationFrame(main);
