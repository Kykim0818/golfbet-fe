// checkDoubleCondition.test.ts

import { checkDoubleCondition } from "../score";

describe("checkDoubleCondition", () => {
  test('should return empty array for "none" condition', () => {
    const result = checkDoubleCondition(4, ["none"], {
      player1: 3,
      player2: 4,
    });
    expect(result).toEqual([]);
  });

  test('should return "buddy" for "buddy" condition with -2 score', () => {
    const result = checkDoubleCondition(4, ["buddy"], {
      player1: -2,
      player2: 4,
    });
    expect(result).toEqual(["buddy"]);
  });

  test('should return "triple" for "triple" condition with scores over half par', () => {
    const result = checkDoubleCondition(6, ["triple"], {
      player1: 3,
      player2: 2,
    });
    expect(result).toEqual([]);
  });

  test('should return "twoOrMoreTie" for "twoOrMoreTie" condition with ties', () => {
    const result = checkDoubleCondition(4, ["twoOrMoreTie"], {
      player1: 3,
      player2: 3,
    });
    expect(result).toEqual(["twoOrMoreTie"]);
  });

  test('should return "[]" for "threeOrMoreTie" condition with ties', () => {
    const result = checkDoubleCondition(4, ["threeOrMoreTie"], {
      player1: 3,
      player2: 3,
      player3: 2,
      player4: 2,
    });
    expect(result).toEqual([]);
  });
  test('should return "buddy,triple"', () => {
    const result = checkDoubleCondition(4, ["buddy", "triple"], {
      player1: 3,
      player2: 3,
      player3: 3,
      player4: -2,
    });
    expect(result).toEqual(["buddy", "triple"]);
  });
});
