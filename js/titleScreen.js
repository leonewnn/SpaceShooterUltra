// titleScreen.js
let bgReady = false;
let titleScreenBackground = new Image();
titleScreenBackground.onload = function () {
  bgReady = true;
};
titleScreenBackground.src = "images/StartScreen.png";

function renderTitleScreen(delta) {
  if (bgReady) {
    ctx.drawImage(titleScreenBackground, 0, 0, canvas.width, canvas.height);
    startMeteorSpawning();
    drawMeteors(delta);
    ctx.fillStyle = "white";
    ctx.font = "50px 'SpaceMan'";
    ctx.textAlign = "center";
    ctx.fillText("Space Shooter", canvas.width / 2, 100);
    ctx.fillStyle = "#c08dd3";
    ctx.fillText("ultra", canvas.width / 2, 150);
    renderButtons();
  }
}
