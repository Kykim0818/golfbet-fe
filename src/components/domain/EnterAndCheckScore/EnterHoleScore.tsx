import { useMemo, useState } from "react";
import styled from "styled-components";
import { GameRoomUser } from "../../../pages/GameRoom/GameRoom";
import Button from "../../Button";

type EnterHoleScoreProps = {
  players: GameRoomUser[];
  holeCount: number;
  par: number;
};

type EnterHoleScoreStatus = "Enter" | "Check";

export const EnterHoleScore = ({
  players,
  holeCount,
  par,
}: EnterHoleScoreProps) => {
  const [status, setStatus] = useState<EnterHoleScoreStatus>("Enter");
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

  const handleCheckScore = () => {
    window.history.pushState(null, "", window.location.href);
    setStatus("Check");
  };

  return (
    <S.Wrapper>
      <S.Header>
        <div>스코어 입력하기</div>
        <span>
          {holeCount}H | 파{par}
        </span>
      </S.Header>
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
        <Button onClick={handleCheckScore}>확인</Button>
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
