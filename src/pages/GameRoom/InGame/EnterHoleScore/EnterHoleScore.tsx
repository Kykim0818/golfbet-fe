import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../../../components/Button";
import { useAppSelector } from "../../../../hooks/redux";
import { useModal } from "../../../../hooks/useModal";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { UNENTERED_HOLE_SCORE } from "../../../../service/socketIo/util";
import { typo } from "../../../../styles/typo";
import { deepClone } from "../../../../utils/deepClone";
import { getDisplayEnterScore } from "../../../../utils/display";
import { getCurrentPar } from "../../../../utils/gameInfo";
import { FixHoleScoreResult } from "../FixHoleScore/FixHoleScore";
import { InGameInfo } from "../type";

type EnterHoleScoreProps = {
  handleModalResult?: (result: EnterScoreResult) => void;
};

export type EnterScoreResult = {
  // 모두 입력 상태인지,
  isAllEnter: boolean;
  /** type PlayerScores = Record<string, number>; */
  playerScores: PlayerScores;
  holeInfo: InGameInfo["holeInfos"][number] | null;
};
type PlayerScores = Record<string, number>;

export const EnterHoleScore = ({ handleModalResult }: EnterHoleScoreProps) => {
  const [playerScores, setPlayerScores] = useState<PlayerScores>({});
  const { moveBack } = usePageRoute();
  const { openModal } = useModal();
  // 예외 : par 나 holecount 없을 경우, 닫기
  const gameRoomInfo = useAppSelector((state) => state.game.gameRoomInfo);
  if (gameRoomInfo === undefined) moveBack();
  const inGameInfo = gameRoomInfo?.inGameInfo ?? [];
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

  // ###
  const handleEnterScore = async () => {
    if (gameRoomInfo === undefined) {
      console.log("gameRoomInfo is undefined");
      return;
    }
    // player 전원 점수 입력 상태인지 확인
    let isAllPlayerScoreEntered = true;

    Object.entries(playerScores).forEach(([userId, score]) => {
      // TODO: 포기한 사람인 경우 처리 고려 필요
      if (score === UNENTERED_HOLE_SCORE) {
        isAllPlayerScoreEntered = false;
      }
    });

    // 점수 다입력되었으니 확정으로
    if (isAllPlayerScoreEntered) {
      const res = await openModal<FixHoleScoreResult>({
        id: "FIX_HOLE_SCORE",
        args: {
          gameRoomInfo,
          playerScores,
        },
      });
      if (res.result) {
        console.log("TODO : 점수 확정", res);
        // player 데이터 만들기,
        // TODO: Ingame 정보 받아와서 이전홀 정보 확인해야 함
        const players: InGameInfo["holeInfos"][number]["players"] = {};
        Object.entries(playerScores).forEach(([userId, score]) => {
          players[userId] = {
            strokes: score,
            moneyChange: res.playersMoneyChange[userId],
            previousMoney:
              inGameInfo[currentHole]?.players[userId].remainingMoney ??
              gameRoomInfo.gameInfo.bettingLimit,
            remainingMoney:
              gameRoomInfo.gameInfo.bettingLimit +
              res.playersMoneyChange[userId],
          };
        });
        handleModalResult?.({
          isAllEnter: true,
          playerScores,
          holeInfo: {
            players,
            doubleConditions: [],
            ddang: res.ddang,
            hole: currentHole,
            par: currentPar,
          },
        });
      }
    }
    // 점수 다입력 안되엇으므로 그냥 입력 처리
    else {
      console.log("일부 점수 입력");
      handleModalResult?.({
        isAllEnter: false,
        playerScores,
        holeInfo: null,
      });
    }
  };

  useEffect(() => {
    const scores: PlayerScores = {};
    players.forEach((player) => {
      scores[player.userId] = player.holeScores[currentHole - 1];
    });
    setPlayerScores(scores);
  }, [gameRoomInfo, players, currentHole]);

  return (
    <>
      <S.ModalHeader>
        <div className="modalheader__title">스코어 입력하기</div>
        <img
          onClick={moveBack}
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
        <Button onClick={handleEnterScore}>확인</Button>
      </S.Footer>
    </>
  );
};

const S = {
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
    overflow: auto;
  `,
  Section: styled.section`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    padding: 25px 20px;
    height: 80%;
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
