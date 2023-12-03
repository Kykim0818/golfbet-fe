import { GameInfo } from "./MakeGame";

export function isCompleteMakingGameInfo(gameInfo: GameInfo) {
  console.log("isCompleteMakingGameInfo", gameInfo);
  if (gameInfo.golfCenter.id === "") return false;
  if (gameInfo.golfCenter.frontNineCourse.id === 0) return false;
  if (gameInfo.golfCenter.backNineCourse.id === 0) return false;
  if (gameInfo.betAmountPerStroke === 0) return false;
  if (gameInfo.bettingLimit === 0) return false;
  return true;
}
