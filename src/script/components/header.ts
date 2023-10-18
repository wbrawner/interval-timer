import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { IntervalTimer } from '../timer';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) apptitle?: string;
  @property({ type: Array }) timers?: IntervalTimer[];
  @property({ type: Number }) selectedTimer?: number;
  @property({ type: Boolean }) showSidebar = false;

  static get styles() {
    return css`
      * {
        user-select: none;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--app-color-primary);
        color: white;
        height: 4em;
        padding: 0 1em;
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 20px;
        font-weight: bold;
      }

      nav fluent-anchor {
        margin-left: 10px;
      }

      #menu-button-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #menu-button-block img {
        display: block;
      }

      .spacer {
        width: 1em;
      }

      @media(prefers-color-scheme: light) {
        nav fluent-anchor::part(control) {
          color: initial;
        }
      }
    `;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  closeSidebar() {
    this.showSidebar = false;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <div id="menu-button-block">
          <fluent-button appearance="stealth" @click="${this.toggleSidebar}">
            <navigation-icon></navigation-icon>
          </fluent-button>
          <div class="spacer"></div>
          <h1>${this.apptitle || 'Trainterval'}</h1>
        </div>
        <slot name="actions"></slot>
      </header>
      <app-sidebar
        ?visible="${this.showSidebar}"
        .timers=${this.timers}
        .selectedTimer=${this.selectedTimer}
        @closesidebar="${this.closeSidebar}"></app-sidebar>
    `;
  }
}
