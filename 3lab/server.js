const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
    res.send('<h1>Вітаємо на сервері!</h1><p>Перейдіть на <a href="/calculator">/calculator</a></p>');
});

app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.send('<h2>Проєкт створив студент-програміст</h2>');
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});