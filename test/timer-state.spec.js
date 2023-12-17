import { TimerState } from '../src/js/timer-state.js';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { IntervalTimer, Phase } from '../src/js/timer.js';

describe('TimerState.toggle()', function () {
    const timer = new IntervalTimer('test');
    it('should change active to true from false and vice-versa', function () {
        const state = new TimerState(timer);
        assert.equal(state.active(), false);
        state.toggle();
        assert.equal(state.active(), true);
        state.toggle();
        assert.equal(state.active(), false);
    });
});

describe('TimerState.goForward()', function () {
    const timer = new IntervalTimer('test');
    timer.warmUp = 10;
    timer.lowIntensity = 22;
    timer.highIntensity = 34;
    timer.rest = 46;
    timer.coolDown = 58;
    timer.sets = 2;
    timer.rounds = 2;

    it('should start in warm-up', function () {
        const state = new TimerState(timer);
        assert.equal(state.phase, Phase.WARM_UP);
        assert.equal(state.timeRemaining, timer.warmUp);
        assert.equal(state.set, 2);
        assert.equal(state.round, 2);
    });

    it('should move to low intensity after warm-up', function () {
        const state = new TimerState(timer);
        state.goForward();
        assert.equal(state.phase, Phase.LOW_INTENSITY);
        assert.equal(state.timeRemaining, timer.lowIntensity);
        assert.equal(state.set, 2);
        assert.equal(state.round, 2);
    });

    it('should move to high intensity after low intensity', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.HIGH_INTENSITY);
        assert.equal(state.timeRemaining, timer.highIntensity);
        assert.equal(state.set, 2);
        assert.equal(state.round, 2);
    });

    it('should move to low intensity after high intensity for set 2 round 2', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.LOW_INTENSITY);
        assert.equal(state.timeRemaining, timer.lowIntensity);
        assert.equal(state.set, 1);
        assert.equal(state.round, 2);
    });

    it('should move to high intensity after low intensity for set 2 round 2', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.HIGH_INTENSITY);
        assert.equal(state.timeRemaining, timer.highIntensity);
        assert.equal(state.set, 1);
        assert.equal(state.round, 2);
    });

    it('should move to rest after high intensity for set 2 round 2', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.REST);
        assert.equal(state.timeRemaining, timer.rest);
        assert.equal(state.set, 1);
        assert.equal(state.round, 2);
    });

    it('should move to low intensity after rest for set 2 round 1', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.LOW_INTENSITY);
        assert.equal(state.timeRemaining, timer.lowIntensity);
        assert.equal(state.set, 2);
        assert.equal(state.round, 1);
    });

    it('should move to high intensity after low intensity for set 2 round 1', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.HIGH_INTENSITY);
        assert.equal(state.timeRemaining, timer.highIntensity);
        assert.equal(state.set, 2);
        assert.equal(state.round, 1);
    });

    it('should move to low intensity after high intensity for set 1 round 1', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.LOW_INTENSITY);
        assert.equal(state.timeRemaining, timer.lowIntensity);
        assert.equal(state.set, 1);
        assert.equal(state.round, 1);
    });

    it('should move to high intensity after low intensity for set 1 round 1', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.HIGH_INTENSITY);
        assert.equal(state.timeRemaining, timer.highIntensity);
        assert.equal(state.set, 1);
        assert.equal(state.round, 1);
    });

    it('should move to cooldown after high intensity for set 1 round 1', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.COOLDOWN);
        assert.equal(state.timeRemaining, timer.coolDown);
        assert.equal(state.set, 1);
        assert.equal(state.round, 1);
    });

    it('should set the time remaining to 0 after cooldown for set 1 round 1', function () {
        const state = new TimerState(timer);
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        state.goForward();
        assert.equal(state.phase, Phase.COOLDOWN);
        assert.equal(state.timeRemaining, 0);
        assert.equal(state.set, 1);
        assert.equal(state.round, 1);
    });
});

describe('TimerState.goBack()', function () {
    const timer = new IntervalTimer('test');
    timer.warmUp = 10;
    timer.lowIntensity = 22;
    timer.highIntensity = 34;
    timer.rest = 46;
    timer.coolDown = 58;
    timer.sets = 2;
    timer.rounds = 2;

    it('should move to high intensity from cooldown', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        assert.equal(state.phase, Phase.HIGH_INTENSITY);
        assert.equal(state.timeRemaining, timer.highIntensity);
        assert.equal(state.set, 1);
        assert.equal(state.round, 1);
    });

    it('should move to low intensity from high intensity for set 1 round 1', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.LOW_INTENSITY);
        assert.equal(state.timeRemaining, timer.lowIntensity);
        assert.equal(state.set, 1);
        assert.equal(state.round, 1);
    });

    it('should move to high intensity from low intensity for set 2 round 1', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.HIGH_INTENSITY);
        assert.equal(state.timeRemaining, timer.highIntensity);
        assert.equal(state.set, 2);
        assert.equal(state.round, 1);
    });

    it('should move to low intensity from high intensity for set 2 round 1', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.LOW_INTENSITY);
        assert.equal(state.timeRemaining, timer.lowIntensity);
        assert.equal(state.set, 2);
        assert.equal(state.round, 1);
    });

    it('should move to rest from low intensity for set 2 round 2', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.REST);
        assert.equal(state.timeRemaining, timer.rest);
        assert.equal(state.set, 1);
        assert.equal(state.round, 2);
    });

    it('should move to high intensity from rest for set 1 round 2', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.HIGH_INTENSITY);
        assert.equal(state.timeRemaining, timer.highIntensity);
        assert.equal(state.set, 1);
        assert.equal(state.round, 2);
    });

    it('should move to low intensity from high intensity for set 1 round 2', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.LOW_INTENSITY);
        assert.equal(state.timeRemaining, timer.lowIntensity);
        assert.equal(state.set, 1);
        assert.equal(state.round, 2);
    });

    it('should move to high intensity from low intensity for set 2 round 2', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.HIGH_INTENSITY);
        assert.equal(state.timeRemaining, timer.highIntensity);
        assert.equal(state.set, 2);
        assert.equal(state.round, 2);
    });

    it('should move to low intensity from high intensity for set 2 round 2', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.LOW_INTENSITY);
        assert.equal(state.timeRemaining, timer.lowIntensity);
        assert.equal(state.set, 2);
        assert.equal(state.round, 2);
    });

    it('should move to warm up from low intensity for set 2 round 2', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        assert.equal(state.phase, Phase.WARM_UP);
        assert.equal(state.timeRemaining, timer.warmUp);
        assert.equal(state.set, 2);
        assert.equal(state.round, 2);
    });

    it('should reset the timer from warm up', function () {
        const state = new TimerState(timer);
        state.phase = Phase.COOLDOWN;
        state.timeRemaining = 0;
        state.set = 1;
        state.round = 1;
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.goBack();
        state.timeRemaining = 0;
        state.goBack();
        assert.equal(state.phase, Phase.WARM_UP);
        assert.equal(state.timeRemaining, timer.warmUp);
        assert.equal(state.set, 2);
        assert.equal(state.round, 2);
    });
});
