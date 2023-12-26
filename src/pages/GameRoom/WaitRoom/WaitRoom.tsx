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
  // onGameStart : ()
};

export const WaitRoom = ({
  gameRoomInfo,
  onReady,
  updateRoom,
}: WaitRoomProps) => {
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const { movePage, moveBack } = usePageRoute();
  const { openModal } = useModal();

  const [preventFlag, setPreventFlag] = useState(true);

  usePreventLeave({
    confirmTriggerFlag: preventFlag,
    args: {
      title: "게임방 나가기",
      msg: "참여중인 게임방에서 나가겠습니까?",
      okBtnLabel: "나가기",
      cancelBtnLabel: "닫기",
    },
    handleClickOk: moveBack,
  });

  // if (gameRoomInfo === undefined) return <Loading />;
  const playerInfos: PlayersInfoUI[] = gameRoomInfo.players.map((player) => {
    return {
      id: player.userId,
      nickName: player.nickName,
      imgSrc: player.imgSrc,
      avgScore: player.avgScore,
      initMoney: gameRoomInfo.gameInfo.bettingLimit,
      readyState: player.readyState,
      isHost: player.userId === gameRoomInfo.hostUserId,
    };
  });
  const me = playerInfos.find(
    (playerInfo) => playerInfo.id === userInfo.userId
  );
  const isRoomMaker = userInfo.userId === gameRoomInfo.hostUserId;

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
    setPreventFlag(false);
    moveBack();
    console.log("TODO: send GameStart Task to socket");
    //movePage(`/process_game/${gameRoomInfo.gameInfo.gameId}`);
  };

  const handleOnReady = () => {
    if (gameRoomInfo.gameInfo.gameId && me) {
      onReady(gameRoomInfo.gameInfo.gameId, userInfo.userId, !me.readyState);
    }
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
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
