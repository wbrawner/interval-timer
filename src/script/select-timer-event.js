/** @extends Event */
export class SelectTimerEvent extends Event {
    /** */
    timerId = undefined;

    constructor(timerId) {
        super('selecttimer', {
            bubbles: true,
            composed: true
        });
        this.timerId = timerId;
    }
}
