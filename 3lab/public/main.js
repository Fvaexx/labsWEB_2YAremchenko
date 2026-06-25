const main = document.body;
const styleSheet = document.createElement("style");
let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetScreen = false;
styleSheet.textContent = `
    :root {
        --bg-color: #1c1c1c;
        --operation-color: #ff9500;
        --nums-color: #505050;
        --special-color: #d4d4d2;
    }

    html, body {
        margin: 0;
        padding: 0;
    }

    button {
        border: none;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        font-weight: 500;
        transition: opacity 0.2s, background-color 0.2s;
    }

    button:active {
        opacity: 0.7;
    }

    .container {
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        padding: 30px;
        max-width: 500px;
        margin: 0 auto;
        align-content: center;
        box-sizing: border-box;
        background-color: var(--bg-color);
    }

    .display {
        grid-column: 1 / -1;
        background-color: transparent;
        border: none;
        color: white;
        text-align: right;
        font-size: 3rem;
        padding: 10px 0;
        outline: none;
        font-family: sans-serif;
        font-weight: 200;
        width: 100%;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        .container {
            max-width: 100%;
            height: 100vh;
            gap: 15px;
            padding: 20px;
            align-content: end;
            padding-bottom: 60px;
        }
        button {
            font-size: 2.2rem;
        }
        .display {
            font-size: 5.5rem;
            padding: 20px;
        }
    }
    
    @media (max-width: 468px) {
        .container {
            max-width: 100%;
            height: 100vh;
            gap: 12px;
            padding: 20px;
            align-content: end;
        }
        button {
            font-size: 2.2rem;
        }
        .display {
            font-size: 5.5rem;
            padding: 20px;
        }
    }

    button:nth-child(18) {
        grid-column: span 2;
        border-radius: 50px;
        aspect-ratio: auto;
    }

    .num-buttons {
        background-color: var(--nums-color);
        color: var(--special-color);
    }

    .operation-buttons {
        background-color: var(--operation-color);
        color: var(--special-color);
    }

    .special-buttons {
        background-color: var(--special-color);
        color: var(--bg-color);
    }
`;
document.head.appendChild(styleSheet);

const container = document.createElement("div");
container.classList.add("container");
main.appendChild(container);

const buttons = [
    { txt: "AC", type: "special" }, { txt: "+/-", type: "special" }, { txt: "%", type: "special" }, { txt: "/", type: "op" },
    { txt: "7", type: "num" }, { txt: "8", type: "num" }, { txt: "9", type: "num" }, { txt: "*", type: "op" },
    { txt: "4", type: "num" }, { txt: "5", type: "num" }, { txt: "6", type: "num" }, { txt: "-", type: "op" },
    { txt: "1", type: "num" }, { txt: "2", type: "num" }, { txt: "3", type: "num" }, { txt: "+", type: "op" },
    { txt: "0", type: "num" }, { txt: ".", type: "num" }, { txt: "=", type: "op" }
];

const display = document.createElement("input");
display.classList.add("display");
display.value = "0";
display.readOnly = true;
container.appendChild(display);

const calculate = (a, b, op) => {
    const n1 = parseFloat(a.toString().replace(/,/g, ''));
    const n2 = parseFloat(b.toString().replace(/,/g, ''));
    if (isNaN(n1) || isNaN(n2)) return b;

    switch (op) {
        case "+": return n1 + n2;
        case "-": return n1 - n2;
        case "*": return n1 * n2;
        case "/": return n2 === 0 ? "Error" : n1 / n2;
        default: return b;
    }
};

const formatNumber = (val) => {
    if (val === "Error") return val;
    if (val === "0") return "0";

    const parts = val.toString().split(".");

    parts[0] = parseFloat(parts[0]).toLocaleString('en-US');

    return parts.length > 1 ? parts.join(".") : parts[0];
};

const addSymbol = (symbol) => {
    if (display.value === "0") {
        display.value = symbol;
    } else {
        display.value += symbol;
    }
};

const clearDisplay = () => {
    display.value = "0";
};

buttons.forEach(btn => {
    const item = document.createElement("button");
    item.textContent = btn.txt;
    if (btn.type === "num") item.classList.add("num-buttons");
    if (btn.type === "op") item.classList.add("operation-buttons");
    if (btn.type === "special") item.classList.add("special-buttons");
    item.addEventListener("click", () => {
        const val = btn.txt;
        if (btn.type === "num") {
            if (display.value.length >= 12 && !shouldResetScreen) return;
            if (val === ".") {
                if (display.value.includes(".") && !shouldResetScreen) return;
                if (shouldResetScreen) {
                    display.value = "0.";
                    shouldResetScreen = false;
                    return;
                }
            }
            if (display.value === "0" || shouldResetScreen) {
                display.value = (val === ".") ? "0." : val;
                shouldResetScreen = false;
            }
            else {
                display.value += val;
            }
        }

        else if (btn.type === "op") {
            if (val === "=") {
                if (previousInput !== null && operator !== null) {
                    display.value = calculate(previousInput, display.value, operator);
                    previousInput = null;
                    operator = null;
                }
            }
            else {
                previousInput = display.value;
                operator = val;
                shouldResetScreen = true;
            }
        }
        else if (btn.type === "special") {
            if (val === "AC") {
                clearDisplay();
                previousInput = null;
                operator = null;
                shouldResetScreen = false;
            }
            else if (val === "+/-") {
                if (display.value !== "0") {
                    display.value = (parseFloat(display.value) * -1).toString();
                }
            }
            else if (val === "%") {
                display.value = (parseFloat(display.value) / 100).toString();
                shouldResetScreen = true;
            }
        }
        display.value = formatNumber(display.value.replace(/,/g, ''));
    });
    container.appendChild(item);
});

window.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key === ",") key = ".";
    if (key === "Enter") key = "=";
    if (key === "Escape" || key === "Delete") key = "AC";
    if (key === "*") key = "*";
    const targetBtn = Array.from(document.querySelectorAll("button"))
        .find(el => el.textContent === key);

    if (targetBtn) {
        event.preventDefault();
        targetBtn.click();
    }

    if (event.key === "Backspace") {
        if (shouldResetScreen) return;
        display.value = display.value.slice(0, -1);
        if (display.value === "" || display.value === "-") display.value = "0";
    }
});