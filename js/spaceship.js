// spaceship.js
let spaceshipY = canvas.height + 500; // Position initiale du vaisseau
let spaceships = []; // Tableau pour stocker les images du vaisseau
let currentFrame = 0; // Indice de l'image actuelle
let frameInterval = 8; // Intervalle pour ralentir l'animation
let frameCount = 0; // Compteur pour contrôler la vitesse de changement d'image
let missiles = [];
let shieldActive = false;
let shield = new Image();
shield.src = `images/spaceship/shield.png`;

const shootSound = new Audio("audio/shoot_sound.mp3");
shootSound.volume = 0.01; // Adjust volume to match other sound effects

// Charger les images du vaisseau
for (let i = 0; i <= 6; i++) {
  let img = new Image();
  img.src = `images/spaceship/spaceshipresize_${i.toString()}.png`;
  spaceships.push(img);
}

let missileImg = new Image();
const selectedRocket = localStorage.getItem("selectedRocket") || "default";
missileImg.src =
  selectedRocket === "default"
    ? "images/spaceship/missile.png"
    : `images/spaceship/missile_${selectedRocket}.png`;

function getMissileImage() {
  const selectedRocket = localStorage.getItem("selectedRocket") || "default";
  const rocketPaths = {
    default: "images/spaceship/missile.png",
    blue: "images/spaceship/missile_blue.png",
    green: "images/spaceship/missile_green.png",
    pink: "images/spaceship/missile_pink.png",
  };
  return rocketPaths[selectedRocket];
}

function drawSpaceShip(pos) {
  if (isPaused) return; // Ne dessine pas le vaisseau si le jeu est en pause

  let spaceship = spaceships[currentFrame]; // Image actuelle du vaisseau
  ctx.drawImage(spaceship, pos, spaceshipY); // Utilise spaceshipY pour la position verticale
  if (shieldActive) {
    ctx.drawImage(shield, pos - 22, spaceshipY - 25, 115, 115);
  }

  // Animation
  frameCount++;
  if (frameCount >= frameInterval) {
    currentFrame = (currentFrame + 1) % 7; // Passe à l'image suivante
    frameCount = 0;
  }
}

function addMissile(adjustementLeftx, adjustementRightx, adjustementy) {
  // Only create missiles and play sound if in playScreen state
  if (gameState !== "playScreen") return;

  // Play shoot sound if not muted
  if (!isMuted) {
    shootSound.currentTime = 0;
    shootSound.play();
  }

  let missileLeft = {
    x: spaceshipPos + adjustementLeftx,
    y: spaceshipY - adjustementy,
    img: missileImg,
  };

  let missileRight = {
    x: spaceshipPos + adjustementRightx,
    y: spaceshipY - adjustementy,
    img: missileImg,
  };

  missiles.push(missileLeft, missileRight);
}

function drawMissile(delta) {
  if (isPaused) return;

  for (let i = 0; i < missiles.length; i++) {
    let missile = missiles[i];

    ctx.drawImage(missile.img, missile.x, missile.y); // Dessine le missile
    missile.y -= gameDifficulty.current.missileSpeed * delta; // Utiliser la vitesse des missiles spécifique à la phase

    // Vérifie si le missile est sorti de l'écran
    if (missile.y < -56) {
      missiles.splice(i, 1); // Supprime le missile hors de l'écran
      i--; // Ajuste l'index après la suppression
    }
  }
}

//fonction pour sélectionner les rockets du vaisseau
function selectRocket(type) {
  localStorage.setItem("selectedRocket", type);
  document
    .querySelectorAll(".rocket")
    .forEach((r) => r.classList.remove("selected"));
  event.currentTarget.classList.add("selected");
}

// Affiche la sélection actuelle
const current = localStorage.getItem("selectedRocket") || "default";
document
  .querySelector(`[onclick="selectRocket('${current}')"]`)
  .classList.add("selected");
