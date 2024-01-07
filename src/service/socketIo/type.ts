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
    gameType: "field" | "screen";
    hostUserId: string;
    playerCount: number;
  };
  players: Player[];
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
  handicapInfo: {
    userId: string;
    handicaps: any[];
  };
}

// 이전홀 점수 확정 시에
// 다음판 배판 여부 결정

type InGameInfo = {};
type HoleInfo = {
  index: number;
  isDouble: boolean;
  isDoubleCondition: string[];
};
