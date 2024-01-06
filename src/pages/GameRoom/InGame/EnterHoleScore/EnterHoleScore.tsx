import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../../../components/Button";
import { useAppSelector } from "../../../../hooks/redux";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { typo } from "../../../../styles/typo";
import { getDisplayEnterScore } from "../../../../utils/display";
import { getCurrentPar } from "../../../../utils/gameInfo";
import { UNENTERED_HOLE_SCORE } from "../../../../service/socketIo/util";
import { deepClone } from "../../../../utils/deepClone";

type EnterHoleScoreProps = {
  handleModalResult?: (result: any) => void;
};

type PlayerScores = Record<string, number>;

export const EnterHoleScore = ({ handleModalResult }: EnterHoleScoreProps) => {
  const [playerScores, setPlayerScores] = useState<PlayerScores>({});
  const { moveBack } = usePageRoute();
  // 예외 : par 나 holecount 없을 경우, 닫기
  const gameRoomInfo = useAppSelector((state) => state.game.gameRoomInfo);
  if (gameRoomInfo === undefined) moveBack();

  const currentHole = gameRoomInfo?.gameInfo.currentHole ?? 1;
  const currentPar = getCurrentPar(
    currentHole,
    gameRoomInfo!?.gameInfo.golfCenter.frontNineCourse.pars,
    gameRoomInfo!?.gameInfo.golfCenter.backNineCourse.pars
  );
  const inputScores = useMemo(() => {
    if (currentPar) {
      const scores = [];
      const maxScore = currentPar;
      const minScore = currentPar * -1 + 1;
      for (let i = minScore; i <= maxScore; i++) {
        scores.push(i);
      }
      return scores;
    }
    return [];
  }, [currentPar]);
  const players = gameRoomInfo?.players ?? [];

  const handleClickScoreBtn = (playerId: string, clickedValue: number) => {
    const scores: PlayerScores = deepClone(playerScores);
    if (playerScores[playerId] === clickedValue) {
      scores[playerId] = UNENTERED_HOLE_SCORE;
    } else {
      scores[playerId] = clickedValue;
    }
    setPlayerScores(scores);
    // 기존 입력점수람 같은 버튼을 클릭하면 끄기
    // 다른 버튼 클릭하면 선택 되게 하기
  };
  const handleGameFinish = () => {
    //
    console.log("finish");
  };

  useEffect(() => {
    const scores: PlayerScores = {};
    players.forEach((player) => {
      scores[player.userId] = player.holeScores[currentHole - 1];
    });
    setPlayerScores(scores);
  }, []);

  return (
    <S.Wrapper>
      <S.ModalHeader>
        <div className="modalheader__title">스코어 입력하기</div>
        <img
          onClick={() => handleModalResult?.(true)}
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="close"
        />
      </S.ModalHeader>
      <S.HoleInfo>
        {currentHole} H | 파 {currentPar}
      </S.HoleInfo>
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
                        isSelected={playerScores[player.userId] === score}
                        onClick={() =>
                          handleClickScoreBtn(player.userId, score)
                        }
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
  ModalHeader: styled.div`
    display: flex;
    justify-content: center;

    .modalheader__title {
      top: 25px;
      position: absolute;
      ${typo.s16w700}
      color: var(--color-main, #009EB2);
    }
    img {
      top: 25px;
      position: absolute;
      right: 16.5px;
    }
  `,
  HoleInfo: styled.span`
    display: flex;
    justify-content: center;

    color: var(--color-main-darker, #003d45);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-bottom: 20px;
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
      border-radius: 50%;
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
