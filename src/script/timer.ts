export class IntervalTimer {
  id?: number;
  name: string;
  description?: string;
  warmUp = 300;
  lowIntensity = 30;
  highIntensity = 60;
  rest = 60;
  coolDown = 300;
  sets = 6;
  rounds = 2;

  constructor(name: string) {
    this.name = name;
  }
}


export enum Phase {
  WARM_UP = 'Warm-Up',
  LOW_INTENSITY = 'Low Intensity',
  HIGH_INTENSITY = 'High Intensity',
  REST = 'Rest',
  COOLDOWN = 'Cooldown'
}

export function className(phase: Phase) {
  return phase.toLowerCase().replaceAll(/[^a-zA-Z]/g, '');
}

export function durationString(n: number | undefined): string {
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

export function parseDuration(duration: string | undefined): number {
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