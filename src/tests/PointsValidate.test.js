import { calculatePointsPerTransaction } from '../utils/helpers';

describe('calculatePointsPerTransaction', () => {
  test('returns 0 points for amounts below or equal to $50', () => {
    expect(calculatePointsPerTransaction({ amount: 50 })).toBe(0);
    expect(calculatePointsPerTransaction({ amount: 47.59 })).toBe(0);
    expect(calculatePointsPerTransaction({ amount: 20 })).toBe(0);
    expect(calculatePointsPerTransaction({ amount: 0 })).toBe(0);
  });

  test('calculate points for amounts between $50 and $100', () => {
    expect(calculatePointsPerTransaction({ amount: 51 })).toBe(1);
    expect(calculatePointsPerTransaction({ amount: 75.34 })).toBe(25);
    expect(calculatePointsPerTransaction({ amount: 99.99 })).toBe(49);
    expect(calculatePointsPerTransaction({ amount: 100 })).toBe(50);
  });

  test('calculate points for amounts over $100', () => {
    expect(calculatePointsPerTransaction({ amount: 101 })).toBe(52);
    expect(calculatePointsPerTransaction({ amount: 120 })).toBe(90);
    expect(calculatePointsPerTransaction({ amount: 150.87 })).toBe(150);
    expect(calculatePointsPerTransaction({ amount: 200 })).toBe(250);
  });
});
