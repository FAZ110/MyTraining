const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const scoreElement = document.getElementById('score')
const gameOverElement = document.getElementById('gameOver')
const finalScoreElement = document.getElementById('finalScore')

let gameState = 'playing';
let score = 0;
let frameCount = 0;

const bird = {
    x: 80,
    y: canvas.height / 2,
    width: 25,
    height: 25,
    velocity: 0,
    jumpPower: -8,
    gravity: 0.5,
    color: '#FFD700'
}

const pipes = [];
const pipeWidth = 60;
const pipeGap = 180;
const pipeSpeed = 2;

const createPipe = () => {
    const minHeight = 50;
    const maxHeight = canvas.height - pipeGap - minHeight;
    const topHeight = Math.random() * (maxHeight-minHeight) + minHeight;

    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomY: topHeight + pipeGap,
        bottomHeight: canvas.height - (topHeight + pipeGap),
        passed: false
    });
}

const drawBird = () => {
    ctx.fillStyle = bird.color;
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Oko ptaka
    ctx.fillStyle = 'white';
    ctx.fillRect(bird.x + 5, bird.y + 5, 8, 8);
    ctx.fillStyle = 'black';
    ctx.fillRect(bird.x + 7, bird.y + 7, 4, 4);
    
    // Dziób
    ctx.fillStyle = '#FF8C00';
    ctx.fillRect(bird.x + bird.width, bird.y + 10, 8, 5);
}


const drawPipes = () => {
    ctx.fillStyle = '#228B22';

    pipes.forEach(pipe => {
        // Górna rura
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        // Dolna rura
        ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, pipe.bottomHeight);
        
        // Końcówki rur
        ctx.fillStyle = '#32CD32';
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipeWidth + 10, 20);
        ctx.fillRect(pipe.x - 5, pipe.bottomY, pipeWidth + 10, 20);
        ctx.fillStyle = '#228B22';
    });
}

const drawBackground = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Chmury
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(100, 80, 25, 0, Math.PI * 2);
    ctx.arc(120, 75, 35, 0, Math.PI * 2);
    ctx.arc(140, 80, 25, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(300, 120, 20, 0, Math.PI * 2);
    ctx.arc(315, 115, 30, 0, Math.PI * 2);
    ctx.arc(330, 120, 20, 0, Math.PI * 2);
    ctx.fill();
}

const updateBird = () => {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if(bird.y + bird.height > canvas.height || bird.y < 0){
        gameOver();
    }
}


const updatePipes = () => {
    if(frameCount % 120 === 0){
        createPipe();
    }

    pipes.forEach((pipe, index) => {
        pipe.x -= pipeSpeed;

        if(!pipe.passed && pipe.x + pipeWidth < bird.x){
            pipe.passed = true;
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }

        if(pipe.x + pipeWidth < 0){
            pipes.splice(index, 1);
        }  

        if (
            bird.x + bird.width > pipe.x &&
            bird.x < pipe.x + pipeWidth &&  
            (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY)
            ) {
            // console.log('Collision detected!');
            // console.log(pipe.topHeight, pipe.bottomY)
            gameOver();
            }
    });
}
 
const jump = () => {
    if(gameState === 'playing'){
        bird.velocity = bird.jumpPower;
    }else if(gameState === 'gameOver'){
        resetGame();
    }
}

const gameOver = () => {
    gameState = 'gameOver';
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
}

const resetGame = () => {
    gameState = 'playing';
    score = 0;
    frameCount = 0;
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes.length = 0;
    scoreElement.textContent = `Score: ${score}`;
    gameOverElement.style.display = 'none';
}

const gameLoop = () => {
    if(gameState === 'playing'){
        drawBackground();
        updateBird();
        updatePipes();
        drawPipes();
        drawBird();
        frameCount++;
    }

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', jump);

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space' && e.target === document.body){
        e.preventDefault();
        jump();
    }
});

gameLoop();