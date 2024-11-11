let psBgReady = false;
let spaceshipPos = canvas.width/2;
let playScreenBackground = new Image();
playScreenBackground.onload = function () {
    psBgReady = true;
};
playScreenBackground.src = 'images/StartScreen.png';

function renderPlayScreen() {
    if (psBgReady) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface l'écran
        ctx.drawImage(playScreenBackground, 0, 0, canvas.width, canvas.height);
        startMeteorSpawning();
        drawMeteors();
        
        drawSpaceShip(spaceshipPos); // Appelle l'animation du vaisseau
        drawMissile(); // Dessine les missiles
      //  logMissile();
        handleCollisions(); //

    }
}


