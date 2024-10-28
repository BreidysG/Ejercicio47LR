let timerInterval;
let speed = 300;
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const speedInput = document.getElementById("speed");
let totalTime = 180; // 3 minutos en segundos
let isRunning = false; // Variable para controlar el estado del ejercicio
let highlightInterval;

function startTimer() {
    clearInterval(timerInterval);
    let timeLeft = totalTime;

    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerDisplay.innerText = `Tiempo: ${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.innerText = "Tiempo: 0:00";
            stopExercise();
            alert("El ejercicio ha finalizado.") // Detener el ejercicio cuando el tiempo se acabe
        }

        timeLeft--;
    }, 1000);
}

function startExercise() {
    if (!isRunning) {
        speed = parseInt(speedInput.value);
        document.getElementById("text-container").classList.remove("hidden");
        document.getElementById("column-left").classList.remove("hidden");
        document.getElementById("column-right").classList.remove("hidden");
        document.getElementById("line1").classList.remove("hidden");
        document.getElementById("line2").classList.remove("hidden");
        document.getElementById("line3").classList.remove("hidden");
        document.getElementById("line4").classList.remove("hidden");
        document.getElementById("timer").classList.remove("hidden");
        document.getElementById("info").classList.add("hidden");
        startTimer();
        document.getElementById("controles").classList.add("hidden");
        startTimer();
        isRunning = true;

        const linesLeft = document.querySelectorAll('.left-column p');
        const linesRight = document.querySelectorAll('.right-column p');

        // Añadimos la animación a cada línea
        animateLines(linesLeft, linesRight);
    }
}

function stopExercise() {
    clearInterval(highlightInterval); // Detener el subrayado
    isRunning = false; // Cambiar el estado para poder reiniciar después
    
}

function animateLines(linesLeft, linesRight) {
    let currentLine = 0;

    function highlightLine() {
        // Remover el resaltado previo sin mover el texto
        linesLeft.forEach(line => line.classList.remove('highlight'));
        linesRight.forEach(line => line.classList.remove('highlight'));

        // Resaltar la línea actual
        if (currentLine < linesLeft.length) {
            linesLeft[currentLine].classList.add('highlight');
        } else if (currentLine - linesLeft.length < linesRight.length) {
            linesRight[currentLine - linesLeft.length].classList.add('highlight');
        }

        currentLine++;

        // Reiniciar si llega al final
        if (currentLine >= linesLeft.length + linesRight.length) {
            currentLine = 0;
        }

        // Ajustar la velocidad del resaltado
        highlightInterval = setTimeout(highlightLine, speed);
    }

    highlightLine();
}

startBtn.addEventListener("click", startExercise);
