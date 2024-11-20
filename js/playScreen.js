let psBgReady = false;
let spaceshipPos = canvas.width / 2;
let playScreenBackground = new Image();
playScreenBackground.onload = function () {
  psBgReady = true;
};
playScreenBackground.src = "images/StartScreen.png";

function renderPlayScreen(delta) {
  if (psBgReady) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playScreenBackground, 0, 0, canvas.width, canvas.height);

    drawPowerups(delta);
    drawMeteors(delta); // Appel de drawMeteors avec delta
    drawSpaceShip(spaceshipPos);
    drawMissile(delta); // Ajouter delta à l'appel de drawMissile
    startPowerupSpawning();
    handleCollisions();
    handleCollisionsPowerUp();

    drawScore();
    drawIndicator();
    if (!meteorSpawnInterval) startMeteorSpawning();
    if (!scoreInterval) startScoreIncrement();
  }
}
