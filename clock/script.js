const hours = document.getElementById("hour");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const amPm = document.getElementById("period");
const dateTag = document.getElementById("date");


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

setInterval(() => {
    const date = new Date();

    let code = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    dateTag.textContent = code;


    let hours1 = date.getHours();
    let min1 = date.getMinutes();
    let sec1 = date.getSeconds();

    if (hours1 > 11) {
        amPm.textContent = `PM`;
        hours1 -= 12;
    } else {
        amPm.textContent = `AM`;
    }

    if (hours1 < 10) {
        hours.textContent = `0${hours1}`;
    } else {
        hours.textContent = hours1;
    }

    if (min1 < 10) {
        min.textContent = `0${min1}`;
    } else {
        min.textContent = min1;
    }

    if (sec1 < 10) {
        sec.textContent = `0${sec1}`;
    } else {
        sec.textContent = sec1;
    }
}, 100)