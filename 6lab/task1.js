function startTask() {
    const calendarData = {
        ua: {
            questionDay: "Введіть номер дня неділі від 1 до 7?",
            errorMsg: "Неправильний ввід даних!",
            days: ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"]
        },
        en: {
            questionDay: "Enter the day number of the week (from 1 to 7)?",
            errorMsg: "Invalid input data!",
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        }
    };

    let lang;
    while (true) {
        lang = prompt("Виберіть мову 'ua' або 'en'?").toLowerCase();
        if (calendarData[lang]) break;
        alert("Неправильний ввід даних / Invalid input!");
    }

    let dayNum;
    while (true) {
        dayNum = parseInt(prompt(calendarData[lang].questionDay));
        if (dayNum >= 1 && dayNum <= 7) break;
        alert(calendarData[lang].errorMsg);
    }

    alert(calendarData[lang].days[dayNum - 1]);
}