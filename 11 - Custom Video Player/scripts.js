/* get elements */

// *** !!! challenge: make button for video full screen! !!! ***

const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* build out functions */

function togglePlay() {
    // could do this: (but do more research on how this works !)
    // const method = video.paused ? 'play' : 'paused';
    // video[method]();
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayButton() {
    const icon = this.paused ? '💩' : '►';
    toggle.textContent = icon;
}

function skip() {
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function slide() {
    const control = this.name;
    video[control] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    console.log(e);
    scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// controls
ranges.forEach(range => range.addEventListener('change', slide));
skipButtons.forEach(button => button.addEventListener('click', skip));
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// actions
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

window.addEventListener('keydown', (e) => {
    if(e.keyCode === 32) {
        togglePlay();
    }
});