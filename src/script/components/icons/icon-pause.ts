import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// manually in-lining the svg until vite supports it
@customElement('pause-icon')
export class PauseIcon extends LitElement {
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
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_gghKfkXt3RrkXOpdD3Nb2uh99Yv5EXhC"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_gghKfkXt3RrkXOpdD3Nb2uh99Yv5EXhC)"><rect x="67" y="0" width="33" height="100""/><rect x="0" y="0" width="33" height="100"/></g></svg>
      `;
  }
}