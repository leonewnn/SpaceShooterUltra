// spaceship.js
let spaceships = []; // Tableau pour stocker les images du vaisseau
let currentFrame = 0; // Indice de l'image actuelle
let frameInterval = 8; // Intervalle pour ralentir l'animation
let frameCount = 0; // Compteur pour contrôler la vitesse de changement d'image

// Charger les images du vaisseau
for (let i = 0; i <= 6; i++) {
    let img = new Image();
    img.src = `images/spaceship/spaceship_${i.toString()}.png`;
    spaceships.push(img);
}

// Fonction pour dessiner le vaisseau avec animation
function drawSpaceShip(pos) {
    let spaceship = spaceships[currentFrame]; // Image actuelle du vaisseau
    ctx.drawImage(spaceship, pos , 400,50,50); // Dessine l'image sur le canvas aux coordonnées spécifiées

    // Incrémente le compteur pour contrôler la vitesse de l'animation
    frameCount++;
    if (frameCount >= frameInterval) {
        // Passe à l'image suivante et réinitialise le compteur
        currentFrame = currentFrame + 1;

        currentFrame = (currentFrame + 1) % 7;

        frameCount = 0;
    }
}
