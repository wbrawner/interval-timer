import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { IntervalTimer } from '../timer';
import { TimerService, timerServiceSingleton } from '../timer-service';
import { SelectTimerEvent } from '../select-timer-event';

@customElement('app-home')
export class AppHome extends LitElement {

  @property({ type: Array }) timers: IntervalTimer[] = [];
  @property({ type: Number }) selectedTimer?: number;
  @property({ type: Number }) editTimer?: number;
  private timerService?: TimerService;

  @query('dialog')
  dialog: HTMLElement | null | undefined;

  static get styles() {
    return css`
      main {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      active-timer {
        flex-grow: 1;
      }

      .timer-wrapper {
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
        border-radius: 1em;
        background-color: var(--timer-background-default);
      }

      p {
        margin: 0;
        text-align: center;
      }
    `;
  }

  constructor() {
    super();
    timerServiceSingleton()
      .then(async timerService => {
        this.timerService = timerService;
        this.loadTimers()
      });
    document.addEventListener('timersaved', () => {
      this.loadTimers()
    })
  }

  private async loadTimers() {
    this.timers = await this.timerService?.getAll() || [];
    if (!this.selectedTimer) {
      this.selectedTimer = this.timers[0]?.id;
    }
  }

  private async closeEditor() {
    this.editTimer = undefined;
    this.timers = await this.timerService?.getAll() || [];
    if (!this.selectedTimer) {
      this.selectedTimer = this.timers[0]?.id;
    }
      dialog.close()
  }

  private editButton() {
    if (!this.selectedTimer) {
      return null;
    }
    return html`
      <button @click=${() => this.editTimer = this.selectedTimer}>Edit</button>
    `;
  }

  render() {
    let body;
    const timer = this.timers.filter(t => t.id === this.selectedTimer)[0] || this.timers[0];
    if (timer) {
      body = html`
        <active-timer .timer=${timer}></active-timer>
      `;
    } else {
      body = html`
      <div class="timer-wrapper">
        <p>
          Create a timer to begin<br />
          <button
            @click=${() => this.editTimer = -1}>
            New Timer
          </button>
        </p>
       </div>
      `;
    }

    return html`
      <main>
        <app-header
          .apptitle=${timer?.name}
          .timers=${this.timers}
          .selectedTimer=${this.selectedTimer}
          @newtimer=${() => this.editTimer = -1}
          @selecttimer=${(e: SelectTimerEvent) => this.selectedTimer = e.timerId}>
          ${this.editButton()}
        </app-header>
        <dialog>
        <timer-form-dialog
          .timerService=${this.timerService}
          .timer=${this.editTimer === timer?.id ? timer : null}
          @close=${this.closeEditor}></timer-form-dialog>
        </dialog>
        ${body}
      </main>
    `;
  }
}
