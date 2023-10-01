import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import GameTitleAsset from "../../../components/domain/GameTitleAsset";
import { getUserId } from "../../../utils/getUserId";
import { useGameRoomInfo } from "../GameRoom";
import { GameRoomInfo } from "./GameRoomInfo";
import { PlayersInfo, PlayersInfoUI } from "./PlayersInfo";

export const WaitRoom = () => {
  const navigate = useNavigate();
  const { gameId, gameRoomInfo } = useGameRoomInfo();
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
  // TODO userId 가져오는 부분 구현 확인 필요
  const isRoomMaker = getUserId() === gameRoomInfo.roomMakerId;

  const handleGameStart = () => {
    //
    navigate(`/process_game/${gameId}`);
  };

  return (
    <>
      <GameTitleAsset
        visibleBack
        handleBack={() => navigate(-1)}
        title={gameId}
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
          players={playerInfos}
          gameMaxPlayer={gameRoomInfo.gameInfo.playerCount}
          isHandicapPre={gameRoomInfo?.gameInfo.gameRule.handiType[0] === "pre"}
        />
      </S.Body>
      <S.Footer>
        {/* id가 방장 id와 일치하면 시작하기 아니면 ,규칙 동의 후 준비하기 */}
        {isRoomMaker ? (
          <Button onClick={handleGameStart}>시작하기</Button>
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
