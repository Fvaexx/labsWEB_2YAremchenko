function startGame() {
    let playAgain = true;

    while (playAgain) {
        const targetNumber = Math.floor(Math.random() * 51);
        let attempts = 0;
        let guessed = false;

        while (!guessed) {
            let userInput = prompt("Вгадайте число від 0 до 50:");

            if (userInput === null) return;

            let userNumber = parseInt(userInput);
            attempts++;

            if (isNaN(userNumber)) {
                alert("Будь ласка, введіть коректне число.");
                continue;
            }

            const diff = Math.abs(targetNumber - userNumber);
            let hint = "";

            if (userNumber === targetNumber) {
                guessed = true;
                alert(`За ${attempts} спроб ви вгадали число ${targetNumber}`);
                playAgain = confirm("Бажаєте зіграти ще раз?");
            } else {
                if (diff <= 2) hint = "гаряче";
                else if (diff <= 10) hint = "тепло";
                else hint = "холодно";

                alert(`Не вірно! Підказка: ${hint}`);
            }

            const now = new Date();
            const timestamp = now.toLocaleString('uk-UA').replace(',', '');
            const status = guessed ? "вірно" : "не вірно";
            console.log(`${timestamp} Спроба ${attempts}: число ${userNumber} - ${status}`);
        }
    }
}