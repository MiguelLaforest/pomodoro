import { Clock } from "./Clock";
import { PomodoroTimer } from "./timers";

const ticks = <HTMLUListElement>document.getElementById("ticks");
const countdownDisplay = document.querySelector("#time");

// const pause = <HTMLUListElement>document.getElementById("pause-btn");
// const start = <HTMLUListElement>document.getElementById("start-timer");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const stop = document.getElementById("stop");

let workTicks = [];
let breakTicks = [];
let normalTicks = [];

let workTimeInput = <HTMLInputElement>document.getElementById("work-time");
let breakTimeInput = <HTMLInputElement>document.getElementById("break-time");
let longBreakTimeInput = <HTMLInputElement>document.getElementById(
  "longBreak-time"
);

let workTime = parseFloat(workTimeInput.value);
let breakTime = parseFloat(breakTimeInput.value);
let longBreakTime = parseFloat(longBreakTimeInput.value);

let working = false;
let takingBreak = false;

const timer = new PomodoroTimer(workTime, breakTime, longBreakTime);
const clock = new Clock();

// pause.addEventListener("click", () => {
//   timer.pause();
// });

workTimeInput.oninput = function() {
  timer.state.activity = timer.convertToSeconds(
    parseFloat(workTimeInput.value)
  );
  displayPomodoroTimers();
};

breakTimeInput.oninput = function() {
  timer.state.break = timer.convertToSeconds(parseFloat(breakTimeInput.value));
  displayPomodoroTimers();
};

displayPomodoroTimers();

setInterval(() => {
  displayPomodoroTimers();
  displayCountDown();
}, 1000);

// window.onload = function() {
//   timer.onTick(format);
//   document.getElementById("timer-input").onsubmit = e => {
//     e.preventDefault();

//     start.style.display = "none";
//     pause.style.display = "block";
//     working = true;

//     workTime = parseFloat(
//       (<HTMLInputElement>document.getElementById("work-time")).value
//     );

//     breakTime = parseFloat(
//       (<HTMLInputElement>document.getElementById("break-time")).value
//     );

//     longBreakTime = parseFloat(
//       (<HTMLInputElement>document.getElementById("longBreak-time")).value
//     );

//     timer.times.activity = timer.convertToSeconds(workTime);
//     timer.times.break = timer.convertToSeconds(breakTime);
//     timer.times.long_break = timer.convertToSeconds(longBreakTime);
//     ticks.innerHTML = "";
//     timer.start();
//   };
// };

window.onload = function() {
  timer.onTick(format);
};

const startTimer = () => {
  play.style.display = "none";
  pause.style.display = "block";
  stop.style.display = "block";
  working = true;

  workTime = parseFloat(
    (<HTMLInputElement>document.getElementById("work-time")).value
  );

  breakTime = parseFloat(
    (<HTMLInputElement>document.getElementById("break-time")).value
  );

  longBreakTime = parseFloat(
    (<HTMLInputElement>document.getElementById("longBreak-time")).value
  );

  timer.times.activity = timer.convertToSeconds(workTime);
  timer.times.break = timer.convertToSeconds(breakTime);
  timer.times.long_break = timer.convertToSeconds(longBreakTime);
  ticks.innerHTML = "";
  timer.start();
};

function createTicks() {
  workTicks = [];
  breakTicks = [];
  normalTicks = [];

  for (let deg = 0; deg < 360; deg++) {
    let tick = {
      rot: deg
    };

    if (deg <= timer.state.activity / 10) {
      workTicks.push(tick);
    } else if (deg <= (timer.state.activity + timer.state.break) / 10) {
      breakTicks.push(tick);
    } else {
      normalTicks.push(tick);
    }
  }

  rotateTicks(clock.minuteAngle);
}

function displayPomodoroTimers() {
  ticks.innerHTML = "";

  createTicks();

  workTicks.forEach(element => {
    let part = document.createElement("li");
    part.classList.add(
      "work",
      clock.calculateTickLength(element.rot),
      "slices"
    );
    part.style.transform = `rotate(${element.rot}deg)`;
    ticks.appendChild(part);
  });

  breakTicks.forEach(element => {
    let part = document.createElement("li");
    part.classList.add(
      "break",
      clock.calculateTickLength(element.rot),
      "slices"
    );
    part.style.transform = `rotate(${element.rot}deg)`;
    ticks.appendChild(part);
  });

  normalTicks.forEach(element => {
    let part = document.createElement("li");
    part.classList.add(
      "normal",
      clock.calculateTickLength(element.rot),
      "slices"
    );
    part.style.transform = `rotate(${element.rot}deg)`;
    ticks.appendChild(part);
  });
}

function displayCountDown() {
  let obj = timer.parse(timer.state.activity);
  format(obj.minutes, obj.seconds);
}

// Display format for time
function format(minutes: number | string, seconds: number | string) {
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  countdownDisplay.textContent = minutes + ":" + seconds;
}

function rotateTicks(degree: number) {
  degree = Math.round(degree);

  workTicks.forEach(element => {
    element.rot += degree;
  });

  breakTicks.forEach(element => {
    element.rot += degree;
  });

  normalTicks.forEach(element => {
    element.rot += degree;
  });
}

const inputs = <HTMLUListElement>document.getElementById("timer-input");
const inputBtn = <HTMLUListElement>document.getElementById("input-settings");

const toggleSettings = () => {
  inputs.classList.toggle("open");

  // if (inputs.classList.contains("open")) {
  //   inputBtn.textContent = "Times >";
  // } else {
  //   inputBtn.textContent = "< Times";
  // }
};

inputBtn.addEventListener("click", toggleSettings);

const signUpLink = <HTMLUListElement>document.getElementById("sign-up-link");
const signUpModal = <HTMLFormElement>document.getElementById("sign-up-form");

const openSignUpModal = () => {
  signUpModal.classList.add("open");
  toggleSettings();
};

const closeSignUpModal = () => {
  if (signUpModal.classList.contains("open"))
    signUpModal.classList.remove("open");
};

signUpLink.addEventListener("click", openSignUpModal);

const clockContainer = <HTMLBodyElement>document.getElementById(
  "clock-container"
);

clockContainer.addEventListener("click", closeSignUpModal);

document
  .getElementById("close-sign-up")
  .addEventListener("click", closeSignUpModal);

play.addEventListener("click", startTimer);
pause.addEventListener("click", () => timer.pause());
