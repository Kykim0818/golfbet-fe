import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useModal } from "../../hooks/useModal";
import { usePageRoute } from "../../hooks/usePageRoute";
import { GameRoomInfo } from "../../pages/GameRoom/GameRoom";
import { SOCKET_URL } from "./config";
import { EVENTS, TASK } from "./constant";

interface Context {
  socket: Socket;
  gameRoomInfo?: GameRoomInfo;
  joinRoom: (gameId: string, userId: string) => void;
  exitRoom: (gameId: string, userId: string) => void;
  onReady: (gameId: string, userId: string, readyState: boolean) => void;
}
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

const SocketContext = createContext<Context>({
  socket,
  gameRoomInfo: undefined,
  joinRoom: () => {},
  exitRoom: () => {},
  onReady: () => {},
});

function SocketsProvider(props: any) {
  const [gameRoomInfo, setGameRoomInfo] = useState<GameRoomInfo>();
  const { openModal } = useModal();
  const { goHome } = usePageRoute();

  useEffect(() => {
    socket.connect();
    window.onfocus = function () {
      document.title = "Room app";
    };
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    // 기본 설정
    socket.on(EVENTS.FROM_SERVER.CONNECTION, (value) => {
      console.log("server connected", value);
    });
    socket.on(EVENTS.FROM_SERVER.DISCONNECT, (value) => {
      console.log("server disconnected", value);
    });
    socket.on(EVENTS.FROM_SERVER.CONNECTION_FAIL, (value) => {
      console.log("server connect fail", value);
    });
    socket.on(EVENTS.FROM_SERVER.CONNECTION_ERROR, (err) => {
      console.log(err.message); // prints the message associated with the error
    });
    // 게임방정보 업데이트
    socket.on(EVENTS.FROM_SERVER.BROADCAST_MESSAGE, (data) => {
      console.log(data);
      setGameRoomInfo(data);
    });
  }, []);

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

  //
  const joinRoom = (gameId: string, userId: string) => {
    socket.emit(EVENTS.TO_SERVER.JOIN_ROOM, gameId);
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.JOIN_ROOM,
      data: {
        gameId,
        userId,
      },
    });
  };

  const onReady = (gameId: string, userId: string, readyState: boolean) => {
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.SET_READY,
      data: {
        gameId,
        userId,
        readyState,
      },
    });
  };

  const exitRoom = (gameId: string, userId: string) => {
    socket.emit(EVENTS.TO_SERVER.SEND_TASK_MESSAGE, {
      taskName: TASK.EXIT_ROOM,
      data: {
        gameId,
        userId,
      },
    });
  };

  // useEffect(() => {
  //   socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
  //     if (!document.hasFocus()) {
  //       document.title = "New message...";
  //     }

  //     setMessages((messages) => [...messages, { message, username, time }]);
  //   });
  // }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        gameRoomInfo,
        joinRoom,
        exitRoom,
        onReady,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;