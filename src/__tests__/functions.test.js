const { randomTransform } = require('../utils/functions');

describe('randomTransform', () => {
  test('when passed no values or only one value returns 0', () => {
    expect(randomTransform()).toBe(0);
    expect(randomTransform(2)).toBe(0);
  });
  test('when passed 2 values of the same number returns that number', () => {
    expect(randomTransform(0, 0)).toBe(0);
    expect(randomTransform(3, 3)).toBe(3);
  });
  test('returns a whole number with no decimals', () => {
    const min = 1;
    const max = 3;
    const result = randomTransform(min, max);
    expect(Number.isInteger(result)).toBeTruthy();
  })
  test('when passed a min and max number returns a random number between the 2 numbers', () => {
    const min = 1;
    const max = 4;
    expect(randomTransform(min, max)).toBeGreaterThanOrEqual(1);
    expect(randomTransform(min, max)).toBeLessThanOrEqual(4);
  });
  test('works for negative integers', () => {
    const min = -5;
    const max = 5;
    expect(randomTransform(min, max)).toBeGreaterThanOrEqual(-5);
    expect(randomTransform(min, max)).toBeLessThanOrEqual(5);
  })
})