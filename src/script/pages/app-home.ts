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
  }

  private editButton() {
    if (!this.selectedTimer) {
      return null;
    }
    return html`
      <fluent-button appearance="stealth" slot="actions" @click=${() => this.editTimer = this.selectedTimer}>Edit</fluent-button>
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
        <p>
          Create a timer to begin<br />
          <fluent-button
            appearance="stealth"
            @click=${() => this.editTimer = -1}>
            New Timer
          </fluent-button>
        </p>
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
        ${body}
        <timer-form-dialog
          ?visible=${this.editTimer !== undefined}
          .timerService=${this.timerService}
          .timer=${this.editTimer === timer?.id ? timer : null}
          @close=${this.closeEditor}></timer-form-dialog>
      </main>
    `;
  }
}
