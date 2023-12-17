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
      <app-sidebar
        ?visible="${this.showSidebar}"
        .timers=${this.timers}
        .selectedTimer=${this.selectedTimer}
        @closesidebar="${this.closeSidebar}"></app-sidebar>
    `;
  }
}
