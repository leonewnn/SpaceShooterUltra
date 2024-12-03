// effects.js
let spaceParticles = [];

function createSpaceParticles() {
  if (spaceParticles.length < 10 && Math.random() < 0.1) {
    spaceParticles.push({
      x: Math.random() * canvas.width,
      y: -5,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 200 + 100,
    });
  }
}

function drawSpaceParticles(delta) {
  createSpaceParticles();

  for (let i = spaceParticles.length - 1; i >= 0; i--) {
    const particle = spaceParticles[i];

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255,0.7)`;
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    particle.y += particle.speed * delta;

    if (particle.y > canvas.height) {
      spaceParticles.splice(i, 1);
    }
  }
}
