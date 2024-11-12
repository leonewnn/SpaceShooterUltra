let impacts = [];
for (let i = 0; i <= 6; i++) {
    let img = new Image();
    img.src = `images/collisions/impact_${i.toString()}.png`;
    impacts.push(img);
}

let impactFrameIndex = 0;
let frameDelay = 30; // Augmente ce nombre pour ralentir l'animation
let frameCounter = 0;

function impactAnimation(x, y) {
    for(let i = 0; i<impacts.length; i++){
        let impact = impacts[i];
        ctx.drawImage(impact,x,y);
       
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