async function calculateSquare() {
    const inputElement = document.getElementById('numberInput');
    const resultElement = document.getElementById('result');
    const numberValue = inputElement.value;

    // Валідація на стороні клієнта
    if (numberValue === "") {
        resultElement.innerHTML = `<span class="error">Будь ласка, введіть число!</span>`;
        return;
    }

    // Показуємо стан завантаження
    resultElement.innerText = "Відправка запиту на сервер...";

    try {
        // Робимо POST-запит на наш локальний сервер
        const response = await fetch('http://localhost:3000/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number: Number(numberValue) })
        });

        const data = await response.json();

        // Обробка відповіді сервера
        if (response.ok) {
            resultElement.innerHTML = `Результат: <span class="highlight">${data.square}</span>`;
        } else {
            resultElement.innerHTML = `<span class="error">Помилка: ${data.error}</span>`;
        }
    } catch (error) {
        // Якщо сервер вимкнено або сталася мережева помилка
        resultElement.innerHTML = `<span class="error">Помилка з'єднання з сервером! Переконайтеся, що server.js запущено.</span>`;
        console.error("AJAX Error:", error);
    }
}

// Додаємо можливість відправляти запит клавішею Enter
document.getElementById('numberInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateSquare();
    }
});