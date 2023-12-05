import { Outlet, useOutletContext } from "react-router-dom";
import { GameInfo } from "../../MakeGame/MakeGame";
import { GameRoomUser, useGameRoomInfo } from "../GameRoom";

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

type ContextActionType = {
  // resetCenterInfoForAdd: () => void;
};

export const WaitRoomContainer = () => {
  const { gameRoomInfo, onReady, exitRoom, updateRoom } = useGameRoomInfo();
  return (
    <>
      <Outlet context={{ gameRoomInfo, onReady, exitRoom, updateRoom }} />
    </>
  );
};

// TODO:refactor 분리가능한지 확인
export function useGameRoomInfo1() {
  return useOutletContext<ContextType>();
}
