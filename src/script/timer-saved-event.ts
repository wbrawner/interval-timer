export class TimerSavedEvent extends Event {
  timerId?: number;

  constructor(timerId?: string) {
    super(
      'timersaved',
      {
        bubbles: true,
        composed: true
      }
    );
    this.timerId = timerId ? Number.parseInt(timerId) : undefined;
  }
}