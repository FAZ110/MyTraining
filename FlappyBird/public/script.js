class LeaderboardDatabase {
    constructor(apiUrl = '/api'){
        this.apiUrl = apiUrl;
        this.testConnection();
    }

    async testConnection() {
        try{
            const response = await fetch (`${this.apiUrl}/health`);
            console.log('Database connection: ', response.ok? 'OK': 'Failed');
        }catch (error){
            console.error('Database connection failed: ' + error);
        }
    }

    async getTopScores(limit = 10){
        try {
            const response = await fetch(`${this.apiUrl}/leaderboard?limit=${limit}`);
            if (!response.ok) throw new Error('Failed to fetch scores');
            const data = await response.json();
            return data.scores || [];
        } catch (error) {
            console.error('Error fetching scores:', error);
            return [];
        }
    }

    async saveScore(name, score) {
        try {
            const response = await fetch(`${this.apiUrl}/leaderboard`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), score })
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error('Error saving score:', error);
            throw error;
        }
    }
}

const db = new LeaderboardDatabase('http://localhost:3000/api');



const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const scoreElement = document.getElementById('score')
const gameOverElement = document.getElementById('gameOver')
const finalScoreElement = document.getElementById('finalScore')
const saveScorebtn = document.getElementById('saveScore')

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
    showGameOver(score);
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





// === LEADERBOARD FUNCTIONS ===
async function updateLeaderboard() {
    try {
        const scores = await db.getTopScores(10);
        const leaderboardList = document.getElementById('leaderboardList');
        
        if (scores.length === 0) {
            leaderboardList.innerHTML = '<div>No scores yet!</div>';
            return;
        }
        
        leaderboardList.innerHTML = scores.map((entry, index) => `
            <div style="display: flex; justify-content: space-between; padding: 5px; border-bottom: 1px solid #eee;">
                <span>#${index + 1} ${entry.name}</span>
                <span>${entry.score}</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        document.getElementById('leaderboardList').innerHTML = '<div>Error loading scores</div>';
    }
}

async function savePlayerScore() {
    const name = document.getElementById('playerName').value.trim();
    const score = parseInt(document.getElementById('finalScore').textContent);
    
    if (!name) {
        alert('Please enter your name!');
        return;
    }
    
    try {
        await db.saveScore(name, score);
        await updateLeaderboard(); // Refresh leaderboard
        document.getElementById('gameOver').style.display = 'none';
        document.getElementById('playerName').value = '';
        alert('Score saved successfully!');
    } catch (error) {
        alert('Error saving score: ' + error.message);
    }
}

// Call this when your game ends
function showGameOver(finalScore) {
    document.getElementById('finalScore').textContent = finalScore;
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('playerName').focus();
}

saveScorebtn.addEventListener('click', () => {
    savePlayerScore();
})

// Initialize leaderboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();
});

gameLoop();