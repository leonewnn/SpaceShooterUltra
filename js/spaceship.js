// spaceship.js
let spaceships = []; // Tableau pour stocker les images du vaisseau
let currentFrame = 0; // Indice de l'image actuelle
let frameInterval = 8; // Intervalle pour ralentir l'animation
let frameCount = 0; // Compteur pour contrôler la vitesse de changement d'image
let missiles = [];
let missileSpeed = 5;

// Charger les images du vaisseau
for (let i = 0; i <= 6; i++) {
    let img = new Image();
    img.src = `images/spaceship/spaceshipresize_${i.toString()}.png`;
    spaceships.push(img);
}

let missileImg = new Image();
missileImg.src = `images/spaceship/missile.png`; // Charger l'image du missile une seule fois

function drawSpaceShip(pos) {
    let spaceship = spaceships[currentFrame]; // Image actuelle du vaisseau
    ctx.drawImage(spaceship, pos, canvas.height -90); // Dessine l'image sur le canvas aux coordonnées spécifiées

    // Incrémente le compteur pour contrôler la vitesse de l'animation
    frameCount++;
    if (frameCount >= frameInterval) {
        currentFrame = (currentFrame + 1) % 7; // Passe à l'image suivante
        frameCount = 0;
    }
}

function addMissile() {
    // Crée le premier missile légèrement décalé à gauche
    let missileLeft = {
        x: spaceshipPos + 13,  // Décalé légèrement vers la gauche du centre du vaisseau
        y: canvas.height - 140,
        img: missileImg
    };

    // Crée le deuxième missile légèrement décalé à droite
    let missileRight = {
        x: spaceshipPos + 53,  // Décalé légèrement vers la droite du centre du vaisseau
        y: canvas.height - 140,
        img: missileImg
    };

    // Ajoute les deux missiles au tableau
    missiles.push(missileLeft, missileRight);
}




function drawMissile() {
    for (let i = 0; i < missiles.length; i++) {
        let missile = missiles[i];
        ctx.drawImage(missile.img, missile.x, missile.y);
        missile.y -= missileSpeed; // Déplace le missile vers le haut

        // Vérifie si le missile est sorti de l'écran
        if (missile.y < -56) {
            missiles.splice(i, 1); // Supprime le missile hors de l'écran
            i--; // Ajuste l'index après la suppression
        }
    }
}
