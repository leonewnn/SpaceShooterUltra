// Chargement de l'image du sprite avec 5 états
let spriteSheet = new Image();
spriteSheet.src = 'images/Hearts/animated/border/hearts_animated_2.png';

let animationsCompleted = 0; //Compteur d'animations terminées

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
    if (animationStarted || imagesAnimated[currentImageIndex]) return;

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
            animationsCompleted++; // Incrémente le compteur d'animations terminées

            // Passer à l'image suivante vers la gauche
            currentImageIndex = imagesAnimated.lastIndexOf(false);

            // Vérifier si toutes les animations sont terminées
            checkGameOver();
        }
    }, 100);
}

// Vérifie si toutes les animations sont terminées
function checkGameOver() {
    if (animationsCompleted >= imagesAnimated.length) {
        gameOver = true;

        // Stocker le score actuel et indiquer que le score n'est pas encore soumis
        localStorage.setItem("playerScore", playerScore);
        localStorage.setItem("scoreSubmitted", "false");

        setTimeout(() => {
            window.location.href = "scoreboard.html"; // Rediriger vers la page scoreboard
        }, 3000);
    }
}

// Fonction pour sauvegarder le score dans localStorage (dans scoreboard.html)
function saveHighScore(name, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ name, score });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10); // Garde uniquement les 10 meilleurs scores
    localStorage.setItem("highScores", JSON.stringify(highScores));
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
