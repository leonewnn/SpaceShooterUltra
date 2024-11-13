let impacts = [];
for (let i = 0; i <= 6; i++) {
    let img = new Image();
    img.src = `images/collisions/impact_${i.toString()}.png`;
    impacts.push(img);
}

let impactAnimations = []; // Tableau pour stocker les animations d'impact actives
let frameDelay = 3; // Ajustement du délai pour une animation plus fluide

function impactAnimation(x, y) {
    impactAnimations.push({ x, y, impactFrames: 0, delayCounter: 0 });
}

function drawImpacts() {
    for (let i = impactAnimations.length - 1; i >= 0; i--) {
        let anim = impactAnimations[i];
        let frameIndex = Math.floor(anim.impactFrames / frameDelay) % impacts.length;
        let frame = impacts[frameIndex];

        // Dessiner l'impact à la position (x, y)
        ctx.drawImage(frame, anim.x - frame.width / 2, anim.y - frame.height / 2);

        anim.delayCounter++;

        // Passer à l'image suivante après le délai
        if (anim.delayCounter >= frameDelay) {
            anim.impactFrames++;
            anim.delayCounter = 0;
        }

        // Supprimer l'animation une fois terminée
        if (anim.impactFrames >= impacts.length * frameDelay) {
            impactAnimations.splice(i, 1);
        }
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
                impactAnimation(missile.x, missile.y);
                missiles.splice(i, 1);
                meteorites.splice(j, 1);
                break;
            }
        }
    }
}

// Appeler drawImpacts() dans la boucle principale de dessin pour afficher les impacts actifs
