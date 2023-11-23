import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { UNIQUE_QUERY_KEY } from "../../service/api/constant";
import { apiGetGameRoom } from "../../service/api/gameRoom";
import { GameInfo } from "../MakeGame/MakeGame";

type ContextType = ContextStateType & ContextActionType;

type ContextStateType = {
  gameId: string;
  gameRoomInfo: GameRoomInfo;
};

export type GameRoomInfo = {
  gameInfo: GameInfo;
  roomMakerId: string;
  players: GameRoomUser[];
};

export type GameRoomUser = {
  userId: string;
  nickName: string;
  imgSrc: string;
  avgScore: number;
  currentScore: number;
  holeScores: number[];
  currentMoney: number;
  readyState: boolean;
  handicaps: {
    to: string;
    money: number;
  }[];
};

type ContextActionType = {
  // resetCenterInfoForAdd: () => void;
};

export type HandicapInfo = {
  // 핸디 줄 상대방 id
  to: string;
  amount: number;
};

export const GameRoom = () => {
  const params = useParams();
  //
  const gameId = params.gameId;
  // 1 게임 id를 받아와서 id 정보 조회
  const { data } = useQuery(
    [UNIQUE_QUERY_KEY.GET_GAME_ROOM_INFO],
    () => apiGetGameRoom(gameId ?? ""),
    {
      retry: 0,
    }
  );
  console.log("a", data);
  const gameInfo = useRef<GameInfo>();

  // 2 조회 실패시 홈화면으로 튕굼
  useEffect(() => {
    //
    if (gameId === undefined && gameInfo.current === undefined) {
      console.log("gameInfo is undefined");
    }
  }, [gameId]);

  // 3 웹 소켓 연결
  if (data?.data === undefined) return <Loading />;
  return (
    <S.Wrapper>
      <Outlet
        context={
          {
            gameId: params.gameId ?? "",
            gameRoomInfo: data.data.gameRoomInfo,
          } satisfies ContextType
        }
      />
    </S.Wrapper>
  );
};

// TODO:refactor 분리가능한지 확인
export function useGameRoomInfo() {
  return useOutletContext<ContextType>();
}

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--color-bg, #f6f8fc);
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0px 26px;
    overflow: auto;
  `,
};
