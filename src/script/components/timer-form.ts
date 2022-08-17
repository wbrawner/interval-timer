import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { durationString, IntervalTimer, parseDuration } from '../timer';
import { TimerService } from '../timer-service';

@customElement('timer-form-dialog')
export class TimerFormDialog extends LitElement {
  @property({ type: Boolean }) visible = false;
  @property({ type: Boolean }) saving = false;
  @property({ type: Object }) timer?: IntervalTimer;
  @property({ type: Object }) timerService?: TimerService;
  private durationPattern = '[0-5]?[0-9]+(:[0-5][0-9]){0,2}';

  static get styles() {
    return css`
      .dialog {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        height: var(--dialog-height);
        width: var(--dialog-width);
        max-height: 100%;
        max-width: 100%;
        padding: 1em;
      }

      h2 {
        margin: 0;
        user-select: none;
      }

      form {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        margin: 1em 0;
      }

      ::part(control) {
        --dialog-height: 764px;
        box-sizing: border-box;
        max-height: 100vh;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `;
  }

  constructor() {
    super();
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.target !== document.body) {
        return;
      }
      switch (event.key) {
        case 'Escape':
          this.toggleVisibility();
          break;
      }
    });
  }

  @query('#timer-id')
  timerId: HTMLInputElement | null | undefined;

  @query('#timer-name')
  timerName: HTMLInputElement | null | undefined;

  @query('#timer-description')
  timerDescription: HTMLInputElement | null | undefined;

  @query('#timer-warmup')
  timerWarmUp: HTMLInputElement | null | undefined;

  @query('#timer-low')
  timerLowIntensity: HTMLInputElement | null | undefined;

  @query('#timer-hi')
  timerHighIntensity: HTMLInputElement | null | undefined;

  @query('#timer-rest')
  timerRest: HTMLInputElement | null | undefined;

  @query('#timer-cool')
  timerCooldown: HTMLInputElement | null | undefined;

  @query('#timer-sets')
  timerSets: HTMLInputElement | null | undefined;

  @query('#timer-rounds')
  timerRounds: HTMLInputElement | null | undefined;

  private toggleVisibility() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  private async save() {
    const id: string = this.timerId?.value || '';
    const name = this.timerName?.value;
    if (!name) {
      // TODO: Show errors in form
      alert('Name is required');
      return;
    }
    const timer = new IntervalTimer(name);
    timer.id = Number.parseInt(id);
    timer.description = this.timerDescription?.value;
    timer.warmUp = parseDuration(this.timerWarmUp?.value);
    timer.lowIntensity = parseDuration(this.timerLowIntensity?.value);
    timer.highIntensity = parseDuration(this.timerHighIntensity?.value);
    timer.rest = parseDuration(this.timerRest?.value);
    timer.coolDown = parseDuration(this.timerCooldown?.value);
    timer.sets = Number.parseInt(this.timerSets?.value || '0') || 1;
    timer.rounds = Number.parseInt(this.timerRounds?.value || '0') || 1;
    this.saving = true;
    await this.timerService?.save(timer);
    this.saving = false;
    // TODO: Clear form
    this.toggleVisibility();
  }

  private async delete() {
    const id = Number.parseInt(this.timerId?.value || '');
    await this.timerService?.delete(id);
    this.toggleVisibility();
  }

  private deleteButton() {
    if (!this.timer?.id) {
      return null;
    }
    return html`
      <fluent-button
        appearance="outline"
        tabindex="0"
        @click=${this.delete}
        style="margin-top: 1em;">Delete</fluent-button>
    `;
  }

  private durationString(duration: number | undefined) {
    if (!duration) {
      return '';
    } else {
      return durationString(duration);
    }
  }

  render() {
    let body;
    if (this.saving) {
      return html`
        <div class="dialog">
          <p>Saving...</p>
        </div>
      `;
    } else {
      const title = this.timer?.id ? 'Edit Timer' : 'New Timer';
      body = html`
        <div class="dialog ${this.timer?.id ? 'tall' : ''}">
          <h2>${title}</h2>
          <form @submit=${this.save}>
            <input
              id="timer-id"
              type="hidden"
              name="id"
              .value=${this.timer?.id?.toString() || ''} />
            <fluent-text-field
              id="timer-name"
              appearance="outline"
              placeholder="My Timer"
              .value=${this.timer?.name || ''}>Name</fluent-text-field>
            <fluent-text-area
              id="timer-description"
              appearance="outline"
              placeholder="More details"
              .value=${this.timer?.description || ''}>Description</fluent-text-area>
            <fluent-text-field
              id="timer-warmup"
              appearance="outline"
              placeholder="05:00"
              pattern="${this.durationPattern}"
              .value=${this.durationString(this.timer?.warmUp)}>Warm Up</fluent-text-field>
              <fluent-text-field
              id="timer-low"
              appearance="outline"
              placeholder="00:30"
              pattern="${this.durationPattern}"
              .value=${this.durationString(this.timer?.lowIntensity)}>Low Intensity</fluent-text-field>
              <fluent-text-field
              id="timer-hi"
              appearance="outline"
              placeholder="01:00"
              pattern="${this.durationPattern}"
              .value=${this.durationString(this.timer?.highIntensity)}>High Intensity</fluent-text-field>
              <fluent-text-field
              id="timer-rest"
              appearance="outline"
              placeholder="01:00"
              pattern="${this.durationPattern}"
              .value=${this.durationString(this.timer?.rest)}>Rest</fluent-text-field>
              <fluent-text-field
              id="timer-cool"
              appearance="outline"
              placeholder="05:00"
              pattern="${this.durationPattern}"
              .value=${this.durationString(this.timer?.coolDown)}>Cooldown</fluent-text-field>
            <fluent-text-field
              id="timer-sets"
              appearance="outline"
              placeholder="4"
              .value=${this.timer?.sets}>Sets</fluent-text-field>
            <fluent-text-field
              id="timer-rounds"
              appearance="outline"
              placeholder="2"
              .value=${this.timer?.rounds}>Rounds</fluent-text-field>
            <fluent-button
              appearance="accent"
              tabindex="0"
              @click=${this.save}
              style="margin: 1em 0;">Save</fluent-button>
            <fluent-button appearance="outline" tabindex="0" @click=${this.toggleVisibility}>Cancel</fluent-button>
            ${this.deleteButton()}
          </form>
        </div>
      `;
    }
    return html`
      <fluent-dialog ?hidden=${!this.visible} trap-focus modal class=${this.timer?.id ? 'tall' : ''}>
        ${body}
      </fluent-dialog>
    `;
  }
}
