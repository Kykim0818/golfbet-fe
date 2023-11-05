//  리스트 조회

import { getData } from ".";
import { GameRoomInfo, GameRoomUser } from "../../pages/GameRoom/GameRoom";
import { GameInfo } from "../../pages/MakeGame/MakeGame";
import { API_URL } from "./constant";
import { APIResponse } from "./type";

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
        name: "이천 실크밸리GC",
        region: "",
        frontNineCourse: {
          name: "",
          pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
        backNineCourse: {
          name: "",
          pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
      },
      betType: "Stroke",
      playerCount: 4,
      gameRule: {
        handiType: ["post"],
        specialBetRequirements: ["buddy", "tripple", "threeOrMorePlayersTied"],
        ddang: ["last"],
        nearestType: ["specified"],
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
