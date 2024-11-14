let psBgReady = false;
let spaceshipPos = canvas.width / 2;
let playScreenBackground = new Image();
playScreenBackground.onload = function () {
    psBgReady = true;
};
playScreenBackground.src = 'images/StartScreen.png';

function renderPlayScreen(delta) {
    if (psBgReady) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(playScreenBackground, 0, 0, canvas.width, canvas.height);

        // Démarrer les spawns
        startMeteorSpawning();
        startPowerupSpawning();

        // Dessiner les éléments
        drawMeteors(delta);
        drawPowerups(delta);
        drawSpaceShip(spaceshipPos);
        drawMissile(delta);

        // Gérer les collisions
        handleCollisions();
        handleCollisionsPowerUp();
        handleSpaceShipCollisions();

        // Dessiner les indicateurs et le score
        drawIndicator();
        drawScore();

        // Affichage des images de vie
        for (let i = 0; i < imagesAnimated.length; i++) {
            let stateToDraw = (i === currentImageIndex && animationStarted && !animationCompleted) ? currentState :
                              (imagesAnimated[i] ? 4 : 0);
            drawLife(10 + i * 40, 10, stateToDraw);
        }
    }
}