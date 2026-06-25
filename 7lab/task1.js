function displayCurrentTime() {
    const now = new Date();

    const time = now.toLocaleTimeString('uk-UA', { hour12: false });

    const days = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота'];
    const dayName = days[now.getDay()];

    const day = String(now.getDate()).padStart(2, '0');
    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    const result = `${time}, ${dayName} , ${day} ${monthName} ${year} року`;

    console.log(result);
}