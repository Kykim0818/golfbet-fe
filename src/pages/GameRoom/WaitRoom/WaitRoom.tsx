import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import GameInfoSection from "../../../components/domain/GameInfoSection";
import GameTitleAsset from "../../../components/domain/GameTitleAsset";
import { useAppSelector } from "../../../hooks/redux";
import { useModal } from "../../../hooks/useModal";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { usePreventLeave } from "../../../hooks/usePreventLeave";
import { PageStyle } from "../../../styles/page";
import { deepClone } from "../../../utils/deepClone";
import { GameInfo } from "../../MakeGame/MakeGame";
import { GameRule } from "../../MakeGame/Rule/type";
import { GameRoomInfo } from "../GameRoom";
import { PlayersInfo, PlayersInfoUI } from "./PlayersInfo";

type WaitRoomProps = {
  gameRoomInfo: GameRoomInfo;
  onReady: (gameId: string, userId: string, readyState: boolean) => void;
  updateRoom: (
    gameId: string,
    userId: string,
    updateInfo: GameRoomInfo["gameInfo"]
  ) => void;
  exitRoom: () => void;
  startGame: (gameId: string, userId: string) => void;
};

export const WaitRoom = ({
  gameRoomInfo,
  onReady,
  updateRoom,
  exitRoom,
  startGame,
}: WaitRoomProps) => {
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const modalStatus = useAppSelector((state) => state.modal.status);
  const { moveBack } = usePageRoute();
  const { openModal } = useModal();
  const [preventFlag, setPreventFlag] = useState(true);
  const { hostUserId, gameInfo, players } = gameRoomInfo;
  const { bettingLimit } = gameInfo;

  // 모달이 떠있으면, 패딩 X && 임의 플래그
  usePreventLeave({
    confirmTriggerFlag: modalStatus.length === 0 && preventFlag,
    args: {
      title: "게임방 나가기",
      msg: "참여중인 게임방에서 나가겠습니까?",
      okBtnLabel: "나가기",
      cancelBtnLabel: "닫기",
    },
    handleClickOk: exitRoom,
  });

  // if (gameRoomInfo === undefined) return <Loading />;
  const playerInfos: PlayersInfoUI[] = players.map((player) => {
    return {
      id: player.userId,
      nickName: player.nickName,
      imgSrc: player.imgSrc,
      avgScore: player.avgScore,
      initMoney: bettingLimit,
      readyState: player.readyState,
      isHost: player.userId === hostUserId,
    };
  });
  const me = playerInfos.find(
    (playerInfo) => playerInfo.id === userInfo.userId
  );
  const isRoomMaker = userInfo.userId === hostUserId;

  const handleOpenRoomCenter = async () => {
    const modifiedGolfCenter = await openModal<GameInfo["golfCenter"]>({
      id: "ROOM_CENTER",
      args: {
        gameRoomInfo,
        userId: userInfo.userId,
      },
    });
    if (modifiedGolfCenter && gameRoomInfo.gameInfo.gameId) {
      const clonedGameInfo = deepClone(gameRoomInfo.gameInfo);
      clonedGameInfo.golfCenter = modifiedGolfCenter;
      updateRoom(gameRoomInfo.gameInfo.gameId, userInfo.userId, clonedGameInfo);
    }
  };

  const handleOpenRoomRule = async () => {
    const modifiedRule = await openModal<{
      changedRule: GameRule;
      changedNearestAmount: number;
    }>({
      id: "ROOM_RULE",
      args: {
        gameRoomInfo,
        userId: userInfo.userId,
      },
    });
    if (modifiedRule && gameRoomInfo.gameInfo.gameId) {
      const clonedGameInfo = deepClone(gameRoomInfo.gameInfo);
      clonedGameInfo.gameRule = modifiedRule.changedRule;
      clonedGameInfo.nearestAmount = modifiedRule.changedNearestAmount;
      updateRoom(gameRoomInfo.gameInfo.gameId, userInfo.userId, clonedGameInfo);
    }
  };

  const handleOpenRoomQr = () => {
    openModal({ id: "ROOM_QR", args: { gameRoomInfo } });
  };

  const handleGameStart = () => {
    //
    if (gameRoomInfo.gameInfo.gameId) {
      setPreventFlag(false);
      moveBack();
      console.log("TODO: send GameStart Task to socket");
      startGame(gameRoomInfo.gameInfo.gameId, userInfo.userId);
    } else {
      console.log("gameId is undefined");
    }
  };

  const handleOnReady = () => {
    if (gameRoomInfo.gameInfo.gameId && me) {
      onReady(gameRoomInfo.gameInfo.gameId, userInfo.userId, !me.readyState);
    }
  };

  const isCanStart = () => {
    let ret = true;
    players.forEach((player) => {
      if (player.userId === hostUserId) return;
      if (player.readyState === false) ret = false;
    });
    return ret;
  };
  return (
    <PageStyle.Wrapper>
      <GameTitleAsset
        visibleBack
        handleBack={moveBack}
        title={gameRoomInfo.gameInfo.gameId}
        handleOpenRoomQr={handleOpenRoomQr}
      />
      <S.Body>
        <GameInfoSection
          centerType={gameRoomInfo?.gameInfo.gameType}
          name={gameRoomInfo?.gameInfo.golfCenter.name}
          betType={gameRoomInfo?.gameInfo.betType}
          betAmountPerStroke={gameRoomInfo?.gameInfo.betAmountPerStroke}
          bettingLimit={gameRoomInfo?.gameInfo.bettingLimit}
          handleOpenRoomCenter={handleOpenRoomCenter}
          handleOpenRoomRule={handleOpenRoomRule}
        />
        <PlayersInfo
          userId={userInfo.userId}
          players={playerInfos}
          gameMaxPlayer={gameRoomInfo.gameInfo.playerCount}
        />
      </S.Body>
      <S.Footer>
        {/* id가 방장 id와 일치하면 시작하기 아니면 ,규칙 동의 후 준비하기 */}
        {isRoomMaker ? (
          <Button
            onClick={handleGameStart}
            disabled={
              // TODO: ready 상태인지 확인 조건
              isCanStart() === false ||
              gameRoomInfo.players.length !== gameRoomInfo.gameInfo.playerCount
            }
          >
            시작하기
          </Button>
        ) : (
          <Button
            onClick={handleOnReady}
            variants={me?.readyState ? "primary" : "outlined"}
          >
            {me?.readyState ? "준비하기" : "규칙 동의 후, 준비하기"}
          </Button>
        )}
      </S.Footer>
    </PageStyle.Wrapper>
  );
};

const S = {
  Body: styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0px 15px;

    overflow: auto;
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
