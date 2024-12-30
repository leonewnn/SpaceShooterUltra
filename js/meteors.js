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
  if (meteorites.length >= gameDifficulty.current.maxMeteors) {
    return; // Ne pas ajouter de nouvelles météorites si le maximum est atteint
  }

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
    // Add new rotation properties
    rotation: 0,
    rotationSpeed: (Math.random() - 0.5) * 2, // Random rotation speed between -1 and 1
  };
  meteorites.push(meteor);
}

function drawMeteors(delta) {
  for (let i = 0; i < meteorites.length; i++) {
    let meteor = meteorites[i];

    // Save the current context state
    ctx.save();

    // Move to meteor's center position
    ctx.translate(meteor.x + meteor.size / 2, meteor.y + meteor.size / 2);

    // Apply rotation
    ctx.rotate(meteor.rotation);

    // Draw meteor at origin (since we translated to its position)
    ctx.drawImage(
      meteor.img,
      -meteor.size / 2,
      -meteor.size / 2,
      meteor.size,
      meteor.size
    );

    // Restore the context state
    ctx.restore();

    // If game is not paused, update position and rotation
    if (!isPaused) {
      meteor.y += gameDifficulty.current.meteorSpeed * delta;
      meteor.x += meteor.inclinaition;

      // Update rotation
      meteor.rotation += meteor.rotationSpeed * delta;

      // Remove meteors that go off screen
      if (meteor.y > canvas.height) {
        meteorites.splice(i, 1);
        i--;
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
