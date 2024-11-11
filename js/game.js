// game.js
let gameState = 'titleScreen';
let lastTime = 0;
let fireRate = 600; // Temps de la dernière frame

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
        spaceshipPos -= spaceshipSpeed * delta; // Utilise delta pour ajuster la vitesse
    }
    if (rightPressed) {
        spaceshipPos += spaceshipSpeed * delta;
    }
}

setInterval(addMissile, fireRate); // 1000 ms = 1 seconde

// Fonction principale avec delta
function main(currentTime) {
    let delta = (currentTime - lastTime) / 1000; // Convertir le delta en secondes
    lastTime = currentTime;

    // Appeler les fonctions de mise à jour et de rendu
    updateSpaceshipPosition(delta); 

    render();
    
    requestAnimationFrame(main);
}

// Démarrer la boucle de jeu
requestAnimationFrame(main);
