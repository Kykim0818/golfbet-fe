import { useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../hooks/redux";
import { useModal } from "../../hooks/useModal";
import { usePageRoute } from "../../hooks/usePageRoute";
import { useSockets } from "../../service/socketIo/socketIo.context";
import { GameInfo } from "../MakeGame/MakeGame";

type ContextType = ContextStateType & ContextActionType;

type ContextStateType = {
  gameRoomInfo: GameRoomInfo;
  onReady: (gameId: string, userId: string, readyState: boolean) => void;
  exitRoom: (gameId: string, userId: string) => void;
  updateRoom: (
    gameId: string,
    userId: string,
    updateInfo: GameRoomInfo["gameInfo"]
  ) => void;
};

export type GameRoomInfo = {
  gameInfo: GameInfo;
  hostUserId: string;
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
  const { goHome } = usePageRoute();
  const {
    socket,
    gameRoomInfo,
    joinRoom,
    connectState,
    onReady,
    exitRoom,
    updateRoom,
  } = useSockets();
  const { openModal } = useModal();
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const params = useParams();
  const gameId = params.gameId;
  // const [roomState, setRoomState] = useState(gameRoomInfo?.gameInfo);

  useEffect(() => {
    if (connectState) {
      if (gameId && userInfo.userId && gameRoomInfo === undefined) {
        joinRoom(gameId, userInfo.userId);
      } else {
        openModal({
          id: "ALERT",
          args: {
            title: "연결 오류",
            msg: "잠시 후에 다시 시도해주세요",
            okBtnLabel: "확인",
          },
        }).then(() => goHome());
      }
    }
  }, [gameId, userInfo.userId, connectState, joinRoom]);

  useEffect(() => {
    // ISSUE 나가기 처리 브라우저 닫기 관련 고민 필요
    return () => {
      if (gameId) {
        exitRoom(gameId, userInfo.userId);
        socket.disconnect();
      }
    };
  }, []);

  // 3 웹 소켓 연결
  if (socket.connected === false || gameRoomInfo === undefined)
    return <Loading />;
  return (
    <S.Wrapper>
      <Outlet context={{ gameRoomInfo, onReady, exitRoom, updateRoom }} />
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
