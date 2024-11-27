let impacts = [];
for (let i = 0; i <= 6; i++) {
  let img = new Image();
  img.src = `images/collisions/impact_${i.toString()}.png`;
  impacts.push(img);
}

let impactAnimations = []; // Tableau pour stocker les animations d'impact actives
let frameDelay = 3; // Ajustement du délai pour une animation plus fluide

function impactAnimation(x, y) {
  impactAnimations.push({ x, y, impactFrames: 0, delayCounter: 0 });
}

function drawImpacts() {
  for (let i = impactAnimations.length - 1; i >= 0; i--) {
    let anim = impactAnimations[i];
    let frameIndex =
      Math.floor(anim.impactFrames / frameDelay) % impacts.length;
    let frame = impacts[frameIndex];

    // Dessiner l'impact à la position (x, y)
    ctx.drawImage(frame, anim.x - frame.width / 2, anim.y - frame.height / 2);

    anim.delayCounter++;

    // Passer à l'image suivante après le délai
    if (anim.delayCounter >= frameDelay) {
      anim.impactFrames++;
      anim.delayCounter = 0;
    }

    // Supprimer l'animation une fois terminée
    if (anim.impactFrames >= impacts.length * frameDelay) {
      impactAnimations.splice(i, 1);
    }
  }
}

function checkCollision(missile, meteor) {
  return (
    missile.x < meteor.x + meteor.size &&
    missile.x + missile.img.width > meteor.x &&
    missile.y < meteor.y + meteor.size &&
    missile.y + missile.img.height > meteor.y
  );
}

function checkPowerupGrabbed(spaceshipX, spaceshipY, powerup) {
  return (
    spaceshipX < powerup.x + powerup.size && // Collision horizontale
    spaceshipX + 75 > powerup.x && // Collision horizontale
    spaceshipY < powerup.y + powerup.size && // Collision verticale
    spaceshipY + 75 > powerup.y // Collision verticale
  );
}

function handleCollisionsPowerUp() {
  for (let i = powerupItems.length - 1; i >= 0; i--) {
    let powerup = powerupItems[i];

    if (checkPowerupGrabbed(spaceshipPos, spaceshipY, powerup)) {
      if (powerup.type === "armor") {
        hasArmor = true; // Activer l'armor
        console.log("Power-up Armor activé !");
      }

      activePowerup(powerup); // Appliquer l'effet du power-up
      powerupItems.splice(i, 1); // Retirer le power-up du jeu
    }
  }
}

function handleCollisions() {
  for (let i = missiles.length - 1; i >= 0; i--) {
    let missile = missiles[i];

    for (let j = meteorites.length - 1; j >= 0; j--) {
      let meteor = meteorites[j];

      if (checkCollision(missile, meteor)) {
        increaseScore(10);
        meteor.life = meteor.life - 1;
        // console.log(meteor.life);
        missiles.splice(i, 1);

        if (meteor.life < 1) {
          impactAnimation(missile.x, missile.y);
          meteorites.splice(j, 1);
          break;
        }
      }
    }
  }
}

function checkSpaceShipCollision(spaceship, meteor) {
  return (
    spaceship.x < meteor.x + meteor.size && // Collision horizontale
    spaceship.x + spaceship.img.width > meteor.x && // Collision horizontale
    spaceship.y < meteor.y + meteor.size && // Collision verticale
    spaceship.y + spaceship.img.height > meteor.y // Collision verticale
  );
}

function handleSpaceShipCollisions() {
  if (gameState !== "playScreen") return; // Ne pas vérifier si le jeu n'est pas actif

  for (let i = 0; i < meteorites.length; i++) {
    let meteor = meteorites[i];
    let spaceship = {
      x: spaceshipPos,
      y: spaceshipY, // Inclure spaceshipY pour la position verticale
      img: spaceships[0],
    };

    if (checkSpaceShipCollision(spaceship, meteor)) {
      console.log("Collision détectée entre le vaisseau et une météorite");
      console.log("Protection active :", shieldActive);

      if (shieldActive) {
        console.log("Protection activée : aucune vie perdue !");
        meteorites.splice(i, 1); // Supprime la météorite
        return; // Arrêter la gestion de la collision
      }

      if (recoveringLifeIndex !== null) {
        console.log(
          `Vie en cours de récupération perdue : cœur ${recoveringLifeIndex + 1}`
        );
        imagesAnimated[recoveringLifeIndex] = true;
        recoveringLifeIndex = null;
      } else {
        startLifeAnimation();
      }

      impactAnimation(spaceship.x, spaceship.y);
      meteorites.splice(i, 1);
      break;
    }
  }
}
