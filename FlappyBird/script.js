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