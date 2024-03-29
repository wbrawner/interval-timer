import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// manually in-lining the svg until vite supports it
@customElement('navigation-icon')
export class NavigationIcon extends LitElement {
  static get styles() {
    return css`
            svg {
                display: block;
                color: white;
            }
        `;
  }
  render() {
    return html`
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M2 4.5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h15a.5.5 0 000-1h-15z"/></svg>
        `;
  }
}
