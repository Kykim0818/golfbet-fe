//  리스트 조회

import { getData, postData } from ".";
import { GameRoomInfo, GameRoomUser } from "../../pages/GameRoom/GameRoom";
import { GameInfo } from "../../pages/MakeGame/MakeGame";
import { API_URL } from "./constant";
import { APIResponse } from "./type";

export async function apiCanEnterGameRoom(gameId: string) {
  try {
    const repsonse = await getData<boolean>(
      API_URL.CAN_ENTER_GAME_ROOM,
      {
        timeout: 2000,
        params: { gameId },
      },
      { requireToken: true }
    );
    return repsonse;
  } catch (e) {
    const errResponse: APIResponse<boolean> = {
      data: false,
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
    const response = await getData<{
      gameRoomInfo: {
        gameInfo: GameInfo;
        roomMakerId: string;
        players: GameRoomUser[];
      };
    }>(API_URL.GET_GAME_ROOM_INFO, {
      timeout: 2000,
      params: {
        gameId,
      },
    });
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
          id: "testFrontCourseId",
          name: "",
          pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
        backNineCourse: {
          id: "testBackCourseId",
          name: "",
          pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
      },
      betType: "Stroke",
      playerCount: 4,
      gameRule: {
        handiType: ["backHandicap"],
        specialBetRequirements: ["buddy", "triple", "threeOrMoreTie"],
        ddang: ["onlyLastPlace"],
        nearestType: ["separateAmount"],
      },
      betAmountPerStroke: 1000,
      bettingLimit: 50000,
    },
    roomMakerId: "test",
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
    const response = await postData<{ gameId: string }>(
      API_URL.MAKE_GAME,
      gameInfo,
      { timeout: 2000 },
      { requireToken: true }
    );
    if (response.statusCode === 200) {
      return response.data.gameId;
    } else {
      return "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}
