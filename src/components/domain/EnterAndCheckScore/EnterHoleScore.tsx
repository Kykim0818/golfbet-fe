import { useMemo } from "react";
import styled, { css } from "styled-components";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { GameRoomUser } from "../../../pages/GameRoom/GameRoom";
import { typo } from "../../../styles/typo";
import { getDisplayEnterScore } from "../../../utils/display";
import Button from "../../Button";

type EnterHoleScoreProps = {
  handleNext: () => void;
  players: GameRoomUser[];
  holeCount: number;
  par: number;
};

export const EnterHoleScore = ({
  handleNext,
  players,
  holeCount,
  par,
}: EnterHoleScoreProps) => {
  // 예외 : par 나 holecount 없을 경우, 닫기
  const { movePage } = usePageRoute();
  const inputScores = useMemo(() => {
    if (par) {
      const scores = [];
      const maxScore = par;
      const minScore = par * -1 + 1;
      for (let i = minScore; i <= maxScore; i++) {
        scores.push(i);
      }
      return scores;
    }
    return [];
  }, [par]);

  const handleGameFinish = () => {
    handleNext();

    setTimeout(() => {
      movePage("/game_end");
    }, 100);
  };

  return (
    <S.Wrapper>
      <S.Body>
        <S.Section>
          {players.map((player) => {
            return (
              <div key={player.userId}>
                <S.UserSection>
                  <img src={player.imgSrc} alt="avatar" />
                  <span>{player.nickName}</span>
                </S.UserSection>
                <S.ScoreButtons>
                  {inputScores.map((score) => {
                    return (
                      <S.ScoreButton
                        key={score}
                        isSelected={player.holeScores[holeCount - 1] === score}
                      >
                        {getDisplayEnterScore(score)}
                      </S.ScoreButton>
                    );
                  })}
                </S.ScoreButtons>
              </div>
            );
          })}
        </S.Section>
      </S.Body>
      <S.Footer>
        <Button onClick={handleGameFinish}>확인</Button>
      </S.Footer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Header: styled.header`
    display: flex;
  `,
  Body: styled.main`
    display: flex;
    flex-grow: 1;
  `,
  Section: styled.section`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    padding: 25px 20px;
    overflow: auto;
  `,
  UserSection: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 35px;
      height: 35px;
      min-width: 35px;
      min-height: 35px;
    }
    span {
      ${typo.s14w700}
      color : #504F4F;
    }
    margin-bottom: 15px;
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,

  ScoreButtons: styled.div`
    display: flex;
    gap: 10px;
  `,
  ScoreButton: styled.button<{ isSelected: boolean }>`
    display: flex;
    padding: 16px 14px;

    box-sizing: border-box;
    border: none;
    border-radius: 15px;

    ${typo.s14w700}

    ${(props) =>
      props.isSelected
        ? css`
            background-color: #b0e6ed;
            color: var(--color-main, #009eb2);
          `
        : css`
            background-color: #f4f7fd;
            color: #d3dae7;
          `}
  `,
};
