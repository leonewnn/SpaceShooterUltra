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
  render(delta); // Appel de render pour redessiner après le redimensionnement
}

// Redimensionner au chargement de la page
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

canvas.style.border = "1px solid black";
document.body.appendChild(canvas);
