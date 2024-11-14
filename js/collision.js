let impacts = [];
for (let i = 0; i <= 6; i++) {
    let img = new Image();
    img.src = `images/collisions/impact_${i.toString()}.png`;
    impacts.push(img);
}



function impactAnimation(x, y) {
    for(let i = 0; i<impacts.length; i++){
        let impact = impacts[i];
        ctx.drawImage(impact,x,y);
       
    }
}



function checkCollision(missile, meteor) {
    return (
        missile.x < meteor.x + meteor.size &&
        missile.x + missile.img.width > meteor.x &&
        missile.y < meteor.y + meteor.size &&
        missile.y + missile.img.height > meteor.y
    );
}

function checkPowerupGrabbed(spaceshipPos, powerup) {
    const spaceshipX = spaceshipPos;
    const spaceshipY = canvas.height - 90; // Position Y fixe du vaisseau

    return (
        spaceshipX < powerup.x + powerup.size &&
        spaceshipX + 75 > powerup.x &&
        spaceshipY < powerup.y + powerup.size &&
        spaceshipY + 75 > powerup.y
    );
}

function handleCollisionsPowerUp() {
    for (let i = powerupItems.length - 1; i >= 0; i--) {
        let poweruip = powerupItems[i];
        
        // Vérifiez si le power-up est attrapé
        if (checkPowerupGrabbed(spaceshipPos, poweruip)) {
            activePowerup(poweruip);
            
            // Retirer le power-up de la liste
            powerupItems.splice(i, 1);

        }
    }
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