let psBgReady = false;
let spaceshipPos = canvas.width + 600;
let playScreenBackground = new Image();
playScreenBackground.onload = function () {
  psBgReady = true;
};
playScreenBackground.src = "images/StartScreen.png";

function renderPlayScreen(delta) {
  if (psBgReady) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playScreenBackground, 0, 0, canvas.width, canvas.height);

    startPowerupSpawning();
    drawPowerups(delta);
    drawMeteors(delta);
    drawSpaceShip(spaceshipPos);
    drawMissile(delta);

    handleCollisions();
    handleCollisionsPowerUp();

    // Draw game elements
    drawLife(
      10,
      10,
      imagesAnimated[0]
        ? 4
        : currentImageIndex === 0 && animationStarted
        ? currentState
        : 0
    ); // Vie 1
    drawLife(
      50,
      10,
      imagesAnimated[1]
        ? 4
        : currentImageIndex === 1 && animationStarted
        ? currentState
        : 0
    ); // Vie 2
    drawLife(
      90,
      10,
      imagesAnimated[2]
        ? 4
        : currentImageIndex === 2 && animationStarted
        ? currentState
        : 0
    ); // Vie 3

    drawScore();
    drawIndicator();

    // Add phase transition drawing
    drawPhaseTransition();

    if (!scoreInterval) startScoreIncrement();
  }
}
