import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../hooks/redux";
import { useModal } from "../../hooks/useModal";
import { usePageRoute } from "../../hooks/usePageRoute";
import { useSockets } from "../../service/socketIo/socketIo.context";
import GameEnd from "../GameEnd";
import { GameInfo } from "../MakeGame/MakeGame";
import InGame from "./InGame";
import WaitRoom from "./WaitRoom";
import { GAME_STATE } from "./constant";

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
  const { goHome, moveBack } = usePageRoute();
  const {
    socket,
    gameRoomInfo,
    joinRoom,
    connectState,
    onReady,
    exitRoom,
    updateRoom,
    startGame,
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

  const handleExitWaitRoom = () => {
    if (gameId) {
      exitRoom(gameId, userInfo.userId);
      moveBack();
      // exit 처리되기전에 disconnect 되버리면 작동안하는 거 같음 (추정)
      setTimeout(() => {
        socket.disconnect();
      }, 500);
    }
  };

  // 3 웹 소켓 연결
  if (socket.connected === false || gameRoomInfo === undefined)
    return <Loading />;
  // 대기실
  if (gameRoomInfo.gameInfo.gameState === GAME_STATE.WAIT)
    return (
      <WaitRoom
        gameRoomInfo={gameRoomInfo}
        onReady={onReady}
        updateRoom={updateRoom}
        exitRoom={handleExitWaitRoom}
        startGame={startGame}
      />
    );
  // 게임중
  if (gameRoomInfo.gameInfo.gameState === GAME_STATE.IN_PROGRESS)
    return <InGame gameRoomInfo={gameRoomInfo} />;
  // 종료
  if (gameRoomInfo.gameInfo.gameState === GAME_STATE.END)
    return <GameEnd gameRoomInfo={gameRoomInfo} />;
  return <Loading />;
  // if (gameRoomInfo.gameInfo.gameState === GAME_STATE.IN_PROGRESS)
  //   return <WaitRoom />;
  // if (gameRoomInfo.gameInfo.gameState === GAME_STATE.END) return <WaitRoom />;

  // return (
  //   <S.Wrapper>
  //     <Outlet context={{ gameRoomInfo, onReady, exitRoom, updateRoom }} />
  //   </S.Wrapper>
  // );
};

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
