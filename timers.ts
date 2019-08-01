class PomodoroTimer {
  times = {
    activity: 0,
    break: 0,
    long_break: 0
  };

  state = {
    activity: 0,
    break: 0,
    run: 0,
    running: false
  };

  timer = null;
  tickFtns: Function[];

  constructor(
    workLength: number,
    breakLength: number,
    longBreakLength: number
  ) {
    this.times = {
      activity: this.convertToSeconds(workLength),
      break: this.convertToSeconds(breakLength),
      long_break: this.convertToSeconds(longBreakLength)
    };

    this.state = {
      activity: this.convertToSeconds(workLength),
      break: this.convertToSeconds(breakLength),
      run: 0,
      running: false
    };

    this.tickFtns = [];
    console.log(this.state);
  }

  resetState = () => {
    this.state = {
      activity: this.times.activity,
      break: this.times.break,
      run: 0,
      running: false
    };
  };

  pause = () => {
    this.state.running = !this.state.running;
  };

  start = () => {
    if (this.state.running) {
      return;
    }

    this.state.running = true;
    this.startActivity();
  };

  startBreak = () => {
    this.timer = setInterval(this.breakRunning, 1000);
  };

  stopBreak = () => {
    clearInterval(this.timer);
  };

  resetBreak = () => {
    this.state.break = this.times.break;
  };

  breakRunning = () => {
    console.log("Remaining break:", this.state.break);
    if (!this.state.running) {
      return;
    }

    if (this.state.break > 0) {
      this.state.break--;
    } else {
      this.stopBreak();
      this.resetActivity();
      this.countRun();
      if (this.state.run < 3) {
        this.resetBreak();
      } else {
        this.state.break = this.times.long_break;
      }
      this.startActivity();
    }
  };

  startActivity = () => {
    this.timer = setInterval(this.activityRunning, 1000);
  };

  stopActivity = () => {
    clearInterval(this.timer);
  };

  resetActivity = () => {
    this.state.activity = this.times.activity;
  };

  activityRunning = () => {
    console.log("Remaining activity:", this.state.activity);
    if (!this.state.running) {
      return;
    }

    if (this.state.activity > 0) {
      this.state.activity--;
    } else {
      this.stopActivity();
      this.startBreak();
    }
  };

  onTick = (ftn: Function) => {
    if (typeof ftn === "function") {
      this.tickFtns.push(ftn);
    }
    return this;
  };

  convertToSeconds = (minutes: number): number => {
    return minutes * 60;
  };

  parse = (seconds: number) => {
    return {
      minutes: (seconds / 60) | 0,
      seconds: (seconds % 60) | 0
    };
  };

  countRun = () => {
    if (this.state.run == 4) {
      this.state.run = 0;
    } else {
      this.state.run++;
    }
  };
}
export { PomodoroTimer };

// class PomodoroTimer {
//   state;

//   times = {
//     activity: 0,
//     break: 0,
//     long_break: 0
//   };

//   currentTimer;

//   work1: number;
//   break1: number;
//   workSessionsAmount = 0;

//   work: number;
//   break: number;
//   longBreak: number;
//   granularity: number;
//   tickFtns: Function[];

//   constructor(
//     workLength: number,
//     breakLength: number,
//     longBreakLength: number
//   ) {
//     this.times = {
//       activity: this.convertToSeconds(workLength),
//       break: this.convertToSeconds(breakLength),
//       long_break: this.convertToSeconds(longBreakLength)
//     };

//     this.state = {
//       runningTimer: this.Activity,
//       run: 0,
//       running: false
//     };
//     // this.work = this.convertToSeconds(workLength);
//     this.work1 = this.convertToSeconds(workLength);
//     // this.workTimer.length = this.work;
//     // this.break = this.convertToSeconds(breakLength);
//     this.break1 = this.convertToSeconds(breakLength);
//     // this.breakTimer.length = this.break;
//     // this.longBreak = this.convertToSeconds(longBreakLength);
//     this.tickFtns = [];
//   }

//   activityLength = () => {
//     return this.times.activity;
//   };

//   breakLength = () => {
//     return this.times.break;
//   };

//   start = () => {
//     if (this.state.running) {
//       return;
//     }

//     this.state.running = true;

//     this.state.runningTimer.run.apply(this.state.runningTimer);
//   };

//   startBreak = () => {
//     if (this.workSessionsAmount >= 3) {
//       this.Break.length = this.longBreak;
//       this.workSessionsAmount = 0;
//     } else {
//       this.Break.length = this.break;
//     }
//     this.Break.run.apply(this.Break);
//     console.log("BREAK");
//   };

//   startActivity = () => {
//     this.Activity.run.apply(this.Activity);
//     console.log("WORK");
//   };

//   onTick = (ftn: Function) => {
//     if (typeof ftn === "function") {
//       this.tickFtns.push(ftn);
//     }
//     return this;
//   };

//   expired = () => {
//     return !this.running;
//   };

//   convertToSeconds = (minutes: number): number => {
//     return minutes * 60;
//   };

//   parse = (seconds: number) => {
//     return {
//       minutes: (seconds / 60) | 0,
//       seconds: (seconds % 60) | 0
//     };
//   };
//   getStartingTime = () => {
//     return Date.now();
//   };

//   running = () => {
//     // this.state.runningTimer = currentTimer;

//     if (!this.state.runningTimer.running) {
//       this.state.runningTimer.startTime = this.getStartingTime();
//       this.state.runningTimer.running = true;
//     }

//     // let diff =
//     //   this.runningTimer.length -
//     //   (((Date.now() - this.runningTimer.startTime) / 1000) | 0);

//     // this.work1 = diff;
//     if (this.state.runningTimer.length > 0) {
//       setTimeout(this.running, 1000);
//     } else {
//       this.state.runningTimer.length = 0;
//       this.state.runningTimer.running = false;
//       this.state.runningTimer.expired.apply(this.state.runningTimer);
//     }

//     let obj = this.parse(this.state.runningTimer.length);

//     this.tickFtns.forEach(ftn => {
//       ftn.call(this, obj.minutes, obj.seconds);
//     });
//   };

//   nextTimer = () => {
//     this.currentTimer = !this.currentTimer;
//     let timers = [this.Break, this.Activity];
//     this.state.runningTimer = timers[this.currentTimer];
//   };

//   Activity = {
//     name: "WORK",
//     startTime: 0,
//     length: this.activityLength(),
//     running: false,
//     expired: () => {
//       this.countRun();
//       this.start();
//       this.nextTimer();
//     },
//     run: () => {
//       this.state.runningTimer = this.Activity;
//       this.running();
//     },
//     update: () => {
//       this.work1--;
//     }
//   };

//   Break = {
//     name: "BREAK",
//     startTime: 0,
//     length: this.breakLength(),
//     running: false,
//     expired: () => {
//       this.work1 = this.work;
//       this.nextTimer();
//     },
//     run: () => {
//       this.state.runningTimer = this.Break;
//       this.running();
//     },
//     update: () => {
//       this.break1--;
//     }
//   };

//   countRun = () => {
//     if (this.state.run == 4) {
//       this.state.run = 0;
//     } else {
//       this.state.run++;
//     }
//   };
// }
