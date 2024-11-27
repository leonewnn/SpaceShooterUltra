// meteors.js
let meteors = [];

let meteorites = [];
let meteorSpawnInterval;
let meteorLife = 4;
let meteorSpawnFrequency = 1000;
let multiplier = 1;
let meteorSpeed = 150;
let isMeteorSpawning = false;

for (let i = 1; i <= 10; i++) {
  let img = new Image();
  img.src = `images/meteors/Meteor_${i.toString().padStart(2, "0")}.png`;
  meteors.push(img);
}

function startMeteorSpawning() {
  if (!meteorSpawnInterval && !isMeteorSpawning) {
    // Vérifie si aucun spawn n'est actif
    console.log("Starting meteor spawning...");
    isMeteorSpawning = true; // Marque le spawn comme actif
    meteorSpawnInterval = setInterval(
      spawnMeteor,
      meteorSpawnFrequency * multiplier
    );
  }
}

function spawnMeteor() {
  let randomMeteorImage = meteors[Math.floor(Math.random() * meteors.length)];
  let inclinaitionTemp = Math.random() - 0.5;
  let sizeTemp = 30 + Math.random() * (130 - 30);
  let xPosition = Math.random() * (canvas.width - sizeTemp);

  let meteor = {
    x: xPosition,
    y: -50,
    life: meteorLife,
    size: sizeTemp * multiplier,
    inclinaition: inclinaitionTemp,
    img: randomMeteorImage,
  };
  meteorites.push(meteor);
}

function drawMeteors(delta) {
  for (let i = 0; i < meteorites.length; i++) {
    let meteor = meteorites[i];

    if (meteor.fadeOut) {
      meteor.opacity = (meteor.opacity || 1) - delta * 2; // Réduit l'opacité
      if (meteor.opacity <= 0) {
        meteorites.splice(i, 1);
        i--;
        continue;
      }
      ctx.globalAlpha = meteor.opacity; // Applique l'opacité
    }

    ctx.drawImage(meteor.img, meteor.x, meteor.y, meteor.size, meteor.size);
    ctx.globalAlpha = 1; // Réinitialise l'opacité

    meteor.y += meteorSpeed * delta;
    meteor.x += meteor.inclinaition;

    if (meteor.y > canvas.height) {
      meteorites.splice(i, 1);
      i--;
    }
  }
}

function resetMeteorSpawning() {
  console.log("Réinitialisation des météorites et du spawn...");

  // Ajoute une animation fade-out avant de les supprimer
  meteorites.forEach((meteor) => {
    meteor.fadeOut = true; // Ajoute un drapeau pour l'effet de disparition
  });

  setTimeout(() => {
    // Supprimer toutes les météorites après un délai
    meteorites.length = 0;

    // Arrêter et relancer le spawn
    pauseMeteorSpawning();
    resumeMeteorSpawning();
  }, 500); // Délai pour permettre l'effet
}

// Fonction pour arrêter temporairement le spawn des météorites
function pauseMeteorSpawning() {
  if (meteorSpawnInterval) {
    console.log("Pausing meteor spawning...");
    clearInterval(meteorSpawnInterval); // Arrête l'intervalle
    meteorSpawnInterval = null;
    isMeteorSpawning = false; // Marque le spawn comme inactif
  }
}

// Fonction pour reprendre le spawn des météorites
function resumeMeteorSpawning() {
  if (!meteorSpawnInterval && !isMeteorSpawning) {
    console.log("Resuming meteor spawning...");
    isMeteorSpawning = true; // Marque le spawn comme actif
    meteorSpawnInterval = setInterval(
      spawnMeteor,
      meteorSpawnFrequency * multiplier
    );
  }
}
