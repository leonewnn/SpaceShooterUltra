let profileImage = null;
    let scoreSubmitted = false;
    let enteredName = "";
    const maxNameLength = 3;

    // Vérifier si le scoreboard est ouvert depuis le menu
    function isFromMenu() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("fromMenu") === "true";
    }

    // Masquer les champs de saisie si le scoreboard est ouvert depuis le menu
    function checkAccessFromMenu() {
    if (isFromMenu()) {
        // Masquer le bouton "Submit"
        const submitButton = document.querySelector(".submit-button");
        if (submitButton) {
            submitButton.style.display = "none"; // Supprime visuellement le bouton
        }

        // Masquer la ligne avec le #
        const nameInputRow = document.getElementById("nameInputRow");
        if (nameInputRow) {
            nameInputRow.style.visibility = "hidden"; // Masque visuellement la ligne tout en conservant l'espace
        }

        // Centrer le bouton "Return to Home"
        const backButton = document.querySelector(".back-button");
        if (backButton) {
            backButton.classList.add("centered-button");
        }

        console.log("Accès depuis le menu : ligne avec # masquée.");
    } else {
        // Afficher la ligne avec le #
        const nameInputRow = document.getElementById("nameInputRow");
        if (nameInputRow) {
            nameInputRow.style.visibility = "visible"; // Réaffiche visuellement la ligne
        }

        // Rendre le bouton Submit visible
        const submitButton = document.querySelector(".submit-button");
        if (submitButton) {
            submitButton.style.display = "block";
        }

        const backButton = document.querySelector(".back-button");
        if (backButton) {
            backButton.classList.remove("centered-button");
        }
    }
}

    // Sauvegarde automatique du score uniquement après un Game Over
    window.addEventListener("beforeunload", (event) => {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const score = localStorage.getItem("playerScore") || 0;

    // Ne sauvegarde "NPC" que si aucun score avec ce score spécifique n'existe déjà
    const scoreExists = highScores.some((entry) => entry.score === parseInt(score));

    if (!isFromMenu() && !scoreSubmitted && !scoreExists) {
        saveHighScore("NPC", score, profileImage);
        console.log("Score sauvegardé automatiquement avec 'NPC'.");
    }
});

    // Sauvegarder un score dans le localStorage
    function saveHighScore(name, score, profileImage) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const profilePicture = profileImage || 'images/default_pp.png';

    // Ajouter le nouveau score
    highScores.push({ name, score, profileImage: profilePicture });

    // Trier par score décroissant
    highScores.sort((a, b) => b.score - a.score);

    // Limiter à 5 scores maximum
    highScores.splice(5);

    // Sauvegarder dans localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

    // Afficher les scores dans le tableau
    function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const scoreTableBody = document.getElementById("scoreTableBody");

    // Remplir les scores enregistrés
    const rows = highScores.map((score, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <img src="${score.profileImage || 'images/default_pp.png'}" 
                     alt="Profile" width="60" height="60">
            </td>
            <td>${score.name}</td>
            <td>${score.score}</td>
        </tr>
    `);

    // Compléter jusqu'à 5 rangs avec des placeholders
    for (let i = highScores.length; i < 5; i++) {
        rows.push(`
            <tr>
                <td>${i + 1}</td>
                <td>
                    <img src="images/default_pp.png" alt="Profile" width="60" height="60">
                </td>
                <td>---</td>
                <td>---</td>
            </tr>
        `);
    }

    // Mettre à jour le tableau
    scoreTableBody.innerHTML = rows.join("");
}

    // Gestion du drag-and-drop pour l'image de profil
    const dropZone = document.getElementById("dropZone");
    dropZone.addEventListener("dragover", (e) => e.preventDefault());
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                profileImage = reader.result;
                dropZone.innerHTML = `<img src="${profileImage}" alt="Profile" width="50" height="50">`;
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please drop a valid image file.");
        }
    });

    // Mise à jour de la saisie du nom
    function updateNameInput() {
    const nameLetters = document.getElementById("nameLetters");
    nameLetters.textContent = enteredName;
}

    // Gérer la saisie des touches pour le nom
    window.addEventListener("keydown", (event) => {
    if (enteredName.length < maxNameLength && /^[A-Za-z]$/.test(event.key)) {
        enteredName += event.key.toUpperCase();
        updateNameInput();
    } else if (event.key === "Backspace") {
        enteredName = enteredName.slice(0, -1);
        updateNameInput();
    } else if (enteredName.length === maxNameLength && event.key === "Enter") {
        const score = parseInt(localStorage.getItem("playerScore") || "0", 10);
        const profilePicture = profileImage || 'images/default_pp.png';

        saveHighScore(enteredName, score, profilePicture); // Sauvegarde avec le nom
        localStorage.setItem("scoreSubmitted", "true");
        scoreSubmitted = true;

        document.getElementById("nameInputRow").classList.add("hidden");
        displayHighScores();
    }
});

    // Redirection vers la page principale
    function returnToHome() {
        window.location.href = "game.html";
    }

    function submitPlayerScore() {
    if (enteredName.length === maxNameLength) {
        const score = parseInt(localStorage.getItem("playerScore") || "0", 10);
        const profilePicture = profileImage || 'images/default_pp.png';

        // Sauvegarde du score
        saveHighScore(enteredName, score, profilePicture);
        localStorage.setItem("scoreSubmitted", "true"); // Marque comme soumis

        scoreSubmitted = true;

        // Cache la saisie et désactive le bouton "Submit"
        document.getElementById("nameInputRow").classList.add("hidden");
        document.querySelector(".submit-button").disabled = true;

        displayHighScores(); // Rafraîchir l'affichage des scores
        console.log("Score sauvegardé avec le nom :", enteredName);
    } else {
        alert("Please enter a valid 3-letter name.");
    }
}

function updateCurrentScoreDisplay() {
    const currentScore = parseInt(localStorage.getItem("playerScore") || "0", 10);
    const playerScoreCell = document.getElementById("playerScore");

    if (playerScoreCell) {
        playerScoreCell.textContent = currentScore; // Met à jour l'affichage du score
    }
}

window.addEventListener("load", () => {
    if (localStorage.getItem("scoreSubmitted") === "true") {
        document.querySelector(".submit-button").disabled = true;
    }
});

    // Initialiser
    checkAccessFromMenu();
    displayHighScores();
    updateCurrentScoreDisplay();