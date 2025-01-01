// difficulty.js
let gameDifficulty = {
  level: 1,
  maxLevel: 4,
  scoreThresholds: [500, 1500, 3000], // More gradual progression
  phaseValues: {
    1: {
      // Learning phase
      meteorSpeed: 150,
      spawnInterval: 2000,
      meteorHealth: 1,
    },
    2: {
      // Challenge begins
      meteorSpeed: 200,
      spawnInterval: 1500,
      meteorHealth: 3,
    },
    3: {
      // Getting intense
      meteorSpeed: 250,
      spawnInterval: 1200,
      meteorHealth: 3,
    },
    4: {
      // Endless challenge
      meteorSpeed: 300,
      spawnInterval: 1000,
      meteorHealth: 5,
    },
  },
  current: {
    meteorSpeed: 150,
    spawnInterval: 2000,
    meteorHealth: 1,
  },
};

let phaseTransition = {
  active: false,
  startTime: 0,
  duration: 2000, // 2 seconds for the animation
  text: "",
  alpha: 0,
};

function updateDifficulty(score) {
  const previousLevel = gameDifficulty.level;

  // Add comprehensive phase tracking
  console.log(
    `Current status:
    Score: ${score}
    Phase: ${gameDifficulty.level}
    Speed: ${gameDifficulty.current.meteorSpeed}
    Spawn Interval: ${gameDifficulty.current.spawnInterval}ms
    Meteor Health: ${gameDifficulty.current.meteorHealth}`
  );

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

    // Trigger phase transition animation
    startPhaseTransition(gameDifficulty.level);

    updateMeteorSpawnInterval();

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
    });
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
  phaseTransition.active = true;
  phaseTransition.startTime = Date.now();
  phaseTransition.text = `PHASE ${level}`;
  phaseTransition.alpha = 0;
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
