import { GameInfo } from "./MakeGame";

export function isCompleteMakingGameInfo(gameInfo: GameInfo) {
  if (gameInfo.golfCenter.id === "") return false;
  if (gameInfo.golfCenter.frontNineCourse.id === 0) return false;
  if (gameInfo.golfCenter.backNineCourse.id === 0) return false;
  if (gameInfo.betAmountPerStroke === 0) return false;
  if (gameInfo.bettingLimit === 0) return false;
  return true;
}

/** 게임생성시 필요한 데이터 gameInfo 초기 기본 값  */
export const defaultGameInfo: GameInfo = {
  gameId: "",
  gameType: "field",
  startDate: "",
  golfCenter: {
    id: "",
    name: "",
    region: "",
    frontNineCourse: {
      id: 0,
      name: "",
      pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
    },
    backNineCourse: {
      id: 0,
      name: "",
      pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
    },
  },
  currentHole: 1,
  betType: "stroke",
  playerCount: 4,
  gameRule: {
    handiType: ["backHandicap"],
    specialBetRequirements: ["buddy", "triple", "threeOrMoreTie"],
    ddang: ["onlyLastPlace"],
    nearestType: ["separateAmount"],
  },
  gameState: "",
  isBackNineStart: false,
  nearestAmount: 0,
  betAmountPerStroke: 0,
  bettingLimit: 0,
};
