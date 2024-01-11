import { EnterScoreResult } from "../pages/GameRoom/InGame/EnterHoleScore/EnterHoleScore";
import { GameRule } from "../pages/MakeGame/Rule/type";

export function divideFrontAndBackScores(holeScores: number[]) {
  const FRONT_FIRST_INDEX = 0;
  const FRONT_LAST_INDEX = 8;

  return {
    frontNineScores: holeScores.slice(FRONT_FIRST_INDEX, FRONT_LAST_INDEX + 1),
    backNineScores: holeScores.slice(FRONT_LAST_INDEX + 1),
  };
}

//
export function checkDoubleCondition(
  doubleConditions: GameRule["specialBetRequirements"],
  parCount: number,
  playerScore: EnterScoreResult["playerScores"]
) {
  const playerScoreFromPar = Object.entries(playerScore).map(
    ([_id, score]) => score - parCount
  );
  const resultDoubleConditons: string[] = [];
  if (doubleConditions.includes("none")) return resultDoubleConditons;
  if (doubleConditions.includes("buddy") && playerScoreFromPar.includes(-2)) {
    resultDoubleConditons.push("buddy");
  }
  // 트리플 이상 처리
  if (doubleConditions.includes("triple")) {
    //
  }
  // 과반 이상 동타 확인

  return resultDoubleConditons;
}

/**
 *
 * @param isDouble 배판인지 유무
 * @param betAmountPerStroke 1타당 금액
 * @param parCount 해당 Hole의 Par
 * @param playerScore 게임에 참여하는 유저들의 점수 객체 {[userId] : 점수}
 * @returns 점수에 따른 유저별 금액 변화량 객체 { [userId] : 금액 }
 */
export function calculateChangeMoney(
  isDouble: boolean,
  betAmountPerStroke: number,
  parCount: number,
  /** 게임에 참여중인 playerScore만 포함해야함  */
  playerScore: EnterScoreResult["playerScores"]
) {
  const playerInfoForMoneyCalculate = Object.entries(playerScore).map(
    ([userId, score]) => {
      let otherPlayerScoreSum = 0;
      let otherPlayerCount = 0;
      Object.entries(playerScore).map(([id, score]) => {
        if (userId !== id) {
          otherPlayerScoreSum += score;
          otherPlayerCount += 1;
        }
      });
      return {
        userId,
        otherPlayerCount,
        otherPlayerScoreSum,
        scoreGapFromPar: score - parCount,
      };
    }
  );

  const usersChangeMoney: Record<string, number> = {};
  playerInfoForMoneyCalculate.forEach((playerInfo) => {
    let changeAmount = 0;
    // - (1타당 금액 * (나를 제외한 사람수) * (내 이번홀 점수  - 이번 홀 Par) )
    changeAmount -=
      betAmountPerStroke *
      playerInfo.otherPlayerCount *
      (playerScore[playerInfo.userId] - parCount);
    // + (1타당 금액 * (나를 제외한 사람들의 점수 합))
    changeAmount += betAmountPerStroke * playerInfo.otherPlayerScoreSum;
    if (isDouble) {
      changeAmount *= 2;
    }
    usersChangeMoney[playerInfo.userId] = changeAmount;
  });
  return usersChangeMoney;
}
