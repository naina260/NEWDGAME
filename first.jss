const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 300, y: 250, width: 20, height: 20, velocity: 0 };
let gravity = 0.4;
let speed = -12;
let pipes = [];
let pipeGap = 200;
let pipeWidth = 60;
let gameOver = false;

// Bird movement
document.addEventListener("keydown",(event) => {
   // if(event.key===" ")
    //player.velocity = speed;
   
    if(event.key==="ArrowUp")
        player.velocity = speed;

    if(event.key==="ArrowDown")
        player.velocity = -speed;
}
);

// Pipe creation
function generatePipes() {
    let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 20;
    pipes.push({ x: canvas.width, y: pipeY, passed: false });
}

// Game loop
function updateGame() {
    if (gameOver) return;

 
    player.y += player.velocity;

    if (player.y + player.height > canvas.height || player.y < 0) {
        gameOver = true;
    }

    pipes.forEach(pipe => {
        pipe.x -= 5;
        
        if (pipe.x + pipeWidth < 0) {
            pipes.shift();
        }

        if (!pipe.passed && pipe.x + pipeWidth < player.x) {
            pipe.passed = true;
        }

        if (
            player.x < pipe.x + pipeWidth && player.x + player.width > pipe.x &&
            (player.y < pipe.y || player.y + player.height > pipe.y + pipeGap)
        ) {
            gameOver = true;
        }
    });

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 350) {
        generatePipes();
    }

    drawGame();
}

// Draw game elements
function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    context.fillStyle = "brown";
    pipes.forEach(pipe => {
        context.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        context.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);
    });

    if (gameOver) {
        context.fillStyle = "green";
        context.font = "100px Arial";
        context.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
    }
}

setInterval(updateGame, 20);
