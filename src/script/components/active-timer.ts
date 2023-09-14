import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { durationString, IntervalTimer, className } from '../timer';
import { TimerState } from '../timer-state';

@customElement('active-timer')
export class ActiveTimer extends LitElement {
  @property({ type: Object }) timer!: IntervalTimer;
  @property({ type: Object }) timerState!: TimerState;

  static get styles() {
    return css`
      * {
        user-select: none;
      }

      .timer-wrapper {
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
      }

      .timer {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        transition: all 0.25s ease;
        padding: 1em;
        box-sizing: border-box;
        border-radius: 1em;
        background-color: var(--timer-background-default);
      }

      .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
      }

      .timer.lowintensity {
        background-color: var(--timer-background-red);
      }

      .timer.highintensity {
        background-color: #0C5E0C;
      }

      .timer.rest {
        background-color: #D2AD0F;
      }

      .timer.cooldown {
        background-color: #005CA3;
      }

      p {
        margin: 0;
        padding: 0;
      }

      .time {
        font-size: 5em;
        font-family: Cascadia, "Roboto Mono", Menlo, monospace;
      }

      footer {
        display: flex;
        justify-content: space-between;
      }
    `;
  }

  constructor() {
    super();
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.target !== document.body || event.altKey || event.shiftKey || event.metaKey) {
        return;
      }
      switch (event.key) {
        case 'ArrowRight':
          this.goForward();
          break;
        case 'ArrowLeft':
          this.goBack();
          break;
        case ' ':
          this.toggleActiveState();
          break;
      }
    });
  }

  updated() {
    if (!this.timerState || this.timerState.timer.id !== this.timer.id) {
      this.timerState = new TimerState(this.timer, () => this.requestUpdate());
    }
  }

  toggleActiveState() {
    this.timerState.toggle();
  }

  goBack() {
    this.timerState.goBack();
  }

  goForward() {
    this.timerState.goForward();
  }

  private toggleIcon() {
    if (this.timerState.active()) {
      return html`<pause-icon></pause-icon>`;
    } else {
      return html`<play-icon></play-icon>`;
    }
  }

  render() {
    if (!this.timerState) return;
    return html`
    <div class="timer-wrapper">
      <div class="timer ${className(this.timerState.phase)}">
        <div class="main">
          <p class="phase">${this.timerState.phase}</p>
          <p class="time">${durationString(this.timerState.timeRemaining)}</p>
          <div class="controls">
            <fluent-button appearance="stealth" @click=${this.goBack}>
              <back-icon></back-icon>
            </fluent-button>
            <fluent-button appearance="stealth" @click=${this.toggleActiveState}>
              ${this.toggleIcon()}
            </fluent-button>
            <fluent-button appearance="stealth" @click=${this.goForward}>
              <forward-icon></forward-icon>
            </fluent-button>
          </div>
        </div>
        <footer>
          <labeled-counter label="Set" .value=${this.timerState.set.toString()}></labeled-counter>
          <labeled-counter label="Round" .value=${this.timerState.round.toString()}></labeled-counter>
        </footer>
      </div>
    </div>`;
  }
}
