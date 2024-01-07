import { GameRoomInfo } from "../../pages/GameRoom/GameRoom";
import { GameInfo } from "../../pages/MakeGame/MakeGame";
import { SocketGameRoomInfo } from "./type";

/** 점수 미입력 상태 표시 값 */
export const UNENTERED_HOLE_SCORE = 999;
// server GameRoomInfo Data -> client GameRoomInfo Data
export function convertSocketDataToUiGameRoomInfo(
  gameRoomInfo: SocketGameRoomInfo
): GameRoomInfo {
  return {
    gameInfo: {
      gameId: gameRoomInfo.gameInfo.gameId,
      gameType: gameRoomInfo.gameInfo.gameType,
      gameState: gameRoomInfo.gameInfo.gameState,
      startDate: `${gameRoomInfo.gameInfo.createdDate}`,
      golfCenter: {
        id: `${gameRoomInfo.gameInfo.centerInfo.centerId}`,
        name: gameRoomInfo.gameInfo.centerInfo.name,
        region: "",
        frontNineCourse: {
          // number 로 변경
          id: gameRoomInfo.gameInfo.centerInfo.frontNineCourse.courseId,
          name: gameRoomInfo.gameInfo.centerInfo.frontNineCourse.courseName,
          pars: gameRoomInfo.gameInfo.centerInfo.frontNineCourse.coursePars,
        },
        backNineCourse: {
          // number 로 변경
          id: gameRoomInfo.gameInfo.centerInfo.backNineCourse.courseId,
          name: gameRoomInfo.gameInfo.centerInfo.backNineCourse.courseName,
          pars: gameRoomInfo.gameInfo.centerInfo.backNineCourse.coursePars,
        },
      },
      betType: gameRoomInfo.gameInfo.betType,
      playerCount: gameRoomInfo.gameInfo.playerCount,
      gameRule: {
        handiType: [`${gameRoomInfo.gameInfo.gameRule.handicapType}`],
        ddang: [`${gameRoomInfo.gameInfo.gameRule.ddang}`],
        specialBetRequirements: gameRoomInfo.gameInfo.gameRule.doubleConditions,
        nearestType: [`${gameRoomInfo.gameInfo.gameRule.nearest.type}`],
      },
      nearestAmount: gameRoomInfo.gameInfo.gameRule.nearest.money,
      betAmountPerStroke: gameRoomInfo.gameInfo.betMoney.perShot,
      bettingLimit: gameRoomInfo.gameInfo.betMoney.deposit,
      currentHole: gameRoomInfo.gameInfo.currentHole,
    },
    hostUserId: gameRoomInfo.gameInfo.hostUserId,
    players: gameRoomInfo.players.map((player) => {
      return {
        userId: player.userId,
        nickName: player.nickname,
        imgSrc: player.profileImgSrc,
        avgScore: player.avgScore,
        currentScore: player.currentScore,
        holeScores: player.holeScores.map((score) => {
          const numberScore = Number(score);
          if (isNaN(numberScore) || score.trim() === "") return 999;
          return numberScore;
        }),
        currentMoney: player.currentMoney,
        readyState: player.readyState === "true" ? true : false,
        handicaps: [],
      };
    }),
  };
}

// 현재 서버에서 주는 데이터랑 ui에서 주는 데이터가 달라서 서버에서 주는 데이터 타입 선언

// updateRoom
export function convertUiGameInfoToSocketData(gameInfo: GameInfo) {
  return {
    gameId: gameInfo.gameId, // 참가하려고 하는 game ID
    gameType: gameInfo.gameType,
    gameCenter: {
      centerId: gameInfo.golfCenter.id,
      name: gameInfo.golfCenter.name,
      frontNineCourse: {
        courseId: gameInfo.golfCenter.frontNineCourse.id,
        courseName: gameInfo.golfCenter.frontNineCourse.name,
        coursePars: gameInfo.golfCenter.frontNineCourse.pars,
      },
      backNineCourse: {
        courseId: gameInfo.golfCenter.backNineCourse.id,
        courseName: gameInfo.golfCenter.backNineCourse.name,
        coursePars: gameInfo.golfCenter.backNineCourse.pars,
      },
    },
    playerCount: gameInfo.playerCount,
    betType: gameInfo.betType,
    betMoney: {
      perShot: gameInfo.betAmountPerStroke,
      deposit: gameInfo.bettingLimit,
    },
    gameRule: {
      handicapType: gameInfo.gameRule.handiType[0],
      doubleConditions: gameInfo.gameRule.specialBetRequirements,
      ddang: gameInfo.gameRule.ddang[0],
      nearest: {
        type: gameInfo.gameRule.nearestType[0],
        money: gameInfo.nearestAmount,
      },
    },
  };
}
