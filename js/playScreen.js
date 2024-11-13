let psBgReady = false;
let spaceshipPos = canvas.width/2;
let playScreenBackground = new Image();
playScreenBackground.onload = function () {
    psBgReady = true;
};
playScreenBackground.src = 'images/StartScreen.png';

function renderPlayScreen() {
    if (psBgReady) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(playScreenBackground, 0, 0, canvas.width, canvas.height);
        startMeteorSpawning();
        drawMeteors();

        drawSpaceShip(spaceshipPos);
        drawMissile();
        handleCollisions();
        handleSpaceShipCollisions();

        // Dessiner les images de vie en fonction de leur état
        for (let i = 0; i < imagesAnimated.length; i++) {
            let stateToDraw = (i === currentImageIndex && animationStarted && !animationCompleted) ? currentState :
                              (imagesAnimated[i] ? 4 : 0); // 4 pour image animée, 0 pour non animée
            drawLife(10 + i * 40, 10, stateToDraw); // Espacement horizontal de 40 pixels entre chaque image
        }
    }
}
