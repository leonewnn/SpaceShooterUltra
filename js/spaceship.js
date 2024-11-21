// spaceship.js
let spaceships = []; // Tableau pour stocker les images du vaisseau
let currentFrame = 0; // Indice de l'image actuelle
let frameInterval = 8; // Intervalle pour ralentir l'animation
let frameCount = 0; // Compteur pour contrôler la vitesse de changement d'image
let missiles = [];
let missileSpeed = 250;
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
missileImg.src = `images/spaceship/missile.png`; // Charger l'image du missile une seule fois

function drawSpaceShip(pos) {
  if (isPaused) return; // Ne dessine pas le vaisseau si le jeu est en pause

  let spaceship = spaceships[currentFrame]; // Image actuelle du vaisseau
  ctx.drawImage(spaceship, pos, canvas.height - 90); // Dessine l'image sur le canvas aux coordonnées spécifiées
  if (shieldActive) {
    ctx.drawImage(shield, pos - 22, canvas.height - 115, 115, 115);
  }
  // Incrémente le compteur pour contrôler la vitesse de l'animation
  frameCount++;
  if (frameCount >= frameInterval) {
    currentFrame = (currentFrame + 1) % 7; // Passe à l'image suivante
    frameCount = 0;
  }
}

function addMissile(adjustementLeftx, adjustementRightx, adjustementy) {
  // Crée le premier missile légèrement décalé à gauche
  let missileLeft = {
    x: spaceshipPos + adjustementLeftx, // Décalé légèrement vers la gauche du centre du vaisseau
    y: canvas.height - 140 - adjustementy,
    img: missileImg,
  };

  // Crée le deuxième missile légèrement décalé à droite
  let missileRight = {
    x: spaceshipPos + adjustementRightx, // Décalé légèrement vers la droite du centre du vaisseau
    y: canvas.height - 140 - adjustementy,
    img: missileImg,
  };

  // Ajoute les deux missiles au tableau
  missiles.push(missileLeft, missileRight);
}

function drawMissile(delta) {
  if (isPaused) return;
  for (let i = 0; i < missiles.length; i++) {
    let missile = missiles[i];
    ctx.drawImage(missile.img, missile.x, missile.y);
    missile.y -= missileSpeed * delta; // Déplace le missile vers le haut

    // Vérifie si le missile est sorti de l'écran
    if (missile.y < -56) {
      missiles.splice(i, 1); // Supprime le missile hors de l'écran
      i--; // Ajuste l'index après la suppression
    }
  }
}
