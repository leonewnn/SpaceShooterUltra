// game.js
let gameState = 'titleScreen';

// game.js
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameState === 'titleScreen') {
        renderTitleScreen();
    } else if (gameState === 'playScreen') {
        renderPlayScreen(); 
    }
}

function main() {
    render();
    requestAnimationFrame(main);
}

main();
