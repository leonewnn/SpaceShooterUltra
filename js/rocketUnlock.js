// rocketUnlock.js
const rocketUnlockThresholds = {
  default: 0,      // Default yellow rocket - available from start
  blue: 2000,      // Unlocked at 2000 points
  green: 2500,    // Unlocked at 2500 points
  pink: 3000      // Unlocked at 3000 points
};
  
function checkRocketUnlocks(score) {
  let unlockedRockets = JSON.parse(localStorage.getItem('unlockedRockets')) || ['default'];
  
  for (const [rocket, threshold] of Object.entries(rocketUnlockThresholds)) {
    if (score >= threshold && !unlockedRockets.includes(rocket)) {
      unlockedRockets.push(rocket);
      showUnlockNotification(rocket);
    }
  }
  
  localStorage.setItem('unlockedRockets', JSON.stringify(unlockedRockets));
}

function showUnlockNotification(rocketType) {
  // Add visual notification that a new rocket was unlocked
  console.log(`New rocket unlocked: ${rocketType}!`);
}