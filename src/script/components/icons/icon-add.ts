import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// manually in-lining the svg until vite supports it
@customElement('icon-add')
export class AddIcon extends LitElement {
  static get styles() {
    return css`
            svg {
                display: block;
                color: var(--foreground-color);
            }
        `;
  }
  render() {
    return html`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5a.5.5 0 00-1 0V9H2.5a.5.5 0 000 1H9v6.5a.5.5 0 001 0V10h6.5a.5.5 0 000-1H10V2.5z"/></svg>
    `;
  }
}