import { useState } from "react";
import styled from "styled-components";
import { RankBoardPlayerInfo } from "../../../../components/domain/RankBoard/RankBoardPlayerInfo";
import ScoreBoard from "../../../../components/domain/ScoreBoard";
import { deepClone } from "../../../../utils/deepClone";
import { divideFrontAndBackScores } from "../../../../utils/score";
import { GameInfo } from "../../../MakeGame/MakeGame";
import { GameRoomUser } from "../../GameRoom";

type LeaderBoardTabProps = {
  players: GameRoomUser[];
  centerInfo: GameInfo["golfCenter"];
  userId: string;
};

export const LeaderBoardTab = ({
  players,
  centerInfo,
  userId,
}: LeaderBoardTabProps) => {
  const NOT_FOLD_PLAYER = -1;
  const [selectUser, setSelectUser] = useState(
    players.findIndex((player) => player.userId === userId)
  );
  const frontNinePars = centerInfo.frontNineCourse.pars;
  const backNinePars = centerInfo.backNineCourse.pars;

  // # 점수 별로 소팅
  const sortedPlayerByScore = deepClone(players).sort(
    (playerA, playerB) => playerA.currentScore - playerB.currentScore
  );
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
              nickName={player.nickName}
              imgSrc={player.imgSrc}
              isSelf={player.userId === userId}
              currentMoney={player.currentMoney}
              currentScore={player.currentScore}
              isGameQuit={player.isGameQuit}
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
