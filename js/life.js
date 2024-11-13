// Chargement de l'image du sprite avec 5 états
let spriteSheet = new Image();
spriteSheet.src = 'images/Hearts/animated/border/hearts_animated_2.png';

// Largeur et hauteur d'un état dans le sprite sheet
let spriteWidth = spriteSheet.width / 5; // Diviser par 5 pour obtenir la largeur d'un état
let spriteHeight = spriteSheet.height; // Hauteur du sprite

// Variables pour l'animation
let currentState = 0; // État actuel du sprite
let animationStarted = false; // Démarrage de l'animation
let animationCompleted = false; // Indicateur pour vérifier si l'animation est terminée

// Fonction pour dessiner un état spécifique du sprite
function drawLife(xPos, yPos, state = 0) {
    let sourceX = state * spriteWidth; // Décale selon l'état souhaité
    ctx.drawImage(
        spriteSheet,
        sourceX, 0, // Coordonnées x, y de la découpe dans le sprite sheet
        spriteWidth, spriteHeight, // Taille de la découpe (un état)
        xPos, yPos, // Coordonnées de destination, incluant la nouvelle position y
        spriteWidth, spriteHeight // Taille de l'image affichée
    );
}

// Lancer l'animation après 5 secondes
setTimeout(() => {
    animationStarted = true;
    let animationInterval = setInterval(() => {
        if (currentState < 4) {
            currentState++; // Passer à l'état suivant
        } else {
            clearInterval(animationInterval); // Arrêter l'animation à la fin
            animationCompleted = true; // Marquer l'animation comme terminée
        }
    }, 100); // Change d'état toutes les 100 ms
}, 5000); // Délai de 5 secondes