import { useMemo } from "react";
import styled from "styled-components";
import { GameRoomUser } from "../../../pages/GameRoom/GameRoom";
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

  //
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
  return (
    <S.Wrapper>
      <S.Body>
        <S.Section>
          {players.map((player) => {
            return (
              <div>
                <div>
                  <span>nickName</span>
                  <img alt="profile_image" />
                </div>
                <S.ScoreButtons>
                  {inputScores.map((score) => {
                    return (
                      <S.ScoreButton
                        key={score}
                        isSelected={player.holeScores[holeCount - 1] === score}
                      >
                        {score}
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
        <Button onClick={handleNext}>확인</Button>
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
    flex-direction: column;
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,

  ScoreButtons: styled.div`
    display: flex;
  `,
  ScoreButton: styled.button<{ isSelected: boolean }>``,
};
