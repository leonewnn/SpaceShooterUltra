// powerups.js
let powerups = [];
let powerupItems = [];
let powerupSpawnInterval;
let powerupSpawnFrequency = 5000; // Fréquence de spawn des power-ups en millisecondes
let powerupSpeed = 100; 
let powerupspawnproccessing = true;
let minmalSpawnInterval = 15000;
let timespanspawntime = 15000;

// Charger les images des power-ups
powerups[0] = new Image();
powerups[0].src = `images/powerups/armor_up.png`;

powerups[1] = new Image();
powerups[1].src = `images/powerups/hp_up.png`;

powerups[2] = new Image();
powerups[2].src = `images/powerups/nuke_up.png`;

powerups[3] = new Image();
powerups[3].src = `images/powerups/fire_rate_up.png`;

// Démarrer le spawn des power-ups
function startPowerupSpawning() {
    if(powerupspawnproccessing){
        nextPowerUpSpawn();
    }    
}

function nextPowerUpSpawn(){
    powerupspawnproccessing = false;
    
    // Attendre un intervalle aléatoire, puis spawn le power-up
    let nextMoment = Math.floor(Math.random() * timespanspawntime ) + minmalSpawnInterval;
    setTimeout(() => {
        spawnPowerup(); // Appel de la fonction pour faire apparaître un power-up
        powerupspawnproccessing = true; // Réactiver le spawn pour le prochain
        nextPowerUpSpawn(); // Rappeler la fonction pour continuer le spawn
    }, nextMoment);
}

// Fonction pour faire apparaître un power-up
function spawnPowerup() {
    let randomPowerupImage = powerups[Math.floor(Math.random() * powerups.length)];
    let xPosition = Math.random() * (canvas.width - 50); // Ajuste pour garder le power-up dans les limites

    let powerup = {
        x: xPosition,
        y: -50, // Spawn au-dessus de l'écran
        size: 50, // Taille fixe du power-up
        img: randomPowerupImage
    };
    powerupItems.push(powerup);
}

// Fonction pour dessiner et déplacer les power-ups
function drawPowerups(delta) {
    for (let i = 0; i < powerupItems.length; i++) {
        let powerup = powerupItems[i];
        ctx.drawImage(powerup.img, powerup.x, powerup.y, powerup.size, powerup.size);
        powerup.y += powerupSpeed * delta; // Déplacer le power-up vers le bas

        if (powerup.y > canvas.height) {
            powerupItems.splice(i, 1); // Supprimer le power-up lorsqu'il sort de l'écran
            i--;
        }
    }
}
