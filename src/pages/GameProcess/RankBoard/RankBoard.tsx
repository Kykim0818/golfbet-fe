import styled from "styled-components";
import { getUserId } from "../../../utils/getUserId";
import { GameRoomUser } from "../../GameRoom/GameRoom";
import { RankBoardPlayerInfo } from "./RankBoardPlayerInfo";

type RankBoardProps = {
  players: GameRoomUser[];
};

export const RankBoard = ({ players }: RankBoardProps) => {
  // # 점수 별로 소팅
  const sortedPlayerByScore = players.sort(
    (playerA, playerB) => playerA.currentScore - playerB.currentScore
  );
  const userId = getUserId();
  return (
    <S.Wrapper>
      {sortedPlayerByScore.map((player, index) => {
        return (
          <RankBoardPlayerInfo
            key={player.userId}
            rank={index + 1}
            id={player.userId}
            imgSrc={player.imgSrc}
            isSelf={player.userId === userId}
            currentMoney={player.currentMoney}
            currentScore={player.currentScore}
          />
        );
      })}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Player: styled.div`
    display: flex;
  `,
};
