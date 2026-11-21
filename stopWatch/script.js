let timerDisplay = document.querySelector(".timerDisplay");
let startBtn = document.querySelector("#startBtn");
let stopBtn = document.querySelector("#stopBtn");
let restBtn = document.querySelector("#resetBtn");


let msec = 0;
let secs = 0;
let mins = 0;

let timerID = null;

startBtn.addEventListener("click", function () {
    if (timerID !== null) {
        clearInterval(timerID);
    }
    timerID = setInterval(startTimer, 10);
})

stopBtn.addEventListener("click", function () {
    clearInterval(timerID)
})

restBtn.addEventListener("click", function () {
    clearInterval(timerID);
    timerDisplay.innerHTML = `00 : 00 : 00`
})

function startTimer() {
    msec++;
    if (msec == 100) {
        msec = 0;
        secs++;
        if (secs == 60) {
            secs = 0;
            mins++;
        }
    }

    let msecString = msec < 10 ? `0${msec}` : msec;
    let secsString = secs < 10 ? `0${secs}` : secs;
    let minsString = mins < 10 ? `0${mins}` : mins;

    /*if (msec < 10) {
        msecString = `0${msec}`;
    } else {
        msecString = msec;
    }

    if (secs < 10) {
        secsString = `0${secs}`;
    } else {
        secsString = secs;
    }

    if (mins < 10) {
        minsString = `0${mins}`;
    } else {
        minsString = mins;
    }*/

    timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`
}