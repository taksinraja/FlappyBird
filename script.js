const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let birdTop = 200;
let gravity = 2;
let isGameOver = false;
let score = 0;

function startGame() {
    // Bird falls due to gravity
    const gameInterval = setInterval(() => {
        if (!isGameOver) {
            birdTop += gravity;
            bird.style.top = birdTop + "px";

            // Check if bird hits the bottom or top
            if (birdTop > gameContainer.offsetHeight - bird.offsetHeight || birdTop < 0) {
                gameOver(gameInterval);
            }
        }
    }, 20);

    // Pipes generation
    const pipeInterval = setInterval(() => {
        if (!isGameOver) {
            generatePipes(pipeInterval);
        }
    }, 1500);
}

// Generate pipes
function generatePipes(pipeInterval) {
    const pipeGap = 150;
    const randomPipeHeight = Math.floor(Math.random() * 200) + 50;

    const topPipe = document.createElement("div");
    topPipe.classList.add("pipe");
    topPipe.style.height = randomPipeHeight + "px";
    topPipe.style.left = "400px";

    const bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe");
    bottomPipe.style.height = 600 - randomPipeHeight - pipeGap + "px";
    bottomPipe.style.top = randomPipeHeight + pipeGap + "px";
    bottomPipe.style.left = "400px";

    gameContainer.appendChild(topPipe);
    gameContainer.appendChild(bottomPipe);

    const movePipeInterval = setInterval(() => {
        if (!isGameOver) {
            const pipePosition = parseInt(topPipe.style.left);
            topPipe.style.left = (pipePosition - 2) + "px";
            bottomPipe.style.left = (pipePosition - 2) + "px";

            // Check for collision
            if (pipePosition < 100 && pipePosition > 50) {
                if (birdTop < randomPipeHeight || birdTop > randomPipeHeight + pipeGap) {
                    gameOver(pipeInterval, movePipeInterval);
                }
            }

            // Remove pipes that are off the screen
            if (pipePosition < -50) {
                clearInterval(movePipeInterval);
                topPipe.remove();
                bottomPipe.remove();
                score++;
                scoreDisplay.textContent = "Score: " + score;
            }
        }
    }, 20);
}

// Jump function
function jump() {
    if (!isGameOver) {
        birdTop -= 50;
        if (birdTop < 0) birdTop = 0;
        bird.style.top = birdTop + "px";
        // smooth animation
        
    }
}

function gameOver(gameInterval) {
    isGameOver = true;
    clearInterval(gameInterval);
    
    // Game Over Screen
    const gameOverScreen = document.createElement("div");
    gameOverScreen.id = "game-over";
    gameOverScreen.innerHTML = `
        <h1>Game Over!</h1>
        <p>Final Score: ${score}</p>
        <button id="restart-btn">Restart</button>
    `;
    document.body.appendChild(gameOverScreen);

    // Restart button functionality
    document.getElementById("restart-btn").addEventListener("click", () => {
        location.reload(); // Reload the game
    });
}



// Add event listeners for both desktop and mobile
document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump); // Mobile support

// Start the game
startGame();