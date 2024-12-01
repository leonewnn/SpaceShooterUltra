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
