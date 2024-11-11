// controls.js
let leftPressed = false;
let rightPressed = false;
let spacePressed = false;
let spaceshipSpeed = 500; // Vitesse en pixels par seconde

function setupControls() {
    // Détecte les pressions sur les touches
    window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            leftPressed = true;
        } else if (event.key === "ArrowRight") {
            rightPressed = true;
        }

        if(event.key === " "){
            spacePressed = true;
            console.log('Space bar pressed');
        }
    });

    // Détecte les relâchements des touches
    window.addEventListener("keyup", (event) => {
        if (event.key === "ArrowLeft") {
            leftPressed = false;
        } else if (event.key === "ArrowRight") {
            rightPressed = false;
        }
        if(event.key === " "){
            spacePressed = false;
        }    

    });
}

setupControls();
