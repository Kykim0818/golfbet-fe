import styled, { css } from "styled-components";
import { UNENTERED_HOLE_SCORE } from "../../../service/socketIo/util";
import { typo } from "../../../styles/typo";
import { getDisplayScore } from "../../../utils/display";

type ScoreBoardProps = {
  pars: number[];
  holeScores: number[];
};

export const ScoreBoard = ({ pars, holeScores }: ScoreBoardProps) => {
  const NAME_COL_INDEX = 0;
  const COLS = ["HOLE", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const total = getTotalParAndScore(pars, holeScores);
  return (
    <S.Wrapper>
      {COLS.map((COL, index) => {
        return (
          <S.ColWrapper key={COL}>
            <S.Block header>{COLS[index]}</S.Block>
            <S.Block text={index === NAME_COL_INDEX}>
              {index === NAME_COL_INDEX ? "PAR" : pars[index - 1]}
            </S.Block>
            <S.Block score text={index === NAME_COL_INDEX}>
              {index === NAME_COL_INDEX
                ? "SCORE"
                : getDisplayScore(holeScores[index - 1])}
            </S.Block>
          </S.ColWrapper>
        );
      })}
      <S.ColWrapper>
        <S.Block header>Total</S.Block>
        <S.Block>{total.totalPar}</S.Block>
        <S.Block score>{total.totalScore}</S.Block>
      </S.ColWrapper>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-grow: 1;
  `,
  ColWrapper: styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  `,
  Block: styled.div<{ header?: boolean; text?: boolean; score?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 8.5px;

    ${typo.s12w500}
    ${(props) =>
      props.score &&
      css`
        ${typo.s12w700}
      `}
    color: ${(props) =>
      props.header || props.text
        ? `var(--color-main-darker, '#003d45')`
        : `var(--color-sub-blue,#3181ae)`};
    background-color: ${(props) => (props.header ? "#B0E6ED;" : "#fff")};
  `,
};

function getTotalParAndScore(pars: number[], scores: number[]) {
  const MAX_HOLE_NUMBER = 9;
  let totalPar = 0;
  let totalScore = 0;
  for (let i = 0; i < MAX_HOLE_NUMBER; i++) {
    if (pars[i]) {
      totalPar = totalPar + pars[i];
      if (scores[i] !== UNENTERED_HOLE_SCORE) {
        totalScore = totalScore + scores[i];
      }
    } else {
      console.log(`${i}th parCount is undefined`);
      break;
    }
  }
  return {
    totalPar,
    totalScore,
  };
}
