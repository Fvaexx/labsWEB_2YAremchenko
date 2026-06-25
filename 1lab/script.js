// Завдання 1: Прості числа (while)
document.getElementById('btn-task-1').addEventListener('click', () => {
    let currentNumber = 2; // 0 і 1 не є простими числами
    let primesArray = [];

    while (currentNumber <= 100) {
        let isPrime = true;
        let divider = 2;

        while (divider * divider <= currentNumber) {
            if (currentNumber % divider === 0) {
                isPrime = false;
                break;
            }
            divider++;
        }

        if (isPrime) {
            primesArray.push(currentNumber);
        }
        currentNumber++;
    }

    document.getElementById('out-1').innerText = primesArray.join(', ');
});

// Завдання 2: Парні/непарні (do...while)
document.getElementById('btn-task-2').addEventListener('click', () => {
    let num = 0;
    let resultText = "";

    do {
        if (num === 0) {
            resultText += `${num} - це нуль\n`;
        } else if (num % 2 === 0) {
            resultText += `${num} - парне число\n`;
        } else {
            resultText += `${num} - непарне число\n`;
        }
        num++;
    } while (num <= 10);

    document.getElementById('out-2').innerText = resultText;
});

// Завдання 3: Ділення числа
document.getElementById('btn-task-3').addEventListener('click', () => {
    let result = 10000;
    let counter = 0;

    while (result >= 50) {
        result /= 2;
        counter++;
    }

    console.log("=== Завдання 3 ===");
    console.log("Остаточний результат (result):", result);
    console.log("Кількість ітерацій (counter):", counter);

    document.getElementById('out-3').innerText = `Готово! Дані виведено в консоль (F12).\nОстанній результат: ${result}\nКількість ітерацій: ${counter}`;
});

// Завдання 4: Пори року та назва місяця
document.getElementById('btn-task-4').addEventListener('click', () => {
    const userInput = prompt("Введіть число від 1 до 12 для визначення місяця:");
    const monthIndex = parseInt(userInput, 10);

    if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
        alert("Помилка: потрібно ввести числове значення від 1 до 12.");
        return;
    }

    const monthNames = [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", 
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
    ];

    const currentMonth = monthNames[monthIndex - 1];
    let season = "";

    if (monthIndex === 12 || monthIndex <= 2) {
        season = "Зима";
    } else if (monthIndex >= 3 && monthIndex <= 5) {
        season = "Весна";
    } else if (monthIndex >= 6 && monthIndex <= 8) {
        season = "Літо";
    } else {
        season = "Осінь";
    }

    alert(`Назва місяця: ${currentMonth}\nПора року: ${season}`);
});

// Завдання 5: Цельсій у Фаренгейт
document.getElementById('btn-task-5').addEventListener('click', () => {
    const celsiusInput = prompt("Введіть температуру в градусах Цельсія (Tc):");
    const tempCelsius = parseFloat(celsiusInput);

    if (isNaN(tempCelsius)) {
        alert("Помилка: некоректне значення температури.");
        return;
    }

    const tempFahrenheit = (9 / 5) * tempCelsius + 32;
    alert(`Температура: ${tempCelsius}°C = ${tempFahrenheit.toFixed(2)}°F`);
});

// Завдання 6: Дні тижня
document.getElementById('btn-task-6').addEventListener('click', () => {
    const dayInput = prompt("Введіть число від 1 до 7:");
    const dayNumber = parseInt(dayInput, 10);
    const outputBox = document.getElementById('out-6');

    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 7) {
        outputBox.innerText = "Увага: введіть коректне число від 1 до 7!";
        outputBox.style.color = "#ff5555"; // Червоний колір для помилки
        return;
    }

    outputBox.style.color = "#50fa7b"; // Повернення зеленого кольору

    const daysOfWeek = [
        "Понеділок", "Вівторок", "Середа", 
        "Четвер", "П'ятниця", "Субота", "Неділя"
    ];

    outputBox.innerText = `Ви обрали: ${daysOfWeek[dayNumber - 1]}`;
});