import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { registerSW } from 'virtual:pwa-register';

import './script/pages/app-home';
import './script/components/active-timer';
import './script/components/counter';
import './script/components/header';
import './script/components/icons/icon-add';
import './script/components/icons/icon-back';
import './script/components/icons/icon-forward';
import './script/components/icons/icon-navigation';
import './script/components/icons/icon-pause';
import './script/components/icons/icon-play';
import './script/components/sidebar';
import './script/components/timer-form';
import './styles/global.css';

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`
      main {
        box-sizing: border-box;
        height: 100%;
      }

      #routerOutlet {
        height: 100%;
      }

      #routerOutlet > * {
        width: 100% !important;
        height: 100%;
      }

      #routerOutlet > .leaving {
        animation: 160ms fadeOut ease-in-out;
      }

      #routerOutlet > .entering {
        animation: 160ms fadeIn linear;
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0.2;
        }

        to {
          opacity: 1;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
      // temporarily cast to any because of a Type bug with the router
      {
        path: (import.meta as any).env.BASE_URL,
        animate: true,
        children: [
          { path: '', component: 'app-home' },
        ],
      } as any,
    ]);
    registerSW({ immediate: true });
  }

  render() {
    return html`
      <div style="height: 100%;">
        <main>
          <div id="routerOutlet"></div>
        </main>
      </div>
    `;
  }
}
