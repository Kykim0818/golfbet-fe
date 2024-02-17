import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAppDispatch } from "../../hooks/redux";
import { useModal } from "../../hooks/useModal";
import { usePageRoute } from "../../hooks/usePageRoute";
import { GameRoomInfo } from "../../pages/GameRoom/GameRoom";
import { EnterScoreResult } from "../../pages/GameRoom/InGame/EnterHoleScore/EnterHoleScore";
import { InGameInfo } from "../../pages/GameRoom/InGame/type";
import { actionGame } from "../../store/gameRoomInfo/gameSlice";
import { SOCKET_URL } from "./config";
import { EVENTS, SOCKET_RESPONSE, TASK } from "./constant";
import { SocketResponse } from "./type";
import {
  convertSocketDataToUiGameRoomInfo,
  convertUiGameInfoToSocketData,
} from "./util";

const socket = io(SOCKET_URL, {
  // room 네임스페이스
  autoConnect: false,
  secure: true,
  reconnection: true,
  reconnectionAttempts: 1,
  rejectUnauthorized: true,
  reconnectionDelayMax: 1000,
  transports: ["websocket"],
});
console.log("socket test", socket);

interface Context {
  socket: Socket;
  connectState: boolean;
  gameRoomInfo?: GameRoomInfo;
  connect: () => void;
  updateRoom: (
    gameId: string,
    userId: string,
    updateInfo: GameRoomInfo["gameInfo"]
  ) => void;
  joinRoom: (gameId: string, userId: string) => void;
  exitRoom: (gameId: string, userId: string) => void;
  onReady: (gameId: string, userId: string, readyState: boolean) => void;
  startGame: (gameId: string, userId: string) => void;
  startBackNine: (gameId: string) => void;
  enterScore: (
    gameId: string,
    holeIdx: number,
    enterScoreResult: EnterScoreResult
  ) => void;
  finalizeScore: (
    gameId: string,
    userId: string,
    holeInfo: InGameInfo["holeInfos"][number]
  ) => void;
  modifyScore: (
    gameId: string,
    userId: string,
    modifyHoleInfo: Omit<InGameInfo["holeInfos"][number], "ddang">
  ) => void;
  setCanEnterScore: (gameId: string, value: string) => void;
}

const SocketContext = createContext<Context>({
  socket,
  connectState: false,
  gameRoomInfo: undefined,
  connect: () => {},
  updateRoom: () => {},
  joinRoom: () => {},
  exitRoom: () => {},
  onReady: () => {},
  startGame: () => {},
  startBackNine: () => {},
  enterScore: () => {},
  finalizeScore: () => {},
  modifyScore: () => {},
  setCanEnterScore: () => {},
});

