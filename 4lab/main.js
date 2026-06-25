function seconds(total) {
    return total % 60;
}

function perimeter(side, count) {
    return side * count;
}

function FizzBuzz(n) {
    let output = "";
    if (n % 3 === 0) output += "Fizz";
    if (n % 5 === 0) output += "Buzz";
    return output || n; // Повертає тільки одне значення
}

function Calculate(first, second, third) {
    return (first + second + third) / 3;
}

function isDivisibleIf(n, x, y) {
    if (n % x === 0 && n % y === 0) {
        return true;
    }
    else {
        return false;
    }
}

function isDivisibleTernary(n, x, y) {
    return (n % x === 0 && n % y === 0) ? true : false;
}

function isDivisibleShort(n, x, y) {
    return n % x === 0 && n % y === 0;
}

function processArray(N) {
    let arr = [];
    for (let i = 0; i < N; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }

    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let sum = arr.reduce((a, b) => a + b, 0);
    let mean = sum / arr.length;
    let odds = arr.filter(num => num % 2 !== 0);

    return { max, min, sum, mean, odds, original: arr };
}

function processMatrix() {
    let matrix = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push(Math.floor(Math.random() * 21) - 10);
        }
        matrix.push(row);
    }

    for (let i = 0; i < 5; i++) {
        if (matrix[i][i] < 0) {
            matrix[i][i] = 0;
        }
        else if (matrix[i][i] > 0) {
            matrix[i][i] = 1;
        }
    }
    return matrix;
}

function Add(a, b) { return a + b; }
function Sub(a, b) { return a - b; }
function Mul(a, b) { return a * b; }
function Div(a, b) {
    if (b === 0) return "Помилка! Ділення на нуль";
    return a / b;
}

function isPrime(num) {
    num = Math.abs(num);
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function analyzeNumber(n) {
    let sign = n > 0 ? "Позитивне" : n < 0 ? "Негативне" : "Нуль";
    let prime = isPrime(n) ? "Просте" : "Не є простим";
    let divisors = [2, 5, 3, 6, 9].filter(d => n % d === 0);

    return { sign, prime, divisors };
}

function transformArray(arr) {
    let reversed = [...arr].reverse();
    return reversed.map(item => {
        let num = Number(item);
        return (!isNaN(num) && typeof item !== 'boolean' && item !== "" && item !== null) ? num * num : item;
    });
}

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

//Show functions
function showSeconds() {
    let val = document.getElementById('seconds-input').value;
    let result = seconds(Number(val));
    document.getElementById('res-1').innerText = "Остача від ділення " + val + " на 60 дорівнює " + result;
}

function showPerimeter() {
    let side = document.getElementById('side-input').value;
    let count = document.getElementById('count-side-input').value;
    let p = perimeter(Number(side), Number(count));
    document.getElementById('res-2').innerText = "Периметр " + p;
}

function showFizzBuzz() {
    let n = document.getElementById('n-input').value;
    let resultString = FizzBuzz(Number(n));
    document.getElementById('res-3').innerText = "Результат: " + resultString;
}

function showMean() {
    let first = document.getElementById('first-input').value;
    let second = document.getElementById('second-input').value;
    let third = document.getElementById('third-input').value;
    let mean = Calculate(Number(first), Number(second), Number(third));
    document.getElementById('res-4').innerText = "Середнє арифметичне трьох чисел " + mean.toFixed(2);
}

function showDivisible() {
    let n = document.getElementById('n-5').value;
    let x = document.getElementById('x-5').value;
    let y = document.getElementById('y-5').value;
    let result = isDivisibleShort(Number(n), Number(x), Number(y));
    document.getElementById('res-5').innerText = "Результат " + result;
}

function showArrayResults() {
    let N = document.getElementById('n-6').value;
    let data = processArray(Number(N));

    document.getElementById('res-6').innerText =
        "Масив " + data.original.join(", ") + "\n" +
        "Max " + data.max + ", Min " + data.min + "\n" +
        "Сума " + data.sum + ", Середнє " + data.mean.toFixed(2) + "\n" +
        "Непарні " + data.odds.join(", ");
}

function showMatrixResults() {
    let matrix = processMatrix();
    let displayStr = matrix.map(row => row.join("\t")).join("\n");
    document.getElementById('res-7').innerText = displayStr;
}

function showCalc() {
    let a = Number(document.getElementById('num1-8').value);
    let b = Number(document.getElementById('num2-8').value);
    let op = document.getElementById('op-8').value;
    let result;

    if (op === "add") result = Add(a, b);
    else if (op === "sub") result = Sub(a, b);
    else if (op === "mul") result = Mul(a, b);
    else if (op === "div") result = Div(a, b);

    document.getElementById('res-8').innerText = "Результат " + result;
}

function showNumberAnalysis() {
    let n = Number(document.getElementById('n-9').value);
    let data = analyzeNumber(n);

    document.getElementById('res-9').innerText =
        "Знак " + data.sign + "\n" +
        "Тип " + data.prime + "\n" +
        "Ділиться без залишку на " + (data.divisors.length ? data.divisors.join(", ") : "нічого з переліку");
}

function showArrayTransform() {
    let input = document.getElementById('arr-10').value;
    let initialArray = input.split(',').map(item => item.trim());
    let result = transformArray(initialArray);
    document.getElementById('res-10').innerText = "Результат [" + result.join(", ") + "]";
}

function showUniqueResults() {
    let input = document.getElementById('arr-11').value;
    let initialArray = input.split(',').map(item => item.trim());
    initialArray = initialArray.filter(item => item !== "");
    let uniqueArray = removeDuplicates(initialArray);
    document.getElementById('res-11').innerText = "Унікальний масив [" + uniqueArray.join(", ") + "]";
}