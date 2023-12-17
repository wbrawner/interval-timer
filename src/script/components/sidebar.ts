import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { IntervalTimer } from '../timer';
import { SelectTimerEvent } from '../select-timer-event';

@customElement('app-sidebar')
export class AppSidebar extends LitElement {
  @property({ type: Boolean }) visible = false;
  @property({ type: Array }) timers?: IntervalTimer[] = [];
  @property({ type: Number }) selectedTimer?: number;

  static get styles() {
    return css`
      * {
        transition: all 0.25s ease;
      }

      @media(prefers-color-scheme: light) {
        header {
          color: black;
        }
      }

      .sidebar-content {
        position: absolute;
        width: 20em;
        height: 100vh;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 999;
        background: var(--background-color);
        transform: translate3d(-100%, 0, 0);
        display: flex;
        flex-direction: column;
      }

      h3 {
        margin: 0;
        padding: 1em;
      }

      .visible .sidebar-content {
        transform: translate3d(0, 0, 0);
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 998;
        background: rgba(0, 0, 0, 0.6);
        display: none;
      }

      .visible .overlay  {
        display: block;
      }
    `;
  }

  constructor() {
    super();
  }

  private toggleVisibility() {
    this.dispatchEvent(new CustomEvent('closesidebar'));
  }

  private selectTimer(timerId: number) {
    this.dispatchEvent(new SelectTimerEvent(timerId));
    this.toggleVisibility();
  }

  private newTimer() {
    this.dispatchEvent(new CustomEvent(
      'newtimer',
      {
        bubbles: true,
        composed: true
      }
    ));
    this.toggleVisibility();
  }

  render() {
    return html`
      <div class="sidebar ${this.visible ? 'visible' : ''}">
        <div class="overlay" @click="${this.toggleVisibility}"></div>
        <div class="sidebar-content">
          <h3>Trainterval</h3>
          <ul>
            ${this.timers?.map(timer => {
    return html`
                  <li
                    @click=${() => this.selectTimer(timer.id!)}
                    selected=${timer.id === this.selectedTimer}
                    value=${timer.name}>
                    ${timer.name}<br />${timer.description || ''}
                  </li>
                `;
  })}
          </ul>
          <hr />
          <button @click="${this.newTimer}">
            <icon-add></icon-add>
            New Timer
          </button>
      </div>
    `;
  }
}
