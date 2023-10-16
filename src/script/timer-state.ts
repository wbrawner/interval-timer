import { IntervalTimer, Phase } from './timer';

export class TimerState {
  timer: IntervalTimer;
  phase: Phase = Phase.WARM_UP;
  timeRemaining: number;
  set: number;
  round: number;
  private sounds: Map<Phase, HTMLAudioElement> = new Map([
    [Phase.WARM_UP, new Audio('assets/audio/warm.mp3')],
    [Phase.LOW_INTENSITY, new Audio('assets/audio/low.mp3')],
    [Phase.HIGH_INTENSITY, new Audio('assets/audio/high.mp3')],
    [Phase.REST, new Audio('assets/audio/rest.mp3')],
    [Phase.COOLDOWN, new Audio('assets/audio/cool.mp3')],
  ]);
  private ticker?: NodeJS.Timeout;
  private callback: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private wakeLock?: any;

  constructor(timer: IntervalTimer, callback?: () => void) {
    this.timer = timer;
    this.timeRemaining = this.timer.warmUp;
    this.set = this.timer.sets;
    this.round = this.timer.rounds;
    this.callback = callback ?? (() => null);
  }

  active() {
    return this.ticker !== undefined;
  }

  private playSound() {
    this.sounds.get(this.phase)?.play();
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }

  toggle() {
    if (this.active()) {
      const ticker = this.ticker;
      if (ticker) {
        clearInterval(ticker);
      }
      this.ticker = undefined;
      this.unlockScreen();
    } else {
      this.ticker = setInterval(() => this.tick(), 1000);
      this.lockScreen();
    }
    this.callback();
  }

  private lockScreen() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const locker = (navigator as any).wakeLock;
    if (!locker) {
      return;
    }
    try {
      locker.request('screen')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((lock: any) => {
          this.wakeLock = lock;
          this.wakeLock.addEventListener('release', () => {
            this.wakeLock = null;
          });
        }).catch((err: Error) => {
          console.error('Failed to aquire wakelock', err);
        });
    } catch (err) {
      console.error('Failed to aquire wakelock', err);
    }
  }

  private unlockScreen() {
    try {
      this.wakeLock?.release();
      this.wakeLock = null;
    } catch (err) {
      console.error('Failed to release wakelock', err);
    }
  }

  private restartTicker() {
    const ticker = this.ticker;
    if (ticker) {
      clearInterval(ticker);
    }
    this.ticker = setInterval(() => this.tick(), 1000);
  }

  private tick() {
    this.timeRemaining = Math.max(0, this.timeRemaining - 1);
    this.callback();
    if (this.timeRemaining === 0) {
      if (this.phase !== Phase.COOLDOWN) {
        this.goForward();
      } else {
        this.toggle();
      }
    }
  }

  goBack() {
    switch (this.phase) {
      case Phase.WARM_UP:
        this.timeRemaining = this.timer.warmUp;
        break;
      case Phase.LOW_INTENSITY:
        if (this.set < this.timer.sets) {
          this.phase = Phase.HIGH_INTENSITY;
          this.timeRemaining = this.timer.highIntensity;
          this.set++;
        } else if (this.round < this.timer.rounds) {
          this.phase = Phase.REST;
          this.timeRemaining = this.timer.rest;
          this.round++;
          this.set = 1;
        } else {
          this.phase = Phase.WARM_UP;
          this.timeRemaining = this.timer.warmUp;
        }
        break;
      case Phase.HIGH_INTENSITY:
        this.phase = Phase.LOW_INTENSITY;
        this.timeRemaining = this.timer.lowIntensity;
        break;
      case Phase.REST:
        this.phase = Phase.HIGH_INTENSITY;
        this.timeRemaining = this.timer.highIntensity;
        break;
      case Phase.COOLDOWN:
        this.phase = Phase.HIGH_INTENSITY;
        this.timeRemaining = this.timer.highIntensity;
        break;
    }
    if (this.active()) {
      this.playSound();
      this.restartTicker();
    }
    this.callback();
  }

  goForward() {
    switch (this.phase) {
      case Phase.WARM_UP:
        this.phase = Phase.LOW_INTENSITY;
        this.timeRemaining = this.timer.lowIntensity;
        break;
      case Phase.LOW_INTENSITY:
        this.phase = Phase.HIGH_INTENSITY;
        this.timeRemaining = this.timer.highIntensity;
        break;
      case Phase.HIGH_INTENSITY:
        if (this.timer.sets > 1 && this.set > 1) {
          this.phase = Phase.LOW_INTENSITY;
          this.timeRemaining = this.timer.lowIntensity;
          this.set--;
        } else if (this.timer.rounds > 1 && this.round > 1) {
          this.phase = Phase.REST;
          this.timeRemaining = this.timer.rest;
        } else {
          this.phase = Phase.COOLDOWN;
          this.timeRemaining = this.timer.coolDown;
        }
        break;
      case Phase.REST:
        this.phase = Phase.LOW_INTENSITY;
        this.timeRemaining = this.timer.lowIntensity;
        this.round--;
        this.set = this.timer.sets;
        break;
      case Phase.COOLDOWN:
        this.timeRemaining = 0;
        break;
    }
    if (this.active()) {
      this.playSound();
      this.restartTicker();
    }
    this.callback();
  }
}