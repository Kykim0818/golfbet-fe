import axios from "axios";
import { getData } from ".";
import { API_URL } from "./constant";
import { APIResponse } from "./type";

export async function apiGetUserGameHistories() {
  try {
    // 응답성공
    const response = await getData<{ gameHistories: GameHistory[] }>(
      API_URL.GET_USER_GAME_HISTORY,
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
        timeout: 2000,
      }
    );
    if (response.statusCode === 404 || response.statusCode === 500)
      throw new Error();
    return response.data;
  } catch (e) {
    // 응답실패
    // alert 적으면 계속 query 실행됨
    return { gameHistories: testGameHistories };
  }
}

export type GameHistory = {
  gameId: string;
  date: string;
  gameType: "field" | "screen";
  centerName: string;
  players: number;
  score: number;
  totalMoneyChange: number;
};

const testGameEmptyHistories: GameHistory[] = [];
const testGameHistories: GameHistory[] = [
  {
    gameId: "test",
    date: "2023-11-05",
    gameType: "field",
    centerName: "이천 실크밸리GC",
    players: 4,
    score: 79,
    totalMoneyChange: +10000,
  },
  {
    gameId: "test1",
    date: "2023-03-07",
    gameType: "field",
    centerName: "이천 실크밸리GC",
    players: 4,
    score: 72,
    totalMoneyChange: -10000,
  },
];
