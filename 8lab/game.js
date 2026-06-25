let currentNum = 1;
let timeLeft = 60;
let timerId = null;
let gameActive = false;
let gameResults = [];

function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#6a0572', '#a8e6cf', '#ff8b94'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomFontSize() {
    const sizes = ['16px', '22px', '28px', '34px', '40px'];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

function initGame() {
    clearInterval(timerId);
    currentNum = 1;
    timeLeft = 60;
    gameActive = true;
    $('#timer').text(timeLeft);
    $('#status-msg').text('Find: 1');

    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);

    const grid = $('#game-grid').empty();
    numbers.forEach(num => {
        const cell = $('<div class="cell"></div>')
            .text(num)
            .css({
                'color': getRandomColor(),
                'font-size': getRandomFontSize()
            })
            .click(function () {
                handleCellClick(num, $(this));
            });
        grid.append(cell);
    });

    startTimer();
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        $('#timer').text(timeLeft);
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function handleCellClick(num, element) {
    if (!gameActive || element.hasClass('selected')) return;

    if (num === currentNum) {
        element.addClass('selected');
        currentNum++;
        if (currentNum > 20) {
            endGame(true);
        } else {
            $('#status-msg').text(`Find: ${currentNum}`);
        }
    } else {
        alert("Wrong digit");
    }
}

function endGame(isWin) {
    gameActive = false;
    clearInterval(timerId);

    if (isWin) {
        const timeTaken = 60 - timeLeft;
        alert(`Congrats! You win the game for ${timeTaken} seconds.`);
        gameResults.push(timeTaken);
        updateStats();
    } else {
        alert("Time's out!");
    }
    initGame();
}

function updateStats() {
    const tbody = $('#stats-body').empty();
    const bestResult = Math.min(...gameResults);

    gameResults.forEach((res, index) => {
        const row = $('<tr></tr>');
        if (res === bestResult) row.addClass('best-result');
        row.append(`<td>Game ${index + 1}</td><td>${res} seconds</td>`);
        tbody.append(row);
    });
}

$(document).ready(initGame);