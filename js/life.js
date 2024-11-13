// Chargement de l'image du sprite avec 5 états
let spriteSheet = new Image();
spriteSheet.src = 'images/Hearts/animated/border/hearts_animated_2.png';

// Largeur et hauteur d'un état dans le sprite sheet
let spriteWidth, spriteHeight;
spriteSheet.onload = function() {
    spriteWidth = spriteSheet.width / 5; // Diviser par 5 pour obtenir la largeur d'un état
    spriteHeight = spriteSheet.height;
};

// Variables pour l'animation
let currentState = 0; // État actuel du sprite
let animationStarted = false;
let animationCompleted = false;


let imagesAnimated = [false, false, false]; // Initialisé pour 3 images
let currentImageIndex = 2; // On commence par l'image la plus à droite

// Fonction pour démarrer l'animation
function startLifeAnimation() {
    if (animationStarted || imagesAnimated[currentImageIndex]) return; // Ne rien faire si déjà animé

    animationStarted = true;
    animationCompleted = false;
    currentState = 0;

    imagesAnimated[currentImageIndex] = true; // Marquer l'image comme animée

    let animationInterval = setInterval(() => {
        if (currentState < 4) {
            currentState++;
        } else {
            clearInterval(animationInterval);
            animationCompleted = true;
            animationStarted = false;

            // Passer à l'image suivante vers la gauche
            currentImageIndex = imagesAnimated.lastIndexOf(false);
        }
    }, 100);
}

// Fonction pour dessiner un état spécifique du sprite
function drawLife(xPos, yPos, state = 0) {
    if (spriteWidth && spriteHeight) {
        let sourceX = state * spriteWidth;
        ctx.drawImage(
            spriteSheet,
            sourceX, 0, 
            spriteWidth, spriteHeight,
            xPos, yPos, 
            spriteWidth, spriteHeight
        );
    }
}
