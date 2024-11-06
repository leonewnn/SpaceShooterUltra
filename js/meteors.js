// meteors.js
let meteors = [];
let meteorites = [];
let meteorSpawnInterval;
let meteorSpawnFrequency = 1500;

for (let i = 1; i <= 10; i++) {
    let img = new Image();
    img.src = `images/meteors/Meteor_${i.toString().padStart(2, '0')}.png`;
    meteors.push(img);
}

function startMeteorSpawning() {
    if (!meteorSpawnInterval) {
        meteorSpawnInterval = setInterval(spawnMeteor, meteorSpawnFrequency);
    }
}

function spawnMeteor() {
    let randomMeteorImage = meteors[Math.floor(Math.random() * meteors.length)];
    let meteor = {
        x: Math.random() * canvas.width,
        y: -50,
        img: randomMeteorImage
    };
    meteorites.push(meteor);
}

function drawMeteors() {
    for (let i = 0; i < meteorites.length; i++) {
        let meteor = meteorites[i];
        ctx.drawImage(meteor.img, meteor.x, meteor.y, 100, 100);
        meteor.y += 2;

        if (meteor.y > canvas.height) {
            meteorites.splice(i, 1);
            i--;
        }
    }
}
