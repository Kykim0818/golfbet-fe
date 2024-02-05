import { EnterScoreResult } from "../pages/GameRoom/InGame/EnterHoleScore/EnterHoleScore";
import { GameInfo } from "../pages/MakeGame/MakeGame";
import { GameRule } from "../pages/MakeGame/Rule/type";
import { deepClone } from "./deepClone";

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
  currentPar: number,
  doubleConditions: GameRule["specialBetRequirements"],
  playerScore: EnterScoreResult["playerScores"]
) {
  const playerScoresArr = Object.entries(playerScore).map(
    ([_id, score]) => score
  );
  const resultDoubleConditons: string[] = [];
  // 배판 조건 없음
  if (doubleConditions.includes("none")) return resultDoubleConditons;
  // 버디 (Par 기준 -1 )
  if (doubleConditions.includes("buddy") && playerScoresArr.includes(-1)) {
    resultDoubleConditons.push("buddy");
  }
  // 트리플 이상 처리
  if (doubleConditions.includes("triple")) {
    // Par 기준 절반 초과 타수 Par 3 -> 2타 , Par 4,5 -> 3타, Par 6 -> 4타
    const overHalfPar = Math.floor(currentPar / 2) + 1;
    if (playerScoresArr.some((score) => score >= overHalfPar)) {
      resultDoubleConditons.push("triple");
    }
  }
  // 게임 포기한 사람 처리 완료된 점수임
  // 과반이상 동타 계산을 동적으로 하기 위함
  const inGamePlayerCount = Object.keys(playerScore).length;
  // 1. 두번(2명이상 동타, 3명이상 동타) 반복 인데 이후 용어 통일 될 수 있어서 우선 중복 코드로 작성
  if (inGamePlayerCount > 2) {
    const overHalfPlayerCount = Math.floor(playerScoresArr.length / 2) + 1;
    const scoreMap = new Map<number, number>();
    playerScoresArr.forEach((score) => {
      if (scoreMap.has(score)) {
        scoreMap.set(score, (scoreMap.get(score) ?? 0) + 1);
        return;
      }
      scoreMap.set(score, 1);
    });

    let isOverHalfPlayerTie = false;
    scoreMap.forEach((score, userCount) => {
      if (overHalfPlayerCount <= userCount) isOverHalfPlayerTie = true;
    });

    if (isOverHalfPlayerTie) resultDoubleConditons.push("twoOrMoreTie");
  }
  // 2. 동일 로직
  if (inGamePlayerCount > 3) {
    const overHalfPlayerCount = Math.floor(playerScoresArr.length / 2) + 1;
    const scoreMap = new Map<number, number>();
    playerScoresArr.forEach((score) => {
      if (scoreMap.has(score)) {
        scoreMap.set(score, (scoreMap.get(score) ?? 0) + 1);
        return;
      }
      scoreMap.set(score, 1);
    });
    let isOverHalfPlayerTie = false;
    scoreMap.forEach((userCount, score) => {
      if (overHalfPlayerCount <= userCount) isOverHalfPlayerTie = true;
    });

    if (isOverHalfPlayerTie) resultDoubleConditons.push("threeOrMoreTie");
  }

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
  /** 게임에 참여중인 playerScore만 포함해야함  */
  playerScore: EnterScoreResult["playerScores"]
) {
  const playerInfoForMoneyCalculate = Object.entries(playerScore).map(
    ([userId, _score]) => {
      let otherPlayerScoreSum = 0;
      let otherPlayerCount = 0;
      Object.entries(playerScore).forEach(([id, score]) => {
        if (userId !== id) {
          otherPlayerScoreSum += score;
          otherPlayerCount += 1;
        }
      });
      return {
        userId,
        otherPlayerCount,
        otherPlayerScoreSum,
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
      playerScore[playerInfo.userId];
    // + (1타당 금액 * (나를 제외한 사람들의 점수 합))
    changeAmount += betAmountPerStroke * playerInfo.otherPlayerScoreSum;
    if (isDouble) {
      changeAmount *= 2;
    }
    usersChangeMoney[playerInfo.userId] = changeAmount;
  });
  return usersChangeMoney;
}

/**
 * 니어,롱기 규칙으로 인한 돈 변화량 계산 하는 함수
 * @param isDouble 배판 인지 확인
 * @param nearLong 니어리스트,롱기스트로 선택된 유저 id
 * @param playersMoneyChange 배판이나 땅 규칙 반영된 돈 변화량
 * @param gameInfo 게임방 정보
 * */
export function applyNearLongRule(
  isDouble: boolean,
  nearLong: string[],
  playersMoneyChange: Record<string, number>,
  gameInfo: GameInfo
) {
  const {
    betAmountPerStroke,
    nearestAmount,
    gameRule: { nearestType },
  } = gameInfo;
  const [nearLongRule] = nearestType;
  const [targetUserId] = nearLong;

  // 룰에 따라 적용할 nearLong 금액
  const nearLongMoney =
    nearLongRule === "includeInGame"
      ? // 게임에 포함일 경우 배판이면 2배, 아니면 타당 금액
        isDouble
        ? betAmountPerStroke * 2
        : betAmountPerStroke
      : // 별도 지정이면 지정 금액으로 처리
        nearestAmount;
  const appliedNearLong = deepClone(playersMoneyChange);
  Object.entries(playersMoneyChange).forEach(([userId, moneyChange]) => {
    if (userId === targetUserId) return;
    if (userId !== targetUserId) {
      appliedNearLong[userId] = moneyChange - nearLongMoney;
    }
    appliedNearLong[targetUserId] =
      appliedNearLong[targetUserId] + nearLongMoney;
  });
  return appliedNearLong;
}
