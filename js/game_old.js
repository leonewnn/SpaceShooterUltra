// Initialisation de la canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
canvas.style.border = "1px solid black"; // Ajoute une fine ligne noire autour
document.body.appendChild(canvas);

// État du jeu
let gameState = 'titleScreen';

// Image de fond pour l'écran de titre
let bgReady = false;
let titleScreenBackground = new Image();
titleScreenBackground.onload = function () {
    bgReady = true;
};
titleScreenBackground.src = 'images/StartScreen.png';

// Boutons
let buttonPlay = {
    width: 200,
    y: 250,
    height: 60,
    color: "#27a448",
    radius: 20,
    label: "PLAY",
    onClick: function() {
        console.log("Click playbtn");
    }
};

let buttonScoreBoard = {
    width: 300,
    y: 350,
    height: 60,
    radius: 20,
    color: '#f68d14',
    label: "SCOREBOARD",
    onClick: function() {
        console.log("Click scoreboardptn");
    }
};

let buttons = [buttonPlay, buttonScoreBoard];

// Écouteur d'événements pour les clics sur la canvas
canvas.addEventListener('click', function(event) {
    let clickX = event.offsetX;
    let clickY = event.offsetY;

    // Vérifier chaque bouton dans le tableau
    buttons.forEach(button => {
        if (
            clickX >= button.x &&
            clickX <= button.x + button.width &&
            clickY >= button.y &&
            clickY <= button.y + button.height
        ) {
            button.onClick(); // Appeler la fonction `onClick` du bouton si cliqué
        }
    });
});

// Images des météorites
let meteors = [];
for (let i = 1; i <= 10; i++) {
    let img = new Image();
    img.src = `images/meteors/Meteor_${i.toString().padStart(2, '0')}.png`; // Chemin dynamique
    meteors.push(img);
}

// Variables et fonctions pour les météorites
let meteorites = [];
let meteorSpawnInterval;
let meteorSpawnFrequency = 1500;

function startMeteorSpawning() {
    if (!meteorSpawnInterval) {
        meteorSpawnInterval = setInterval(spawnMeteor, meteorSpawnFrequency); // 1500 ms = 1.5 seconde
    }
}

function stopMeteorSpawning() {
    if (meteorSpawnInterval) {
        clearInterval(meteorSpawnInterval);
        meteorSpawnInterval = null; // Réinitialiser l'identifiant
    }
}

function spawnMeteor() {
    let randomMeteorImage = meteors[Math.floor(Math.random() * meteors.length)];
    let meteor = {
        x: Math.random() * canvas.width,
        y: -50, // Au-dessus de l'écran
        img: randomMeteorImage
    };
    meteorites.push(meteor);
}

function drawMeteors() {
    for (let i = 0; i < meteorites.length; i++) {
        let meteor = meteorites[i];
        ctx.drawImage(meteor.img, meteor.x, meteor.y, 100, 100);
        meteor.y += 2; // Déplacer la météorite vers le bas

        if (meteor.y > canvas.height) {
            meteorites.splice(i, 1);
            i--; // Ajuster l'index après suppression
        }
    }
}

// Fonctions de dessin et de rendu
function renderTitleScreen() {
    if (bgReady) {
        ctx.drawImage(titleScreenBackground, 0, 0, canvas.width, canvas.height);
        startMeteorSpawning();
        drawMeteors();

        ctx.fillStyle = "white";
        ctx.font = "40px 'SpaceMan'";
        ctx.textAlign = "center";
        ctx.fillText("Space Shooter", canvas.width / 2, 100);

        ctx.fillStyle = "#c08dd3";
        ctx.fillText("ultra", canvas.width / 2, 150);

        buttonPlay.x = (canvas.width - buttonPlay.width) / 2;
        buttonScoreBoard.x = (canvas.width - buttonScoreBoard.width) / 2;

        drawBoutton(buttonPlay);
        drawBoutton(buttonScoreBoard);
    }
}

function drawBoutton(btn) {
    ctx.beginPath();
    ctx.roundRect(btn.x, btn.y, btn.width, btn.height, btn.radius);
    ctx.fillStyle = btn.color;
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "24px 'SpaceMan'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(btn.label, btn.x + btn.width / 2, btn.y + btn.height / 2);
}

// Fonction principale de rendu
function render() {
    if (gameState === 'titleScreen') {
        renderTitleScreen();
    }
}

// Boucle de jeu principale
function main() {
    render(); // Appeler la fonction de rendu en fonction de l'état du jeu
    requestAnimationFrame(main); // Continuer la boucle
}

// Démarrer la boucle de rendu
main();
