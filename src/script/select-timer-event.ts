export class SelectTimerEvent extends Event {
  timerId: number;

  constructor(timerId: number) {
    super(
      'selecttimer',
      {
        bubbles: true,
        composed: true
      }
    );
    this.timerId = timerId;
  }
}