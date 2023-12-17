import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { SelectTimerEvent } from '../select-timer-event';

/** @extends LitElement */
@customElement('app-sidebar')
export class AppSidebar extends LitElement {
    /** @default false */
    @property({ type: Boolean })
    visible = false;
    /** @default [] */
    @property({ type: Array })
    timers = [];
    /** */
    @property({ type: Number })
    selectedTimer = undefined;

    /** @static */
    static get styles() {
        return css `
      * {
        transition: all 0.25s ease;
      }

      @media(prefers-color-scheme: light) {
        header {
          color: black;
        }

        nav fluent-anchor::part(control) {
          color: initial;
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

      fluent-listbox {
        flex-grow: 1;
        border: none;
      }

      fluent-option {
        --design-unit: 6;
      }

      fluent-button {
        --design-unit: 6;
        padding: 5px;
      }

      fluent-button::part(control) {
        justify-content: start;
        width: 100%;
      }
    `;
    }

    /** */
    @query('fluent-button')
    fButton = undefined;

    constructor() {
        super();
    }

    /** @private
       * @returns {void}
       */
    toggleVisibility() {
        this.dispatchEvent(new CustomEvent('closesidebar'));
    }

    /** @private
       * @param {number} timerId
       * @returns {void}
       */
    selectTimer(timerId) {
        this.dispatchEvent(new SelectTimerEvent(timerId));
        this.toggleVisibility();
    }

    /** @private
       * @returns {void}
       */
    newTimer() {
        this.dispatchEvent(new CustomEvent('newtimer', {
            bubbles: true,
            composed: true
        }));
        this.toggleVisibility();
    }

    /** @returns {any} */
    render() {
        return html `
      <div class="sidebar ${this.visible ? 'visible' : ''}">
        <div class="overlay" @click="${this.toggleVisibility}"></div>
        <div class="sidebar-content">
          <h3>Trainterval</h3>
          <fluent-listbox>
            ${this.timers?.map(timer => {
            return html `
                  <fluent-option
                    @click=${() => this.selectTimer(timer.id)}
                    selected=${timer.id === this.selectedTimer}
                    value=${timer.name}>
                    ${timer.name}<br />${timer.description || ''}
                  </fluent-option>
                `;
        })}
          </fluent-listbox>
          <fluent-divider></fluent-divider>
          <fluent-button appearance="stealth" @click="${this.newTimer}">
            <icon-add slot="start"></icon-add>
            New Timer
          </fluent-button>
      </div>
    `;
    }
}
