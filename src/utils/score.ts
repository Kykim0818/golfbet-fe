export function divideFrontAndBackScores(holeScores: number[]) {
  const FRONT_FIRST_INDEX = 0;
  const FRONT_LAST_INDEX = 8;

  return {
    frontNineScores: holeScores.slice(FRONT_FIRST_INDEX, FRONT_LAST_INDEX + 1),
    backNineScores: holeScores.slice(FRONT_LAST_INDEX + 1),
  };
}
