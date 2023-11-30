import { useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../hooks/redux";
import { useSockets } from "../../service/socketIo/socketIo.context";
import { GameInfo } from "../MakeGame/MakeGame";

type ContextType = ContextStateType & ContextActionType;

type ContextStateType = {
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
  const { gameRoomInfo, joinRoom } = useSockets();
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const params = useParams();
  const gameId = params.gameId;

  useEffect(() => {
    if (gameId && userInfo.userId) joinRoom(gameId, userInfo.userId);
  }, [gameId, userInfo.userId, joinRoom]);

  // 3 웹 소켓 연결
  if (gameRoomInfo === undefined) return <Loading />;
  return (
    <S.Wrapper>
      <Outlet context={gameRoomInfo} />
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
