export function getCurrentPar(
  currentHole: number,
  frontNinePars: number[],
  backNinePars: number[]
) {
  return frontNinePars.concat(backNinePars)[currentHole - 1];
}
