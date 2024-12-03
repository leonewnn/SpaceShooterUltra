// powerups.js
let powerups = [];
let powerupItems = [];
let powerupSpawnInterval;
let powerupSpawnFrequency = 5000; // Fréquence de spawn des power-ups en millisecondes
let powerupSpeed = 100;
let powerupspawnproccessing = true;
let minmalSpawnInterval = 15000;
let timespanspawntime = 15000;
let powerUpTime = 10;
let recoveringLifeIndex = null; // Indice de la vie en cours de récupération

// Indicateur unique pour afficher les power-ups actifs
let activeIndicator = null;
let indicatorEndTime = null;
let activeIndicatorImage = null;

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
  if (powerupspawnproccessing) {
    nextPowerUpSpawn();
  }
}

function nextPowerUpSpawn() {
  powerupspawnproccessing = false;
  // Attendre un intervalle aléatoire, puis spawn le power-up
  let nextMoment =
    Math.floor(Math.random() * timespanspawntime) + minmalSpawnInterval;
  setTimeout(() => {
    spawnPowerup(); // Appel de la fonction pour faire apparaître un power-up
    powerupspawnproccessing = true; // Réactiver le spawn pour le prochain
    nextPowerUpSpawn(); // Rappeler la fonction pour continuer le spawn
  }, nextMoment);
}

// Fonction pour faire apparaître un power-up
function spawnPowerup() {
  let randomPowerupImage =
    powerups[Math.floor(Math.random() * powerups.length)];
  let xPosition = Math.random() * (canvas.width - 50); // Ajuste pour garder le power-up dans les limites

  let powerup = {
    x: xPosition,
    y: -50, // Spawn au-dessus de l'écran
    size: 50, // Taille fixe du power-up
    img: randomPowerupImage,
  };
  powerupItems.push(powerup);
}

// Fonction pour dessiner et déplacer les power-ups
function drawPowerups(delta) {
  for (let i = 0; i < powerupItems.length; i++) {
    let powerup = powerupItems[i];

    // Add glow effect
    ctx.shadowBlur = 30;
    ctx.shadowColor = "rgba(255, 255, 255, 0.7)";

    ctx.drawImage(
      powerup.img,
      powerup.x,
      powerup.y, // Removed floatOffset
      powerup.size,
      powerup.size
    );

    ctx.shadowBlur = 0;

    powerup.y += powerupSpeed * delta;

    if (powerup.y > canvas.height) {
      powerupItems.splice(i, 1);
      i--;
    }
  }
}

// Gestion des power-ups actifs
function activePowerup(powerup) {
  const powerupName = getImageName(powerup);
  //  console.log(powerupName + " activé");

  switch (powerupName) {
    case "armor_up":
      activateArmorUp();
      setIndicator(powerup, powerUpTime);
      break;
    case "fire_rate_up":
      activateFireRateUp();
      setIndicator(powerup, powerUpTime);
      break;
    case "hp_up":
      activateHpUp();
      break;
    case "nuke_up":
      activateNukeUp();

      break;
    default:
    //    console.log("Power-up inconnu : " + powerupName);
  }

  // 10 secondes par défaut
}

// Fonctions placeholders à coder plus tard
function activateArmorUp() {
  //  console.log("Activation de Armor Up!");
  shieldActive = true;

  setTimeout(() => {
    shieldActive = false;
    // console.log("Shiled finito");
  }, powerUpTime * 1000);
}

function activateFireRateUp() {
  //  console.log("Activation de Fire Rate Up!");

  bonusActive = true; // Activer les tirs bonus

  // Désactiver le bonus après 10 secondes
  setTimeout(() => {
    bonusActive = false;
    //  console.log("Fire Rate Up terminé !");
  }, powerUpTime * 1000);
}

function activateHpUp() {
  // console.log("Activation de HP Up!");

  // Chercher la dernière vie perdue (la plus à droite)
  const lostLifeIndex = imagesAnimated.lastIndexOf(true);

  if (lostLifeIndex !== -1) {
    imagesAnimated[lostLifeIndex] = false; // Réactive la vie perdue
    animationsCompleted--; // Réduit le compteur d'animations terminées
    recoveringLifeIndex = lostLifeIndex; // Marque la vie comme en cours de récupération
    // console.log(`Vie restaurée : cœur ${lostLifeIndex + 1}`);
  } else {
    //  console.log("Toutes les vies sont déjà restaurées !");
  }
}

function activateNukeUp() {
  // console.log("Activation de Nuke Up!");

  // Vider les météorites et arrêter leur spawn
  meteorites.length = 0; // Efface toutes les météorites
  pauseMeteorSpawning(); // Arrête temporairement le spawn
  // console.log("Meteorites cleared and spawning paused.");

  // Relancer après 8 secondes
  setTimeout(() => {
    resumeMeteorSpawning(); // Relance le spawn
    //  console.log("Meteor spawning resumed after Nuke.");
  }, 8 * 1000);
}

function getImageName(picture) {
  var fullPath = picture.img.src;
  var filename = fullPath.replace(/^.*[\\\/]/, ""); // Récupère le nom de fichier avec l'extension
  var nameWithoutExtension = filename.replace(/\.[^/.]+$/, ""); // Supprime l'extension (comme .png, .jpg, etc.)
  return nameWithoutExtension;
}

// Fonction pour définir l'indicateur actif
function setIndicator(powerup, duration) {
  //console.log("Activation du power-up :", powerup);
  activeIndicator = powerup;
  activeIndicatorImage = powerup.img;
  indicatorEndTime = Date.now() + duration * 1000;
}

// Fonction pour dessiner l'indicateur actif avec une barre simple
function drawIndicator() {
  if (activeIndicator && activeIndicatorImage) {
    const remainingTime = (indicatorEndTime - Date.now()) / 1000; // Temps restant en secondes

    if (remainingTime > 0) {
      // Dessiner l'image du power-up
      ctx.drawImage(
        activeIndicatorImage,
        10, // Position X (en bas à gauche)
        canvas.height - 120, // Position Y fixe
        50, // Largeur de l'image
        50 // Hauteur de l'image
      );

      // Dessiner une barre simple indiquant la progression
      ctx.fillStyle = "green";
      ctx.fillRect(10, canvas.height - 50, remainingTime * 10, 10); // Barre simple

      // Dessiner le contour de la barre
      ctx.strokeStyle = "white";
      ctx.strokeRect(10, canvas.height - 50, 100, 10); // Contour blanc
    } else {
      activeIndicator = null; // Supprimer l'indicateur lorsque le temps est écoulé
      activeIndicatorImage = null; // Supprimer l'image associée
    }
  }
}

function pausePowerupSpawning() {
  powerupspawnproccessing = false; // Arrête le processus de génération
}

function resumePowerupSpawning() {
  powerupspawnproccessing = true; // Redémarre le processus de génération
  nextPowerUpSpawn(); // Relance la génération du prochain power-up
}
