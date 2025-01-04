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
  // Crée le premier missile légèrement décalé à gauche
  let missileLeft = {
    x: spaceshipPos + adjustementLeftx, // Décalé légèrement vers la gauche
    y: spaceshipY - adjustementy, // Utilise spaceshipY pour la position verticale
    img: missileImg,
  };

  // Crée le deuxième missile légèrement décalé à droite
  let missileRight = {
    x: spaceshipPos + adjustementRightx, // Décalé légèrement vers la droite
    y: spaceshipY - adjustementy, // Utilise spaceshipY pour la position verticale
    img: missileImg,
  };

  // Ajoute les deux missiles au tableau
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