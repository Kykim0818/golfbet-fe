//  리스트 조회

import axios from "axios";
import { getData, postData } from ".";
import { GameRoomInfo } from "../../pages/GameRoom/GameRoom";
import { GameInfo } from "../../pages/MakeGame/MakeGame";
import { API_URL } from "./constant";
import { APIResponse } from "./type";

type ApiCanEnterGameReturnType = {
  participants: string[];
  partiAvailabilityYn: boolean;
};
export async function apiCanEnterGameRoom(gameId: string) {
  try {
    const repsonse = await getData<ApiCanEnterGameReturnType>(
      API_URL.CAN_ENTER_GAME_ROOM,
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
        timeout: 2000,
        params: { gameId },
      },
      { requireToken: true }
    );
    console.log(repsonse);
    return repsonse;
  } catch (e) {
    const errResponse: APIResponse<ApiCanEnterGameReturnType> = {
      data: {
        participants: [],
        partiAvailabilityYn: false,
      },
      error: String(e),
      message: "apiCanEnterGameRoom error",
      statusCode: 0,
    };
    return errResponse;
  }
}

//  api 주소로 request 요청 후 실패시, 콘솔출력후 , 빈 배열 전달
// TODO type 확인
export async function apiGetGameRoom(gameId: string) {
  try {
    // 응답성공
    const response = await getData<{ gameRoomInfo: GameRoomInfo }>(
      API_URL.GET_GAME_ROOM_INFO,
      {
        timeout: 2000,
        params: {
          gameId,
        },
      }
    );
    if (response.statusCode === 404 || response.statusCode === 500)
      throw new Error();
    return response;
  } catch (e) {
    // 응답실패
    // alert 적으면 계속 query 실행됨
    return { data: testGameRoomInfo } as APIResponse<{
      gameRoomInfo: GameRoomInfo;
    }>;
  }
}

// TODO 데이터 세팅 부분 로직 필요
const testGameRoomInfo: {
  gameRoomInfo: GameRoomInfo;
} = {
  gameRoomInfo: {
    gameInfo: {
      gameId: "test",
      gameType: "field",
      startDate: "2023-11-05",
      golfCenter: {
        id: "testCenterId",
        name: "이천 실크밸리GC",
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
      betType: "stroke",
      playerCount: 4,
      gameRule: {
        handiType: ["backHandicap"],
        specialBetRequirements: ["buddy", "triple", "threeOrMoreTie"],
        ddang: ["onlyLastPlace"],
        nearestType: ["separateAmount"],
      },
      gameState: "ready",
      nearestAmount: 0,
      betAmountPerStroke: 1000,
      bettingLimit: 50000,
    },
    hostUserId: "test",
    players: [
      {
        userId: "test",
        nickName: "테스트",
        imgSrc: "",
        avgScore: 85,
        readyState: true,
        handicaps: [],
        currentMoney: 0,
        // parScores 의 합
        currentScore: 0,
        // 각 Hole별 점수
        holeScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        userId: "user1",
        nickName: "유저1",
        imgSrc: "",
        avgScore: 80,
        readyState: false,
        handicaps: [],
        currentMoney: 0,
        // parScores 의 합
        currentScore: 0,
        // 각 Hole별 점수
        holeScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        userId: "user2",
        nickName: "유저2",
        imgSrc: "",
        avgScore: 81,
        readyState: true,
        handicaps: [],
        currentMoney: 0,
        // parScores 의 합
        currentScore: 0,
        // 각 Hole별 점수
        holeScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
};

export async function apiMakeGame(gameInfo: GameInfo) {
  try {
    const dbParam = convertMakeGameParamType(gameInfo);
    console.log("dbParam", dbParam);
    const response = await postData<{ gameId: string }>(
      API_URL.MAKE_GAME,
      dbParam,
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
        timeout: 2000,
      },
      { requireToken: true }
    );
    if (response.data) {
      return response.data.gameId;
    } else {
      return "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}

function convertMakeGameParamType(gameInfo: GameInfo): GameInfoType {
  // api 수정시 같이 수정 임시 처리
  return {
    data: {
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
    },
  };
}

type GameInfoType = {
  data: {
    gameType: string;
    gameCenter: {
      centerId: string;
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
    playerCount: number;
    betType: string;
    betMoney: {
      perShot: number;
      deposit: number;
    };
    gameRule: {
      handicapType: string;
      doubleConditions: string[];
      ddang: string;
      nearest: {
        type: string;
        money: number;
      };
    };
  };
};
