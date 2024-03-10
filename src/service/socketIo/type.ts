import { GameRoomInfo } from "../../pages/GameRoom/GameRoom";

export type SocketResponse = {
  status: boolean;
  statusCode: number;
  responseData: {
    gameRoomInfo: SocketGameRoomInfo;
  };
};

export interface SocketGameRoomInfo {
  gameInfo: {
    gameId: string;
    betMoney: {
      perShot: number;
      deposit: number;
    };
    betType: "stroke";
    centerInfo: {
      centerId: number;
      name: string;
      frontNineCourse: {
        courseId: number;
        courseName: string;
        coursePars: number[];
      };
      backNineCourse: {
        courseId: number;
        courseName: string;
        coursePars: number[];
      };
    };
    currentHole: number;
    createdDate: number;
    endDate: number;
    gameRule: {
      handicapType: "none" | "frontHandicap" | "backHandicap";
      doubleConditions: (
        | "none"
        | "buddy"
        | "triple"
        | "twoOrMoreTie"
        | "threeOrMoreTie"
      )[];
      ddang: "none" | "onlyLastPlace";
      nearest: {
        type: "includeInGame" | "separateAmount";
        money: number;
      };
    };
    gameState: string;
    isBackNineStart: boolean;
    gameType: "field" | "screen";
    hostUserId: string;
    playerCount: number;
  };
  players: Player[];
  inGameInfo: GameRoomInfo["inGameInfo"];
}

interface Player {
  userId: string;
  nickname: string;
  profileImgSrc: string;
  avgScore: number;
  currentScore: number;
  holeScores: string[];
  currentMoney: number;
  readyState: string;
  isGameSurrender: boolean;
  handicapInfo: {
    userId: string;
    handicaps: any[];
  };
}
