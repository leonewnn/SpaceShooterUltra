const phaseMusics = [
  new Audio("audio/phase1.mp3"), // Musique de la phase 1
  new Audio("audio/phase2.mp3"), // Musique de la phase 2
  new Audio("audio/phase3.mp3"), // Musique de la phase 3
  new Audio("audio/phase4.mp3"), // Musique de la phase 4
];

let currentMusicIndex = -1; // -1 signifie qu'aucune musique n'est jouée
let currentMusic = null; // Musique actuellement jouée
const defaultVolume = 0.1; // Increased from 0.03
let isMuted = false;
let gameVolume = 0.05; // Increased from 0.015

phaseMusics.forEach((audio, index) => {
  audio.volume = defaultVolume; // Définit le volume initial
  audio.addEventListener("canplaythrough", () => {
    console.log(`Audio phase ${index + 1} ready to play.`);
  });
  audio.addEventListener("error", (e) => {
    console.error(`Error loading audio phase ${index + 1}:`, e);
  });
});

// Fonction pour jouer une musique spécifique
function playMusicForPhase(index) {
  if (!isGameMusicAllowed) return;
  if (currentMusic) {
    fadeOutMusic(currentMusic, () => {
      currentMusic = phaseMusics[index];
      currentMusic.loop = true;
      currentMusic.volume = isMuted ? 0 : gameVolume; // Respecte les paramètres audio
      currentMusic.muted = isMuted;
      currentMusic.play();
      fadeInMusic(currentMusic);
    });
  } else {
    currentMusic = phaseMusics[index];
    currentMusic.loop = true;
    currentMusic.volume = isMuted ? 0 : gameVolume; // Respecte les paramètres audio
    currentMusic.muted = isMuted;
    currentMusic.play();
    fadeInMusic(currentMusic);
  }
  currentMusicIndex = index; // Met à jour l'index
  console.log(`Playing music for phase ${index + 1}`);
}

// Fonction pour augmenter progressivement le volume
function fadeInMusic(audio) {
  let volume = isMuted ? 0 : 0.05;
  const fadeInterval = setInterval(() => {
    if (volume < gameVolume && !isMuted) {
      volume += 0.05;
      audio.volume = Math.min(volume, gameVolume);
    } else {
      clearInterval(fadeInterval);
    }
  }, 200);
}

// Fonction pour diminuer progressivement le volume
function fadeOutMusic(audio, callback) {
  let volume = audio.volume;
  const fadeInterval = setInterval(() => {
    if (volume > 0) {
      volume -= 0.05;
      audio.volume = Math.max(volume, 0);
    } else {
      clearInterval(fadeInterval);
      audio.pause();
      audio.currentTime = 0;
      if (callback) callback();
    }
  }, 200);
}

// Fonction pour gérer la transition musicale selon le score
function updateMusic(score) {
  const thresholds = gameDifficulty.scoreThresholds; // Seuils de phase
  const phase = gameDifficulty.level - 1; // Phase actuelle (index de 0 à 3)

  // Si le score approche du seuil, diminuer le volume progressivement
  if (
    phase >= 0 &&
    phase < thresholds.length &&
    score >= thresholds[phase] - 70 &&
    score < thresholds[phase]
  ) {
    const distanceToThreshold = thresholds[phase] - score; // Distance restante
    const reductionFactor = distanceToThreshold / 70; // Facteur de réduction (entre 1 et 0)
    const targetVolume = defaultVolume * reductionFactor; // Volume cible basé sur la distance

    // Ajuste le volume progressivement vers le volume cible
    if (currentMusic.volume > targetVolume) {
      currentMusic.volume = Math.max(targetVolume, currentMusic.volume - 0.01);
    }
  }

  // Si on change de phase, jouer la nouvelle musique
  if (phase !== currentMusicIndex && !gameOver) {
    playMusicForPhase(phase);
  }
}

// Intégrer cette fonction dans ta boucle de jeu ou ton gestionnaire de phase
setInterval(() => {
  if (!gameOver) {
    updateMusic(playerScore); // Appelle régulièrement pour ajuster la musique
  }
}, 100); // Vérifie toutes les 100ms

let isGameMusicAllowed = false; // Indicateur pour la musique in-game
let isMenuMusicAllowed = false; // Indicateur pour la musique du menu

function stopMusic() {
  if (currentMusic) {
    fadeOutMusic(currentMusic, () => {
      currentMusic = null;
      currentMusicIndex = -1; // Réinitialise l'index
    });
  }
}

function pauseCurrentMusic() {
  if (currentMusic) {
    console.log("Pause musique :", currentMusic.src); // Débogage
    currentMusic.pause();
  } else {
    console.log("Aucune musique à mettre en pause !");
  }
}

function resumeCurrentMusic() {
  if (currentMusic) {
    console.log("Reprise musique :", currentMusic.src); // Débogage
    currentMusic.play();
  } else {
    console.log("Aucune musique à reprendre !");
  }
}

// Musique pour le menu principal
const menuMusic = new Audio("audio/Menu-Music.mp3");
menuMusic.loop = true; // La musique se répète
menuMusic.volume = gameVolume; // Respecte le volume défini
menuMusic.muted = isMuted;

window.addEventListener("load", () => {
  setupSoundControls(); // Initialise les contrôles audio au démarrage
});

// Initialiser les contrôles audio
function setupSoundControls() {
  const muteToggle = document.getElementById("muteToggle");

  // Synchroniser l'état initial
  muteToggle.checked = isMuted;

  // Gérer l'activation/désactivation du son
  muteToggle.addEventListener("change", () => {
    isMuted = muteToggle.checked;
    updateAllAudio();
  });
}

// Fonction pour mettre à jour le son de toutes les musiques
function updateAllAudio() {
  phaseMusics.forEach((audio) => {
    audio.muted = isMuted;
    if (!isMuted) {
      audio.volume = gameVolume; // Applique le volume global
    }
  });

  if (menuMusic) {
    menuMusic.muted = isMuted;
    if (!isMuted) {
      menuMusic.volume = gameVolume; // Applique le volume global
    }
  }

  if (currentMusic) {
    currentMusic.muted = isMuted;
    if (!isMuted) {
      currentMusic.volume = gameVolume; // Applique le volume global
    }
  }
}

// Appeler setupSoundControls au chargement de la page
window.addEventListener("load", () => {
  setupSoundControls(); // Initialise les contrôles audio au démarrage
});

// Appeler cette fonction dans l'écran titre
setupSoundControls();
