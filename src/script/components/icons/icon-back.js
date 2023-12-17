import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// manually in-lining the svg until vite supports it
/** @extends LitElement */
@customElement('back-icon')
export class BackIcon extends LitElement {
    /** @static */
    static get styles() {
        return css `
      svg {
        display: block;
        color: var(--foreground-color);
        height: 2em;
        width: 2em;
      }
    `;
    }
    /** @returns {any} */
    render() {
        return html `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_hST7dVCHzucXN2usmbRVwXvGcw614fxw"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_hST7dVCHzucXN2usmbRVwXvGcw614fxw)"><path d=" M 0 0 L 20 0 L 20 100 L 0 100 L 0 0 Z  M 100 100 L 20 60 L 20 40 L 100 0 L 100 100 Z " fill-rule="evenodd"/></g></svg>
    `;
    }
}
