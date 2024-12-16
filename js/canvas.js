// canvas.js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render(0); // Correction : passer 0 comme valeur par défaut pour delta
}

// Redimensionner au chargement de la page
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

canvas.style.border = "1px solid black";
document.body.appendChild(canvas);
