import styled from "styled-components";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import GameTitleAsset from "../../../components/domain/GameTitleAsset";
import { useAppSelector } from "../../../hooks/redux";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { useGameRoomInfo } from "../GameRoom";
import { GameRoomInfo } from "./GameRoomInfo";
import { PlayersInfo, PlayersInfoUI } from "./PlayersInfo";

export const WaitRoom = () => {
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const { gameRoomInfo, onReady, exitRoom } = useGameRoomInfo();
  const { movePage, moveBack } = usePageRoute();

  if (gameRoomInfo === undefined) return <Loading />;
  const playerInfos: PlayersInfoUI[] = gameRoomInfo.players.map((player) => {
    return {
      id: player.userId,
      nickName: player.nickName,
      imgSrc: player.imgSrc,
      avgScore: player.avgScore,
      initMoney: gameRoomInfo.gameInfo.bettingLimit,
      readyState: player.readyState,
    };
  });
  const me = playerInfos.find(
    (playerInfo) => playerInfo.id === userInfo.userId
  );
  const isRoomMaker = userInfo.userId === gameRoomInfo.roomMakerId;

  const handleGameStart = () => {
    //
    movePage(`/process_game/${gameRoomInfo.gameInfo.gameId}`);
  };

  const handleOnReady = () => {
    if (gameRoomInfo.gameInfo.gameId && me) {
      onReady(gameRoomInfo.gameInfo.gameId, userInfo.userId, !me.readyState);
    }
  };

  return (
    <>
      <GameTitleAsset
        visibleBack
        handleBack={() => {
          if (gameRoomInfo.gameInfo.gameId) {
            exitRoom(gameRoomInfo.gameInfo.gameId, userInfo.userId);
            moveBack();
            return;
          }
          console.log("gameRoomInfo is undefined");
        }}
        title={gameRoomInfo.gameInfo.gameId}
      />
      <S.Body>
        <GameRoomInfo
          centerType={gameRoomInfo?.gameInfo.gameType}
          name={gameRoomInfo?.gameInfo.golfCenter.name}
          betType={gameRoomInfo?.gameInfo.betType}
          betAmountPerStroke={gameRoomInfo?.gameInfo.betAmountPerStroke}
          bettingLimit={gameRoomInfo?.gameInfo.bettingLimit}
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
          <Button onClick={handleGameStart}>시작하기</Button>
        ) : (
          <Button onClick={handleOnReady} variants="outlined">
            규칙 동의 후, 준비하기
          </Button>
        )}
      </S.Footer>
    </>
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
