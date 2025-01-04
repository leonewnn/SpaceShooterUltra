// difficulty.js
let gameDifficulty = {
  level: 1,
  maxLevel: 4,
  scoreThresholds: [500, 1500, 3000], // More gradual progression
  phaseValues: {
    1: {
      // Learning phase
      meteorSpeedRange: [150, 300],
      spawnInterval: 1700,
      meteorHealth: 2,
      maxMeteors: 5,
      powerupSpeed: 200,
      powerupSpawnInterval: 20000,
      fireRate: 600,
      missileSpeed: 750,
    },
    2: {
      // Challenge begins
      meteorSpeedRange: [400, 700],
      spawnInterval: 1200,
      meteorHealth: 3,
      maxMeteors: 10,
      powerupSpeed: 400,
      powerupSpawnInterval: 30000,
      fireRate: 550,
      missileSpeed: 850,
    },
    3: {
      // Getting intense
      meteorSpeedRange: [800, 1100],
      spawnInterval: 900,
      meteorHealth: 3,
      maxMeteors: 15,
      powerupSpeed: 550,
      powerupSpawnInterval: 40000,
      fireRate: 500,
      missileSpeed: 950,
    },
    4: {
      // Endless challenge
      meteorSpeedRange: [1200, 1600],
      spawnInterval: 700,
      meteorHealth: 4,
      maxMeteors: 20,
      powerupSpeed: 700,
      powerupSpawnInterval: 50000,
      fireRate: 450,
      missileSpeed: 1050,
    },
  },
  current: {
    meteorSpeedRange: [150, 300],
    spawnInterval: 1700,
    meteorHealth: 2,
    maxMeteors: 5,
    powerupSpeed: 200,
    powerupSpawnInterval: 20000,
    fireRate: 600,
    missileSpeed: 750,
  },
};

let phaseTransition = {
  active: false,
  startTime: 0,
  duration: 2000, // 2 seconds for the animation
  text: "",
  alpha: 0,
};

let messageTransition = {
  active: false,
  startTime: 0,
  duration: 2000,
  text: "",
  subtext: "",
  color: "#FFD700", // Default gold color
  alpha: 0,
};

function startTransitionMessage(
  text,
  subtext = "",
  color = "#FFD700",
  duration = 2000
) {
  messageTransition.active = true;
  messageTransition.startTime = Date.now();
  messageTransition.text = text;
  messageTransition.subtext = subtext;
  messageTransition.color = color;
  messageTransition.duration = duration;
  messageTransition.alpha = 0;
}

function drawTransitionMessage() {
  if (!messageTransition.active) return;

  const currentTime = Date.now();
  const elapsed = currentTime - messageTransition.startTime;
  const progress = Math.min(elapsed / messageTransition.duration, 1);

  // Calculate alpha for fade in/out effect
  if (progress < 0.3) {
    messageTransition.alpha = progress / 0.3;
  } else if (progress > 0.7) {
    messageTransition.alpha = (1 - progress) / 0.3;
  } else {
    messageTransition.alpha = 1;
  }

  // Save context state
  ctx.save();

  // Add glow effect
  ctx.shadowBlur = 20;
  ctx.shadowColor = messageTransition.color;

  // Draw main text
  ctx.globalAlpha = messageTransition.alpha;
  ctx.font = "48px SpaceMan";
  ctx.fillStyle = messageTransition.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(messageTransition.text, canvas.width / 2, canvas.height / 2);

  // Draw subtitle if present
  if (messageTransition.subtext) {
    ctx.font = "24px SpaceMan";
    ctx.fillText(
      messageTransition.subtext,
      canvas.width / 2,
      canvas.height / 2 + 50
    );
  }

  // Reset context
  ctx.restore();

  // End transition when complete
  if (progress >= 1) {
    messageTransition.active = false;
    messageTransition.alpha = 0;
  }
}

