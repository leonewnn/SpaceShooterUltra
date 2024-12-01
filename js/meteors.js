// meteors.js
let meteors = [];

let meteorites = [];
let meteorSpawnInterval;
let meteorLife = gameDifficulty.current.meteorHealth;
let meteorSpawnFrequency = gameDifficulty.current.spawnInterval;
let multiplier = 1;
let meteorSpeed = gameDifficulty.current.meteorSpeed;
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
      gameDifficulty.current.spawnInterval * multiplier
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
    life: gameDifficulty.current.meteorHealth,
    size: sizeTemp * multiplier,
    inclinaition: inclinaitionTemp,
    img: randomMeteorImage,
  };
  meteorites.push(meteor);
}

function drawMeteors(delta) {
  for (let i = 0; i < meteorites.length; i++) {
    let meteor = meteorites[i];

    // Dessine la météorite
    ctx.drawImage(meteor.img, meteor.x, meteor.y, meteor.size, meteor.size);

    // Si le jeu n'est pas en pause, met à jour la position
    if (!isPaused) {
      meteor.y += gameDifficulty.current.meteorSpeed * delta; // Déplacement vertical
      meteor.x += meteor.inclinaition; // Déplacement horizontal

      // Supprimer les météorites qui sortent de l'écran
      if (meteor.y > canvas.height) {
        meteorites.splice(i, 1);
        i--; // Ajuste l'index après suppression
      }
    }
  }
}

function resetMeteorSpawning() {
  // Clear existing meteors with fade effect
  meteorites.forEach((meteor) => {
    meteor.fadeOut = true;
  });

  setTimeout(() => {
    // Clear meteors array
    meteorites.length = 0;

    // Clear existing spawn interval
    if (meteorSpawnInterval) {
      clearInterval(meteorSpawnInterval);
      meteorSpawnInterval = null;
    }

    // Start new spawn interval with updated difficulty values
    meteorSpawnInterval = setInterval(
      spawnMeteor,
      gameDifficulty.current.spawnInterval * multiplier
    );
  }, 500);
}

// Fonction pour arrêter temporairement le spawn des météorites
function pauseMeteorSpawning() {
  if (meteorSpawnInterval) {
    console.log("Pause du spawn des météorites...");
    clearInterval(meteorSpawnInterval); // Arrête uniquement l'intervalle
    meteorSpawnInterval = null;
  }
}

function resumeMeteorSpawning() {
  if (!meteorSpawnInterval) {
    console.log("Reprise du spawn des météorites...");
    meteorSpawnInterval = setInterval(
      spawnMeteor,
      gameDifficulty.current.spawnInterval * multiplier
    );
  }
}

function updateMeteorSpawnInterval() {
  if (meteorSpawnInterval) {
    clearInterval(meteorSpawnInterval);
  }
  meteorSpawnInterval = setInterval(
    spawnMeteor,
    gameDifficulty.current.spawnInterval * multiplier
  );
}
