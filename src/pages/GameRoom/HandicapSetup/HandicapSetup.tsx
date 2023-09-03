import styled from "styled-components";
import TitleAsset from "../../../components/TitleAsset";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { useGameRoomInfo } from "../GameRoom";
import { getUserId } from "../../../utils/getUserId";

export const HandicapSetup = () => {
  const navigate = useNavigate();
  const { gameId, gameRoomInfo } = useGameRoomInfo();
  const handleBackBtn = () => {
    navigate(`/game_room/${gameId}`, { replace: true });
  };
  const handleAddHandiCapBtn = () => {
    // 추가
  };
  //
  const myId = getUserId();
  const users = gameRoomInfo.players.filter((player) => player.userId !== myId);

  return (
    <>
      <TitleAsset visibleBack handleBack={handleBackBtn} title="핸디캡 주기" />
      <S.Body></S.Body>
      <S.Footer>
        <Button onClick={handleAddHandiCapBtn}>핸디캡 추가</Button>
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
