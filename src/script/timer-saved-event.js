/** @extends Event */
export class TimerSavedEvent extends Event {
    /** */
    timerId = undefined;

    constructor(timerId) {
        super('timersaved', {
            bubbles: true,
            composed: true
        });
        this.timerId = timerId ? Number.parseInt(timerId) : undefined;
    }
}
