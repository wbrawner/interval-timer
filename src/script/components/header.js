import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

/** @extends LitElement */
@customElement('app-header')
export class AppHeader extends LitElement {
    /** */
    @property({ type: String })
    apptitle = undefined;
    /** */
    @property({ type: Array })
    timers = undefined;
    /** */
    @property({ type: Number })
    selectedTimer = undefined;
    /** @default false */
    @property({ type: Boolean })
    showSidebar = false;

    /** @static */
    static get styles() {
        return css `


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

    /** @returns {void} */
    toggleSidebar() {
        this.showSidebar = !this.showSidebar;
    }

    /** @returns {void} */
    closeSidebar() {
        this.showSidebar = false;
    }

    constructor() {
        super();
    }

    /** @returns {any} */
    render() {
        return html `
      <app-sidebar
        ?visible="${this.showSidebar}"
        .timers=${this.timers}
        .selectedTimer=${this.selectedTimer}
        @closesidebar="${this.closeSidebar}"></app-sidebar>
    `;
    }
}
