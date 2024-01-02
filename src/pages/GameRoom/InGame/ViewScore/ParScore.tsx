import styled from "styled-components";
import { Player } from "./Player";

type ParScoreProps = {
  holeNumber: number;
  par: number;
  enterScoreTime: string;
  players: {
    id: string;
    nickname: string;
    imgSrc: string;
    score: number;
    money: number;
    moneyChangeFromPreviousHole: number;
  }[];
};

export const ParScore = ({
  holeNumber,
  par,
  enterScoreTime,
  players,
}: ParScoreProps) => {
  return (
    <S.Wrapper>
      <S.Section1>
        <S.HolePar>
          {holeNumber}H | 파{par}
        </S.HolePar>
        <S.TimeStamp>{enterScoreTime}</S.TimeStamp>
      </S.Section1>
      {/* 배판 조건 or 땅 표시 */}
      <S.Section2>없음</S.Section2>
      <S.Section3>
        <S.PlayerSection>
          <Player />
        </S.PlayerSection>
      </S.Section3>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Section1: styled.div`
    display: flex;
  `,
  HolePar: styled.span`
    color: var(--color-main-darker, "#003D45");
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  TimeStamp: styled.span`
    color: #818181;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,

  Section2: styled.div``,
  Section3: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  PlayerSection: styled.div`
    display: flex;
  `,
};
