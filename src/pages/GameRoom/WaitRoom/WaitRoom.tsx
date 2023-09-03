import styled from "styled-components";
import GameTitleAsset from "../../../components/domain/GameTitleAsset";
import { useGameRoomInfo } from "../GameRoom";
import Button from "../../../components/Button";
import { GameRoomInfo } from "./GameRoomInfo";
import { PlayersInfo, PlayersInfoUI } from "./PlayersInfo";
import { getUserId } from "../../../utils/getUserId";

export const WaitRoom = () => {
  const { gameId, gameRoomInfo } = useGameRoomInfo();
  const playerInfos: PlayersInfoUI[] = gameRoomInfo.players.map((player) => {
    return {
      nickName: player.nickName,
      imgSrc: player.imgSrc,
      avgScore: player.avgScore,
      initMoney: gameRoomInfo.gameInfo.bettingLimit,
      readyState: player.readyState,
    };
  });
  // TODO userId 가져오는 부분 구현 확인 필요
  const isRoomMaker = getUserId() === gameRoomInfo.roomMakerId;
  return (
    <>
      <GameTitleAsset title={gameId} />
      <S.Body>
        <GameRoomInfo
          centerType={gameRoomInfo?.gameInfo.gameType}
          name={gameRoomInfo?.gameInfo.golfCenter.name}
          betType={gameRoomInfo?.gameInfo.betType}
          betAmountPerStroke={gameRoomInfo?.gameInfo.betAmountPerStroke}
          bettingLimit={gameRoomInfo?.gameInfo.bettingLimit}
        />
        <PlayersInfo
          players={playerInfos}
          gameMaxPlayer={gameRoomInfo.gameInfo.playerCount}
        />
      </S.Body>
      <S.Footer>
        {/* id가 방장 id와 일치하면 시작하기 아니면 ,규칙 동의 후 준비하기 */}
        {isRoomMaker ? (
          <Button>시작하기</Button>
        ) : (
          <Button variants="outlined">규칙 동의 후, 준비하기</Button>
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
