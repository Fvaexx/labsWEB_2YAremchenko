const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { number } = req.body;

    if (number === undefined || isNaN(number)) {
        return res.status(400).json({ error: "Некоректні дані" });
    }

    const square = Math.pow(number, 2);
    console.log(`Отримано: ${number}, Результат: ${square}`);

    res.json({ square: square });
});

app.listen(3000, () => {
    console.log('Сервер працює на http://localhost:3000');
});