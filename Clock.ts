class Clock {
  hourNeedle = <HTMLElement>document.querySelector(".hour");
  minuteNeedle = <HTMLElement>document.querySelector(".minute");
  secondNeedle = <HTMLElement>document.querySelector(".second");

  h: number;
  m: number;
  s: number;

  hourAngle = this.h * 30 + this.m / 2;
  minuteAngle = this.m * 6 + this.s / 10;
  secondAngle = this.s * 6;

  constructor() {
    this.updateTime;
    this.rotateNeedles;

    setInterval(this.updateTime, 1000);
    setInterval(this.rotateNeedles, 1000);
  }

  updateTime = () => {
    let date = new Date();

    this.h = date.getHours() % 12;
    this.m = date.getMinutes();
    this.s = date.getSeconds();
  };

  rotateNeedles = () => {
    this.hourAngle = this.h * 30 + this.m / 2;
    this.minuteAngle = this.m * 6 + this.s / 10;
    this.secondAngle = this.s * 6;

    this.hourNeedle.style.transform = `rotate(${this.hourAngle}deg)`;
    this.minuteNeedle.style.transform = `rotate(${this.minuteAngle}deg`;
    this.secondNeedle.style.transform = `rotate(${this.secondAngle}deg)`;
  };

  calculateTickLength = (angle: number) => {
    let length: string;

    if (angle % 90 == 0) {
      length = "long";
    } else if (angle % 30 == 0 && angle % 90 != 0) {
      length = "medium";
    } else if (angle % 6 == 0 && angle % 30 != 0 && angle % 90 != 0) {
      length = "small";
    }

    return length;
  };
}

export { Clock };
