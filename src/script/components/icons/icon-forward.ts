import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// manually in-lining the svg until vite supports it
@customElement('forward-icon')
export class ForwardIcon extends LitElement {
  static get styles() {
    return css`
      svg {
        display: block;
        color: var(--foreground-color);
        height: 2em;
        width: 2em;
      }
    `;
  }
  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_KOVDpZBFpo30t6zkDMhJtopDGxIcWA0l"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_KOVDpZBFpo30t6zkDMhJtopDGxIcWA0l)"><path d=" M 80 0 L 100 0 L 100 100 L 80 100 L 80 0 Z  M 0 100 L 80 60 L 80 40 L 0 0 L 0 100 Z " fill-rule="evenodd"/></g></svg>
    `;
  }
}