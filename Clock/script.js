function updateClock(){
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('clockDisplay').textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);
// Initial call to avoid delay
updateClock();


// Stopwatch variables
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

let stopwatchInterval;
let stopwatchTime = 0;
let isRunning = false;

function formatTime(time){
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600)/60)
    const seconds = time % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

}

startBtn.addEventListener('click', () => {
    if(isRunning){
        return;
    }
    isRunning = true;
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        stopwatchDisplay.textContent = formatTime(stopwatchTime);
    }, 1000);
    
})

stopBtn.addEventListener('click', () => {
    if(!isRunning){
        return;
    }
    isRunning = false;
    clearInterval(stopwatchInterval);
})

resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchDisplay.textContent = '00:00:00';
})


