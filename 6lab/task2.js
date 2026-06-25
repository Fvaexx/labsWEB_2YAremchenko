class GridElement {
    getPower(isDay) { return 0; }
}

class PowerPlant extends GridElement {
    constructor(production) {
        super();
        this.production = production;
    }
    getPower(isDay) { return this.production; }
}
class SolarPanel extends GridElement {
    constructor(maxGen) {
        super();
        this.maxGen = maxGen;
    }
    getPower(isDay) { return isDay ? this.maxGen : 0; }
}

class House extends GridElement {
    constructor(apartments) {
        super();
        this.apartments = apartments;
    }
    getPower(isDay) {
        let consumptionPerApt = isDay ? 0.004 : 0.001;
        return -(this.apartments * consumptionPerApt);
    }
}

class PowerLine {
    constructor(capacity, price) {
        this.capacity = capacity;
        this.price = price;
    }
}

function calculateEnergy() {
    const elements = [
        new PowerPlant(50),
        new SolarPanel(5),
        new SolarPanel(2),
        new House(200),
        new House(400)
    ];

    const lines = [
        new PowerLine(20, 150),
        new PowerLine(50, 100)
    ];

    function getBalance(isDay) {
        let total = elements.reduce((sum, el) => sum + el.getPower(isDay), 0);
        let cost = 0;

        let remaining = total;

        let sortedLines = [...lines].sort((a, b) => remaining > 0 ? b.price - a.price : a.price - b.price);

        for (let line of sortedLines) {
            let flow = Math.min(Math.abs(remaining), line.capacity);
            if (remaining > 0) {
                cost += flow * line.price;
                remaining -= flow;
            } else {
                cost -= flow * line.price;
                remaining += flow;
            }
        }
        return { net: total, financial: cost };
    }

    const day = getBalance(true);
    const night = getBalance(false);

    const output = document.getElementById('output');
    output.style.display = 'block';
    output.innerHTML = `
        <strong>День:</strong> Баланс ${day.net.toFixed(2)} МВт, Прибуток/Витрати: ${day.financial.toFixed(2)}<br>
        <strong>Ніч:</strong> Баланс ${night.net.toFixed(2)} МВт, Прибуток/Витрати: ${night.financial.toFixed(2)}
    `;
}