function updateDifficulty(score) {
  const previousLevel = gameDifficulty.level;

  // Determine phase based on score
  if (score >= gameDifficulty.scoreThresholds[2]) {
    gameDifficulty.level = 4;
  } else if (score >= gameDifficulty.scoreThresholds[1]) {
    gameDifficulty.level = 3;
  } else if (score >= gameDifficulty.scoreThresholds[0]) {
    gameDifficulty.level = 2;
  }

  if (previousLevel !== gameDifficulty.level) {
    const newValues = gameDifficulty.phaseValues[gameDifficulty.level];
    gameDifficulty.current.meteorSpeed = newValues.meteorSpeed;
    gameDifficulty.current.spawnInterval = newValues.spawnInterval;
    gameDifficulty.current.meteorHealth = newValues.meteorHealth;
    gameDifficulty.current.maxMeteors = newValues.maxMeteors;
    gameDifficulty.current.powerupSpeed = newValues.powerupSpeed;
    gameDifficulty.current.powerupSpawnInterval =
      newValues.powerupSpawnInterval;
    gameDifficulty.current.fireRate = newValues.fireRate; // Update fire rate
    gameDifficulty.current.missileSpeed = newValues.missileSpeed; // Update missile speed

    // Trigger phase transition animation
    startPhaseTransition(gameDifficulty.level);

    updateMeteorSpawnInterval();
    updatePowerupSpawnInterval();

    console.log(
      "Level changed from",
      previousLevel,
      "to",
      gameDifficulty.level
    );
    console.log(
      "New phase values:",
      gameDifficulty.phaseValues[gameDifficulty.level]
    );

    console.log("Updated parameters:", {
      speed: gameDifficulty.current.meteorSpeed,
      interval: gameDifficulty.current.spawnInterval,
      health: gameDifficulty.current.meteorHealth,
      maxMeteors: gameDifficulty.current.maxMeteors,
      powerupSpeed: gameDifficulty.current.powerupSpeed,
      powerupSpawnInterval: gameDifficulty.current.powerupSpawnInterval,
      fireRate: gameDifficulty.current.fireRate, // Log fire rate
      missileSpeed: gameDifficulty.current.missileSpeed, // Log missile speed
    });

    // Play music for the new phase
    playMusicForPhase(gameDifficulty.level - 1);
  }

  // Check for rocket unlocks
  checkRocketUnlocks(score);
}

function showLevelUpMessage() {
  console.log("Phase : " + gameDifficulty.level);
  // console.log("Vitesse des météorites : " + gameDifficulty.current.meteorSpeed);
  ctx.font = "48px Arial";
  ctx.fillStyle = "yellow";
  ctx.textAlign = "center";
  ctx.fillText(
    `PHASE ${gameDifficulty.level}!`,
    canvas.width / 2,
    canvas.height / 2
  );
}

function startPhaseTransition(level) {
  startTransitionMessage(
    `PHASE ${level}`,
    "DIFFICULTY INCREASED",
    "#FFD700",
    2000
  );
}

// Add to difficulty.js
function drawPhaseTransition() {
  if (!phaseTransition.active) return;

  const currentTime = Date.now();
  const elapsed = currentTime - phaseTransition.startTime;
  const progress = Math.min(elapsed / phaseTransition.duration, 1);

  // Calculate alpha for fade in/out effect
  if (progress < 0.3) {
    // Fade in
    phaseTransition.alpha = progress / 0.3;
  } else if (progress > 0.7) {
    // Fade out
    phaseTransition.alpha = (1 - progress) / 0.3;
  } else {
    // Stay fully visible
    phaseTransition.alpha = 1;
  }

  // Save context state
  ctx.save();

  // Add glow effect
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#FFD700";

  // Draw main text
  ctx.globalAlpha = phaseTransition.alpha;
  ctx.font = "48px SpaceMan";
  ctx.fillStyle = "#FFD700";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(phaseTransition.text, canvas.width / 2, canvas.height / 2);

  // Draw smaller subtitle
  ctx.font = "24px SpaceMan";
  ctx.fillStyle = "#FFA500";
  ctx.fillText(
    "DIFFICULTY INCREASED",
    canvas.width / 2,
    canvas.height / 2 + 50
  );

  // Reset context
  //ctx.globalAlpha = 1;
  ctx.restore();

  // End transition when complete
  if (progress >= 1) {
    phaseTransition.active = false;
    phaseTransition.alpha = 0;
  }
}
