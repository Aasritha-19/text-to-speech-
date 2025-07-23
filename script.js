
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');
const modeDisplay = document.getElementById('mode');


let workTime = 25 * 60; 
let breakTime = 5 * 60; 
let timeLeft = workTime;
let timerInterval;
let isRunning = false;
let isPaused = false;
let isWorkTime = true;


function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


function startTimer() {
    if (!isRunning && !isPaused) {
        isRunning = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
               
                clearInterval(timerInterval);
                isRunning = false;
                
                if (isWorkTime) {
                  
                    isWorkTime = false;
                    timeLeft = breakTime;
                    modeDisplay.textContent = 'Break Time!';
                } else {
                   
                    isWorkTime = true;
                    timeLeft = workTime;
                    modeDisplay.textContent = 'Work Time';
                }
                
                updateDisplay();
                startBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
                resumeBtn.style.display = 'none';
            }
        }, 1000);
    }
}


function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = true;
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'inline-block';
    }
}


function resumeTimer() {
    if (!isRunning && isPaused) {
        isRunning = true;
        isPaused = false;
        resumeBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                
                clearInterval(timerInterval);
                isRunning = false;
                
                if (isWorkTime) {
                   
                    isWorkTime = false;
                    timeLeft = breakTime;
                    modeDisplay.textContent = 'Break Time!';
                } else {
                  
                    isWorkTime = true;
                    timeLeft = workTime;
                    modeDisplay.textContent = 'Work Time';
                }
                
                updateDisplay();
                startBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
                resumeBtn.style.display = 'none';
            }
        }, 1000);
    }
}


function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    isWorkTime = true;
    timeLeft = workTime;
    modeDisplay.textContent = 'Work Time';
    updateDisplay();
    
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
}


startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer);
resetBtn.addEventListener('click', resetTimer);


updateDisplay();