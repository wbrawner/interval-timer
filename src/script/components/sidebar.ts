import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
// @ts-ignore
import Add from '@fluentui/svg-icons/icons/add_20_regular.svg';
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

      pwa-install {
        position: relative;
        box-sizing: border-box;
        outline: none;
        font-family: var(--body-font);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        font-weight: initial;
        font-variation-settings: var(--type-ramp-base-font-variations);
        height: calc((var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px);
        min-width: calc((var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px);
        color: var(--neutral-foreground-rest);
        border-radius: calc(var(--control-corner-radius) * 1px);
        fill: currentcolor;
        cursor: pointer;
      }

      pwa-install::part(openButton) {
        background: var(--neutral-fill-stealth-rest);
        border: calc(var(--stroke-width) * 1px) solid transparent;
        flex-grow: 1;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: start;
        align-items: center;
        padding: 0 calc((10 + (var(--design-unit) * 2 * var(--density))) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        color: inherit;
        border-radius: inherit;
        fill: inherit;
        cursor: inherit;
        font-family: inherit;
        height: 100%;
      }

      pwa-install::part(openButton):hover {
        background: var(--neutral-fill-stealth-hover);
      }

      fluent-button, pwa-install {
        box-sizing: border-box;
        height: 42px;
        padding: 5px;
      }

      fluent-button, button, pwa-install::part(openButton) {
        justify-content: start;
        width: 100%;
      }
    `;
  }

  @query('fluent-button')
    fButton?: HTMLElement;

  constructor() {
    super();
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();

    });
  }

  updated() {
    // Stupid hack to get the button to be left-aligned
    const button: HTMLButtonElement | null | undefined = this.fButton?.shadowRoot?.querySelector('button');
    if (button) {
      button.setAttribute('style', 'justify-content: start;');
    }
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
          <fluent-listbox>
            ${this.timers?.map(timer => {
    return html`
                  <fluent-option
                    @click=${() => this.selectTimer(timer.id!)}
                    selected=${timer.id === this.selectedTimer}
                    value=${timer.name}>${timer.name}</fluent-option>
                `;
  })}
          </fluent-listbox>
          <fluent-divider></fluent-divider>
          <fluent-button appearance="stealth" @click="${this.newTimer}">
            <img slot="start" src="${Add}" aria-hidden="true" />
            New Timer
          </fluent-button>
      </div>
    `;
  }
}
