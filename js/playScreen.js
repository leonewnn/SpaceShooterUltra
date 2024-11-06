


let psBgReady = false;
let playScreenBackground = new Image();
playScreenBackground.onload = function () {
    psBgReady = true;
};
playScreenBackground.src = 'images/StartScreen.png';

function renderPlayScreen() {
    if(psBgReady){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface l'écran
    ctx.drawImage(playScreenBackground, 0, 0, canvas.width, canvas.height);
    
    drawSpaceShip(50); // Appelle l'animation du vaisseau
    }
}
