import styled from "styled-components";
import { typo } from "../../../../../styles/typo";
import { GameInfo } from "../../../../MakeGame/MakeGame";
import { ParBlock, STATUS } from "./ParBlock";

type ProgressBoardProps = {
  selectHole: number;
  currentHole: number;
  centerInfo: GameInfo["golfCenter"];
  handleHoleClick: (hole: number) => void;
};

export const ProgressBoard = ({
  selectHole,
  currentHole,
  centerInfo,
  handleHoleClick,
}: ProgressBoardProps) => {
  return (
    <S.Wrapper>
      <S.CourseName>{centerInfo.frontNineCourse.name}</S.CourseName>
      {centerInfo.frontNineCourse.pars.map((par, index) => {
        return (
          <ParBlock
            key={`${index + 1}`}
            hole={index + 1}
            parCount={par}
            status={getHoleStatus(index + 1, currentHole, selectHole)}
            handleHoleClick={handleHoleClick}
          />
        );
      })}
      <S.CourseName>{centerInfo.backNineCourse.name}</S.CourseName>
      {centerInfo.backNineCourse.pars.map((par, index) => {
        return (
          <ParBlock
            key={`${index + 1}`}
            hole={index + 1}
            parCount={par}
            status={getHoleStatus(index + 1 + 9, currentHole, selectHole)}
            handleHoleClick={handleHoleClick}
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

function getHoleStatus(
  targetHole: number,
  currentHole: number,
  selectHole: number
) {
  if (targetHole === currentHole) return STATUS.IN_PROGRESS;
  if (targetHole > currentHole) return STATUS.NOT_STARTED;
  if (targetHole === selectHole) return STATUS.COMPLETED_FOCUS;
  return STATUS.COMPLETED;
}
