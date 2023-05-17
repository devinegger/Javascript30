let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
    // clear any existing timers 
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it
        if(secondsLeft < 0) {
            console.log("bbbbzzzzzzzt!");
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let hours = '';
    let minutes = Math.floor(seconds/60);

    // let's do hours as well
    if(minutes>60) {
        hours = Math.floor(minutes/60);
        minutes = minutes%60;
    }
    seconds = seconds%60;
    const display = `${hours}${hours !== '' ? ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    document.title = display;
    timerDisplay.textContent=display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours() > 12 ? end.getHours()-12 : end.getHours();
    const minutes = end.getMinutes() < 10 ? '0'+end.getMinutes() : end.getMinutes();

    endTime.textContent = `Be back at: ${hour}:${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    // this also works just passing this.dataset.time to timer...? 
    timer(seconds);
}
 
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minsInput = parseInt(this.minutes.value);
    // but parseInt is a nice way to weed out non number input!
    this.reset();

    if(minsInput) {
        timer(minsInput*60);
    }
})