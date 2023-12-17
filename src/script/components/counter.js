import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

/** @extends LitElement */
@customElement('labeled-counter')
export class Counter extends LitElement {
    /** */
    @property({ type: String })
    label = undefined;
    /** */
    @property({ type: String })
    value = undefined;

    /** @static */
    static get styles() {
        return css `
      .label {
        font-size: calc();
        text-transform: uppercase;
      }

      .label, .value {
        margin: 0;
        padding: 0;
        text-align: center;
      }

      .value {
        font-size: 2em;
        font-weight: bold;
      }
    `;
    }

    constructor() {
        super();
    }

    /** @returns {any} */
    render() {
        return html `
      <div class="counter">
        <p class="label">${this.label}</p>
        <p class="value">${this.value}</p>
      </div>
    `;
    }
}
