// buttons.js
let buttonPlay = {
    width: 200,
    y: 250,
    height: 60,
    color: "#27a448",
    radius: 20,
    label: "PLAY",
    onClick: function() {
        console.log("Click playbtn");
        gameState = 'playScreen';
    }
};

let buttonScoreBoard = {
    width: 300,
    y: 350,
    height: 60,
    color: '#f68d14',
    radius: 20,
    label: "SCOREBOARD",
    onClick: function() {
        console.log("Click scoreboardbtn");
    }
};

let buttons = [buttonPlay, buttonScoreBoard];

function drawButton(btn) {
    ctx.beginPath();
    ctx.roundRect(btn.x, btn.y, btn.width, btn.height, btn.radius);
    ctx.fillStyle = btn.color;
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "24px 'SpaceMan'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(btn.label, btn.x + btn.width / 2, btn.y + btn.height / 2);
}

function renderButtons() {
    buttons.forEach(button => {
        button.x = (canvas.width - button.width) / 2;
        drawButton(button);
    });
}

canvas.addEventListener('click', function(event) {
    let clickX = event.offsetX;
    let clickY = event.offsetY;

    buttons.forEach(button => {
        if (
            clickX >= button.x &&
            clickX <= button.x + button.width &&
            clickY >= button.y &&
            clickY <= button.y + button.height
        ) {
            button.onClick();
        }
    });
});