function SocketsProvider(props: any) {
  const [connectState, setConnectState] = useState(false);
  const [gameRoomInfo, setGameRoomInfo] = useState<GameRoomInfo>();
  const dispatch = useAppDispatch();
  const { openModal } = useModal();
  const { goHome } = usePageRoute();

  useEffect(() => {
    // 기본 설정
    socket.on(EVENTS.FROM_SERVER.CONNECTION, () => {
      console.log("server connected");
      setConnectState(true);
    });
    socket.on(EVENTS.FROM_SERVER.DISCONNECT, (value) => {
      console.log("server disconnected", value);
      setConnectState(false);
      setGameRoomInfo(undefined);
    });
    socket.on(EVENTS.FROM_SERVER.CONNECTION_FAIL, (value) => {
      console.log("server connect fail", value);
    });
    socket.on(EVENTS.FROM_SERVER.CONNECTION_ERROR, (err) => {
      console.log(err.message); // prints the message associated with the error
    });
    socket.on(EVENTS.FROM_SERVER.BROADCAST_CONNECT_MESSAGE, (value) => {
      console.log(value); // prints the message associated with the error
    });
    // 게임방정보 업데이트
    socket.on(
      EVENTS.FROM_SERVER.BROADCAST_ROOM_MESSAGE,
      (data: SocketResponse) => {
        console.log(data);
        if (
          data.status &&
          data.statusCode === SOCKET_RESPONSE.CODE.RESULT_SUCCESS
        ) {
          console.log(data.responseData.gameRoomInfo);
          const convertedGameRoomInfo = convertSocketDataToUiGameRoomInfo(
            data.responseData.gameRoomInfo
          );
          console.log(convertedGameRoomInfo);
          setGameRoomInfo(convertedGameRoomInfo);
          dispatch(actionGame.setGameRoomInfo(convertedGameRoomInfo));
        } else {
          console.log("socket Error Code :", data.statusCode);
        }
      }
    );
    return () => {
      socket.removeAllListeners();
    };
  }, [dispatch]);

  useEffect(() => {
    // TODO: goHome , openModal deps 어디서 다시 재할당 되는지 확인해서 최적화 필요
    socket.io.on("reconnect_failed", async () => {
      await openModal({
        id: "ALERT",
        args: {
          title: "네트워크 오류",
          msg: "네트워크 상태를 확인하고 , 다시 시도해주세요",
          okBtnLabel: "확인",
        },
      });
      goHome();
    });
  }, [goHome, openModal]);

  const connect = () => {
    socket.connect();
  };

  //
  const joinRoom = useCallback((gameId: string, userId: string) => {
    console.log(`gameId : ${gameId}, userId : ${userId}`);
    console.log("try JoinRoom");
    socket.emit(EVENTS.TO_SERVER.JOIN_ROOM, gameId);
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.JOIN_ROOM,
      data: {
        gameId,
        userId,
      },
    });
  }, []);

  const onReady = (gameId: string, userId: string, readyState: boolean) => {
    console.log(
      `socket onReady Test gameId : ${gameId} userId : ${userId} readyState : ${readyState}`
    );
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.SET_READY,
      data: {
        gameId,
        userId,
        readyState,
      },
    });
  };

  const updateRoom = (
    gameId: string,
    userId: string,
    updateInfo: GameRoomInfo["gameInfo"]
  ) => {
    console.log(
      `update Room gameId : ${gameId},userId: ${userId}, updateInfo : ${updateInfo}`
    );
    const convertedData = convertUiGameInfoToSocketData(updateInfo);
    console.log(convertedData);
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.ROOM_UPDATE,
      data: {
        userId,
        ...convertedData,
      },
    });
  };

  const exitRoom = (gameId: string, userId: string) => {
    console.log(`socket exit Test gameId : ${gameId} userId : ${userId}`);
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.EXIT_ROOM,
      data: {
        gameId,
        userId,
      },
    });
  };

  const startGame = (gameId: string, userId: string) => {
    console.log(`socket start Game gameId : ${gameId} userId : ${userId}`);
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.START_GAME,
      data: {
        gameId,
        userId,
      },
    });
  };

  const startBackNine = (gameId: string) => {
    console.log(`socket startBackNine Game gameId : ${gameId}`);
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.BACK_NINE_START,
      data: {
        gameId,
      },
    });
  };

  const enterScore = (
    gameId: string,
    holeIdx: number,
    enterScoreResult: EnterScoreResult
  ) => {
    const firstOrBack = holeIdx < 9 ? "first" : "back";
    const holeCount = firstOrBack === "first" ? holeIdx - 1 : holeIdx - 1 - 9;
    const insertData = Object.entries(enterScoreResult.playerScores).map(
      ([userId, score]) => {
        return {
          userId,
          firstOrBack,
          holeCount,
          holeScore: score === 999 ? "" : score,
        };
      }
    );
    console.log(
      `EnterScore gameId : ${gameId}, 입력홀: ${holeIdx}, 입력결과: ${insertData}`
    );
    console.log({
      taskName: TASK.ENTER_SCORE,
      data: {
        gameId,
        insertData,
      },
    });
    if (enterScoreResult.isAllEnter === false) {
      socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
        taskName: TASK.ENTER_SCORE,
        data: {
          gameId,
          insertData,
        },
      });
    }
  };

  const setCanEnterScore = useCallback((gameId: string, value: string) => {
    console.log(`setCanEnterScore gameId : ${gameId}, value : ${value}`);
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.SET_CAN_ENTER_SCORE,
      data: {
        gameId,
        value,
      },
    });
  }, []);

  const finalizeScore = (
    gameId: string,
    userId: string,
    holeInfo: InGameInfo["holeInfos"][number]
  ) => {
    console.log(
      `finalize gameId : ${gameId}, 입력홀정보: ${JSON.stringify(holeInfo)}`
    );
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.FINALIZE_SCORE,
      data: {
        gameId,
        userId,
        holeInfo,
      },
    });
  };

  const modifyScore = (
    gameId: string,
    userId: string,
    modifyHoleInfo: Omit<InGameInfo["holeInfos"][number], "ddang">
  ) => {
    console.log(
      `modifyScore gameId : ${gameId} \n 유저Id : ${userId} \n 수정 홀정보: ${JSON.stringify(
        modifyHoleInfo
      )}`
    );
    // TODO : 백엔드 완료시 해제
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.MODIFY_SCORE,
      data: {
        gameId,
        userId,
        modifyHoleInfo,
      },
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connectState,
        gameRoomInfo,
        connect,
        updateRoom,
        joinRoom,
        exitRoom,
        onReady,
        startGame,
        startBackNine,
        enterScore,
        finalizeScore,
        modifyScore,
        setCanEnterScore,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
