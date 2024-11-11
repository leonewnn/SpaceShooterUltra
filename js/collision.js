let impacts = [];
for (let i = 0; i <= 6; i++) {
    let img = new Image();
    img.src = `images/collisions/impact_${i.toString()}.png`;
    impacts.push(img);
}

let impactFrames = 0; // Variable pour suivre l'animation de l'impact
let frameDelay = 180; // Délai de 3 secondes (3 * 60 frames)
let delayCounter = 0; // Compteur pour gérer le délai

function impactAnimation(x, y) {
    let impactDuration = impacts.length * frameDelay; // Durée totale de l'animation
    let frame = impacts[Math.floor(impactFrames / frameDelay) % impacts.length]; // Choisir l'image de l'impact

    // Dessiner l'impact à la position (x, y)
    ctx.drawImage(frame, (x - frame.width / 2)-125, (y - frame.height / 2)-100);

    delayCounter++;

    // Passer à l'image suivante après le délai
    if (delayCounter >= frameDelay) {
        impactFrames++;
        delayCounter = 0; // Réinitialiser le compteur de délai
    }

    // Réinitialiser l'animation après la durée définie
    if (impactFrames >= impactDuration) {
        impactFrames = 0; // Réinitialiser l'animation
    }
}




function checkCollision(missile, meteor) {
    return (
        missile.x < meteor.x + 100 &&
        missile.x + missile.img.width > meteor.x &&
        missile.y < meteor.y + 100 &&
        missile.y + missile.img.height > meteor.y
    );
}


function handleCollisions() {
    for (let i = missiles.length - 1; i >= 0; i--) {
        let missile = missiles[i];
        
        for (let j = meteorites.length - 1; j >= 0; j--) {
            let meteor = meteorites[j];
            
            if (checkCollision(missile, meteor)) {
                impactAnimation(missile.x,missile.y);
                missiles.splice(i, 1);
                meteorites.splice(j, 1);
                break;
            }
        }
    }
}