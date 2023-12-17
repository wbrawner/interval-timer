import { IntervalTimer, Phase } from './timer.js';

export class TimerState {
  /**
   * @type {IntervalTimer}
   */
  timer;
  /**
   * @type {string} One of the Phase constants
   */
  phase = Phase.WARM_UP;
  /**
   * @type {number}
   */
  timeRemaining;
  /**
   * @type {number}
   */
  set;
  /**
   * @type {number}
   */
  round;
  /**
   * @type {Map<string, HTMLAudioElement>}
   */
  #sounds;
  /**
   * @type {NodeJS.Timer}
   */
  #ticker;
  /**
   * @type {() => void}
   */
  #callback;
  /**
   * @type {WakeLock}
   */
  #wakeLock;

  /**
   * @param timer {IntervalTimer}
   * @param callback {(() => void) | undefined}
   */
  constructor(timer, callback, sounds) {
    this.timer = timer;
    this.timeRemaining = this.timer.warmUp;
    this.set = this.timer.sets;
    this.round = this.timer.rounds;
    this.callback = callback ?? (() => null);
    this.#sounds = sounds;
  }

  active() {
    return this.ticker !== undefined;
  }

  #playSound() {
    this.#sounds.get(this.phase)?.play();
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

  #lockScreen() {
    const locker = navigator.wakeLock;
    if (!locker) {
      return;
    }
    try {
      locker.request('screen')
        .then(lock => {
          this.wakeLock = lock;
          this.wakeLock.addEventListener('release', () => {
            this.wakeLock = null;
          });
        }).catch(err => {
          console.error('Failed to acquire wakelock', err);
        });
    } catch (err) {
      console.error('Failed to acquire wakelock', err);
    }
  }

  #unlockScreen() {
    try {
      this.wakeLock?.release();
      this.wakeLock = null;
    } catch (err) {
      console.error('Failed to release wakelock', err);
    }
  }

  #restartTicker() {
    const ticker = this.ticker;
    if (ticker) {
      clearInterval(ticker);
    }
    this.ticker = setInterval(() => this.tick(), 1000);
  }

  #tick() {
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