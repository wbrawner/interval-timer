export class IntervalTimer {
  /**
   * @type {number}
   */
  id;
  /**
   * @type {string}
   */
  name;
  /**
   * @type {string}
   */
  description;
  warmUp = 300;
  lowIntensity = 30;
  highIntensity = 60;
  rest = 60;
  coolDown = 300;
  sets = 6;
  rounds = 2;

  /**
   * @param {string} name The name for the timer
   */
  constructor(name) {
    this.name = name;
  }
}


export const Phase = Object.freeze({
  WARM_UP: 'Warm-Up',
  LOW_INTENSITY: 'Low Intensity',
  HIGH_INTENSITY: 'High Intensity',
  REST: 'Rest',
  COOLDOWN: 'Cooldown'
});

/**
 * @param {Phase} phase
 */
export function className(phase) {
  return phase.toLowerCase().replaceAll(/[^a-zA-Z]/g, '');
}

/**
 * Formats a number in minutes and seconds (mm:ss)
 * @param {number | undefined} n the number (in seconds) to format
 * @returns {string} The formatted string (mm:ss)
 */
export function durationString(n) {
  if (typeof n !== 'number') return '';
  let remainder = n;
  let s = '';
  if (remainder > 60) {
    const minutes = Math.floor(remainder / 60);
    if (minutes < 10) {
      s += '0';
    }
    s += minutes + ':';
    remainder %= 60;
  } else {
    s += '00:';
  }
  if (remainder < 10) {
    s += 0;
  }
  s += remainder;
  return s;
}

/**
 * Given a string representing a duration, return the time (in seconds)
 * @param duration {string | undefined} A duration string (e.g. 5:00 for 5 minutes)
 * @returns {number} time (in seconds) that the duration represents, or 0 if duration is falsey
 */
export function parseDuration(duration) {
  if (!duration) return 0;
  const [minutes, seconds] = duration.split(':');
  if (!seconds && !minutes) return 0;
  if (!seconds) {
    return Number.parseInt(minutes);
  }
  if (!minutes) {
    return Number.parseInt(seconds);
  }
  return (Number.parseInt(minutes) * 60) + Number.parseInt(seconds);
}
