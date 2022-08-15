import { durationString, parseDuration } from '../src/script/timer';
import { describe, it } from 'vitest';
import { assert } from 'chai';

describe('durationString()', function () {
  it('should zero-pad seconds < 10', function () {
    assert.equal(durationString(9), '00:09');
  });

  it('should do nothing to seconds >= 10', function () {
    assert.equal(durationString(12), '00:12');
  });

  it('should zero-pad minutes < 10', function () {
    assert.equal(durationString(72), '01:12');
  });

  it('should do nothing to minutes >= 10', function () {
    assert.equal(durationString(642), '10:42');
  });
});

describe('parseDuration()', function () {
  it('should parse seconds < 10', function () {
    assert.equal(parseDuration('00:09'), 9);
  });

  it('should parse seconds >= 10', function () {
    assert.equal(parseDuration('00:42'), 42);
  });

  it('should parse minutes < 10', function () {
    assert.equal(parseDuration('01:12'), 72);
  });

  it('should parse minutes >= 10', function () {
    assert.equal(parseDuration('10:42'), 642);
  });

  it('should parse non-padded minutes', function () {
    assert.equal(parseDuration('3:42'), 222);
  });

  it('should parse non-existent minutes with a semicolon', function () {
    assert.equal(parseDuration(':42'), 42);
  });

  it('should parse non-existent minutes without a semicolon', function () {
    assert.equal(parseDuration('42'), 42);
  });

  it('should parse non-existent minutes without a semicolon and without padding', function () {
    assert.equal(parseDuration('2'), 2);
  });
});