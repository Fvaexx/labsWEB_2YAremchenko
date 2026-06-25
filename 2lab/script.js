// --- Завдання 1: Визначення ширини зображення ---
const galleryImages = document.querySelectorAll('.task-img');
const outputBox1 = document.getElementById('out-1');

galleryImages.forEach(img => {
    img.addEventListener('click', (event) => {
        const width = event.target.offsetWidth;
        outputBox1.innerText = `Ширина обраної картинки: ${width} px`;
        console.log(`Ширина обраної картинки: ${width} px`);
    });
});

// --- Завдання 2: Додавання title до посилань (сучасний метод {once: true}) ---
const links = document.querySelectorAll('.task-link');
const outputBox2 = document.getElementById('out-2');

links.forEach(link => {
    link.addEventListener('mouseenter', (event) => {
        const targetLink = event.target;
        targetLink.title = targetLink.href;
        
        const message = `Атрибут title додано для: ${targetLink.href}`;
        console.log(message);
        outputBox2.innerText = message;
    }, { once: true }); // Цей параметр автоматично видаляє слухач після першого спрацьовування!
});

// --- Завдання 3: Читання значення з інпуту при кліку ---
const inputsT3 = document.querySelectorAll('.input-t3');
const outputBox3 = document.getElementById('out-3');

inputsT3.forEach(input => {
    input.addEventListener('click', (event) => {
        const text = event.target.value.trim();
        if (!text) {
            outputBox3.innerText = "Поле порожнє! Спочатку напишіть щось.";
            outputBox3.style.color = "#ff5555";
        } else {
            outputBox3.innerText = `Ви ввели: ${text}`;
            outputBox3.style.color = "#50fa7b";
        }
    });
});

// --- Завдання 4: Різна поведінка для 1-го і 2-го кліку ---
const inputsT4 = document.querySelectorAll('.input-t4');
const outputBox4 = document.getElementById('out-4');

function handleFirstInteraction(event) {
    const el = event.target;
    const text = el.value.trim();

    if (!text) {
        outputBox4.innerText = "Спочатку введіть текст у поле!";
        return;
    }

    outputBox4.innerText = "";
    console.log("Перше натискання. Значення: " + text);
    
    // Видаляємо поточний слухач і додаємо новий
    el.removeEventListener('click', handleFirstInteraction);
    el.addEventListener('click', handleSecondInteraction);
}

function handleSecondInteraction(event) {
    const text = event.target.value.trim();
    if (!text) return;
    
    alert(`Наступне натискання! Поточне значення: ${text}`);
}

inputsT4.forEach(input => {
    input.addEventListener('click', handleFirstInteraction);
});

// --- Завдання 5: Перетворення тексту на числа (Покращений алгоритм) ---
function textToNumberUA(text) {
    // Якщо це вже звичайне число
    const directNum = parseFloat(text);
    if (!isNaN(directNum)) return directNum;

    const words = text.toLowerCase().replace(/[^а-яіїє'0-9\s]/g, "").split(/\s+/);
    
    const dictionary = {
        'нуль': 0, 'один': 1, 'одна': 1, 'два': 2, 'дві': 2, 'три': 3, 'чотири': 4,
        'п\'ять': 5, 'шість': 6, 'сім': 7, 'вісім': 8, 'дев\'ять': 9, 'десять': 10,
        'одинадцять': 11, 'дванадцять': 12, 'тринадцять': 13, 'чотирнадцять': 14,
        'п\'ятнадцять': 15, 'шістнадцять': 16, 'сімнадцять': 17, 'вісімнадцять': 18,
        'дев\'ятнадцять': 19, 'двадцять': 20, 'тридцять': 30, 'сорок': 40, 'п\'ятдесят': 50,
        'шістдесят': 60, 'сімдесят': 70, 'вісімдесят': 80, 'дев\'яносто': 90,
        'сто': 100, 'двісті': 200, 'триста': 300, 'чотириста': 400, 'п\'ятсот': 500,
        'шістсот': 600, 'сімсот': 700, 'вісімсот': 800, 'дев\'ятсот': 900
    };

    const multipliers = {
        'тисяча': 1000, 'тисячі': 1000, 'тисяч': 1000,
        'мільйон': 1000000, 'мільйона': 1000000, 'мільйонів': 1000000
    };

    let total = 0;
    let temp = 0;

    for (let word of words) {
        if (dictionary[word] !== undefined) {
            temp += dictionary[word];
        } else if (multipliers[word] !== undefined) {
            total += (temp === 0 ? 1 : temp) * multipliers[word];
            temp = 0;
        }
    }
    
    return total + temp;
}

document.querySelectorAll('.num-text').forEach(item => {
    item.addEventListener('click', (event) => {
        const p = event.target;
        const number = textToNumberUA(p.innerText);
        
        if (number > 0 || p.innerText.includes('нуль')) {
            const square = number ** 2; // Підносимо до квадрату
            p.innerText = `${number} (Квадрат: ${square})`;
            console.log(`Число: ${number}, Квадрат: ${square}`);
        } else {
            console.warn("Не вдалося розпізнати число");
        }
    });
});

// --- Завдання 6: Чергування кольорів кубиків ---
function makeRed(event) {
    const box = event.target;
    box.style.backgroundColor = '#ff5555'; // Червоний
    box.removeEventListener('click', makeRed);
    box.addEventListener('click', makeGreen);
}

function makeGreen(event) {
    const box = event.target;
    box.style.backgroundColor = '#50fa7b'; // Зелений
    box.removeEventListener('click', makeGreen);
    box.addEventListener('click', makeRed);
}

document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('click', makeRed);
});