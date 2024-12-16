// music.js
const phaseMusics = [
    new Audio('audio/phase1.mp3'), // Musique de la phase 1
    new Audio('audio/phase2.mp3'), // Musique de la phase 2
    new Audio('audio/phase3.mp3'), // Musique de la phase 3
    new Audio('audio/phase4.mp3'), // Musique de la phase 4
  ];
  
  let currentMusicIndex = -1; // -1 signifie qu'aucune musique n'est jouée
  let currentMusic = null; // Musique actuellement jouée
  const defaultVolume = 0.05;
  
  phaseMusics.forEach((audio) => {
    audio.volume = defaultVolume; // Définit le volume initial
  });

  // Fonction pour jouer une musique spécifique
  function playMusicForPhase(index) {
    if (!isMusicAllowed) return;
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
  
    // Si le score approche du seuil, diminuer le volume
    if (
      phase >= 0 &&
      phase < thresholds.length &&
      score >= thresholds[phase] - 70 &&
      score < thresholds[phase]
    ) {
      const volume = Math.max(0, (thresholds[phase] - score) / 70);
      phaseMusics[phase].volume = volume;
    }
  
    // Si on change de phase, jouer la nouvelle musique
    if (phase !== currentMusicIndex) {
      playMusicForPhase(phase);
    }
  }
  
  // Intégrer cette fonction dans ta boucle de jeu ou ton gestionnaire de phase
  setInterval(() => {
    updateMusic(playerScore); // Appelle régulièrement pour ajuster la musique
  }, 100); // Vérifie toutes les 100ms
  
  let isMusicAllowed = false; // Indique si la musique peut être jouée

function playMusicForPhase(index) {
  if (!isMusicAllowed) return; // Ne joue pas la musique si elle est désactivée

  if (currentMusic) {
    fadeOutMusic(currentMusic, () => {
      currentMusic = phaseMusics[index];
      currentMusic.loop = true;
      currentMusic.volume = 0; // Commence à volume 0
      currentMusic.play();
      fadeInMusic(currentMusic); // Lance le fondu entrant
    });
  } else {
    currentMusic = phaseMusics[index];
    currentMusic.loop = true;
    currentMusic.volume = 0;
    currentMusic.play();
    fadeInMusic(currentMusic);
  }
  currentMusicIndex = index; // Met à jour l'index
}

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
  
  window.addEventListener("load", () => {
    setupSoundControls(); // Initialise les contrôles audio au démarrage
  });
  