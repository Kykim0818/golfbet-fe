import styled from "styled-components";
import { GameRoomUser } from "../GameRoom/GameRoom";
import { getUserId } from "../../utils/getUserId";
import { RankBoardPlayerInfo } from "../GameProcess/RankBoard/RankBoardPlayerInfo";
import { useState } from "react";
import ScoreBoard from "../../components/domain/ScoreBoard";
import { divideFrontAndBackScores } from "../../utils/score";

type ScoreHistroyRankBoardProps = {
  players: GameRoomUser[];
  frontNinePars: number[];
  backNinePars: number[];
};

export const ScoreHistroyRankBoard = ({
  players,
  frontNinePars,
  backNinePars,
}: ScoreHistroyRankBoardProps) => {
  const NOT_FOLD_PLAYER = -1;
  const [selectUser, setSelectUser] = useState(NOT_FOLD_PLAYER);
  // # 점수 별로 소팅
  const sortedPlayerByScore = players.sort(
    (playerA, playerB) => playerA.currentScore - playerB.currentScore
  );
  const userId = getUserId();
  const handleClickRankPlayer = (playerIndex: number) => {
    if (selectUser === playerIndex) {
      setSelectUser(NOT_FOLD_PLAYER);
      return;
    }
    setSelectUser(playerIndex);
  };
  return (
    <S.Wrapper>
      {sortedPlayerByScore.map((player, index) => {
        const scores = divideFrontAndBackScores(player.holeScores);
        return (
          <S.RankBoardSection
            onClick={() => handleClickRankPlayer(index)}
            key={player.userId}
          >
            <RankBoardPlayerInfo
              key={player.userId}
              rank={index + 1}
              id={player.userId}
              imgSrc={player.imgSrc}
              isSelf={player.userId === userId}
              currentMoney={player.currentMoney}
              currentScore={player.currentScore}
            />
            {selectUser === index && (
              <>
                <ScoreBoard
                  pars={frontNinePars}
                  holeScores={scores.frontNineScores}
                />
                <ScoreBoard
                  pars={backNinePars}
                  holeScores={scores.backNineScores}
                />
              </>
            )}
          </S.RankBoardSection>
        );
      })}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  RankBoardSection: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
