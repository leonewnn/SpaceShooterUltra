// Create the canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
canvas.style.border = "1px solid black"; // Ajoute une fine ligne noire autour
document.body.appendChild(canvas);

//GameState
let gameState = 'titleScreen';




// Background image
let bgReady = false;
let titleScreenBackground = new Image();
titleScreenBackground.onload = function () {
	bgReady = true;
};
titleScreenBackground.src = 'images/StartScreen.png';


//Play btn obj
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

//Play btn obj
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
let meteors = [];

for (let i = 1; i <= 10; i++) {
    let img = new Image();
    img.src = `images/meteors/Meteor_${i.toString().padStart(2, '0')}.png`; // Chemin dynamique
    meteors.push(img);
}

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

// Fonction de rendu de l'écran d'accueil
function renderTitleScreen() {
   if(bgReady){
   
    ctx.drawImage(titleScreenBackground,0,0, canvas.width,canvas.height);
    

    startMeteorSpawning(); 

    drawMeteors();
    ctx.fillStyle = "white";
    ctx.font = "40px 'SpaceMan'";
    ctx.textAlign = "center"; 
    ctx.fillText("Space Shooter",canvas.width/2,100);

    ctx.fillStyle = "#c08dd3";
    ctx.fillText("ultra",canvas.width/2,150);
    buttonPlay.x = (canvas.width - buttonPlay.width) / 2; 
    buttonScoreBoard.x = (canvas.width - buttonScoreBoard.width) / 2;//To get btn in the center

    
   
    
    

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

//Metorites stuff 
let meteorites = [];
let meteorSpawnInterval;
let meteorSpawnFrequency = 1500;

function startMeteorSpawning() {
    // Si un intervalle existe déjà, ne pas en créer un nouveau
    if (!meteorSpawnInterval) {
        meteorSpawnInterval = setInterval(spawnMeteor, meteorSpawnFrequency); // 2000 ms = 2 secondes
    }
}

// Fonction pour arrêter le spawn de météorites
function stopMeteorSpawning() {
    if (meteorSpawnInterval) {
        clearInterval(meteorSpawnInterval);
        meteorSpawnInterval = null; // Réinitialiser l'identifiant
    }
}

function spawnMeteor() {
    // Position initiale aléatoire en haut de l'écran (hors du canvas)
    let randomMeteorImage = meteors[Math.floor(Math.random() * meteors.length)];

    // Position initiale aléatoire en haut de l'écran (hors du canvas)
    let meteor = {
        x: Math.random() * canvas.width,
        y: -50, // Au-dessus de l'écran
        img: randomMeteorImage // Utiliser l'image aléatoire
    };
    meteorites.push(meteor);
}

function drawMeteors() {
    for (let i = 0; i < meteorites.length; i++) {
        let meteor = meteorites[i];
        ctx.drawImage(meteor.img, meteor.x, meteor.y, 100,100);
        meteor.y += 2; // Déplacer la météorite vers le bas

        // Retirer la météorite du tableau si elle dépasse le bas de l'écran
        if (meteor.y > canvas.height) {
            meteorites.splice(i, 1);
            i--; // Ajuster l'index après suppression
        }
    }
}









// Fonction principale de rendu
function render() {
    if (gameState === 'titleScreen') {
        renderTitleScreen();
    }
    // Ajoute ici d'autres rendus pour les autres états si nécessaire
}




// Boucle de jeu principale
function main() {
    render(); // Appeler la fonction de rendu en fonction de l'état du jeu
    requestAnimationFrame(main); // Continuer la boucle
}

// Démarrer la boucle de rendu
main();
