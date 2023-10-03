import styled from "styled-components";
import { GameInfo } from "../../MakeGame/MakeGame";
import { ParBlock, STATUS } from "./ParBlock";
import { typo } from "../../../styles/typo";

type GameBoardProps = {
  currentHole: number;
  centerInfo: GameInfo["golfCenter"];
};

export const GameBoard = ({ currentHole, centerInfo }: GameBoardProps) => {
  return (
    <S.Wrapper>
      <S.CourseName>{centerInfo.frontNineCourse.name}</S.CourseName>
      {centerInfo.frontNineCourse.pars.map((par, index) => {
        return (
          <ParBlock
            key={`${index + 1}`}
            holeIndex={index + 1}
            parCount={par}
            status={getHoleStatus(index + 1, currentHole)}
          />
        );
      })}
      <S.CourseName>{centerInfo.backNineCourse.name}</S.CourseName>
      {centerInfo.backNineCourse.pars.map((par, index) => {
        return (
          <ParBlock
            key={`${index + 1}`}
            holeIndex={index + 1}
            parCount={par}
            status={getHoleStatus(index + 1 + 9, currentHole)}
          />
        );
      })}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  `,
  CourseName: styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    ${typo.s10w500}
    color: var(--color-sub-blue, #3181AE);
  `,
};

function getHoleStatus(targetHole: number, currentHole: number) {
  if (targetHole === currentHole) return STATUS.IN_PROGRESS;
  if (targetHole > currentHole) return STATUS.NOT_STARTED;
  return STATUS.COMPLETED;
}
