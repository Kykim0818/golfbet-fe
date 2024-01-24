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
import { FinalizeHoleScoreResult } from "../FinalizeHoleScore/FinalizeHoleScore";
import { InGameInfo } from "../type";

export type ModifyEnterHoleScoreProps = {
  modifyTargetHole: number;
  handleModalResult?: (result: ModifyEnterScoreResult) => void;
};

export type ModifyEnterScoreResult = {
  /** type PlayerScores = Record<string, number>; */
  playerScores: PlayerScores;
  holeInfo?: Omit<InGameInfo["holeInfos"][number], "ddang">;
};
type PlayerScores = Record<string, number>;

export const ModifyEnterHoleScore = ({
  modifyTargetHole,
  handleModalResult,
}: ModifyEnterHoleScoreProps) => {
  const [playerScores, setPlayerScores] = useState<PlayerScores>({});
  const { moveBack } = usePageRoute();
  const { openModal } = useModal();
  // 예외 : par 나 holecount 없을 경우, 닫기
  const gameRoomInfo = useAppSelector((state) => state.game.gameRoomInfo);
  if (gameRoomInfo === undefined) throw Error("gameRoomInfo is undefined");
  const { inGameInfo } = gameRoomInfo;
  const modifyTargetPar = getCurrentPar(
    modifyTargetHole,
    gameRoomInfo.gameInfo.golfCenter.frontNineCourse.pars,
    gameRoomInfo.gameInfo.golfCenter.backNineCourse.pars
  );
  const inputScores = useMemo(() => {
    if (modifyTargetPar) {
      const scores = [];
      const maxScore = modifyTargetPar;
      const minScore = modifyTargetPar * -1 + 1;
      for (let i = minScore; i <= maxScore; i++) {
        scores.push(i);
      }
      return scores;
    }
    return [];
  }, [modifyTargetPar]);

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
  const handleModifyEnterScore = async () => {
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
      // #1 니어 롱기 처리
      const isNearLong = modifyTargetPar === 3 || modifyTargetPar === 5;
      const nearLong: string[] = [];
      if (isNearLong) {
        // string | boolean 인 이유는 뒤로가기로 modal 닫힐 경우에는 false 를 리턴하기 때문.
        let nearLongRes: string | boolean = false;
        if (modifyTargetPar === 3) {
          nearLongRes = await openModal<string>({
            id: "SELECT_NEAR_LONG",
            args: {
              players,
              nearLongType: "nearest",
            },
          });
        } else if (modifyTargetPar === 5) {
          nearLongRes = await openModal<string>({
            id: "SELECT_NEAR_LONG",
            args: {
              players,
              nearLongType: "longest",
            },
          });
        }

        if (typeof nearLongRes === "string" && nearLongRes !== "") {
          nearLong.push(nearLongRes);
        }
        // 니어,롱기 선택창에서 취소를 눌럿다면 땅 진행이 아니고 진행 취소
        if (nearLongRes === false) return;
      }
      // TODO : 여기서 입력제어
      const res = await openModal<FinalizeHoleScoreResult>({
        id: "FINALIZE_HOLE_SCORE",
        args: {
          gameRoomInfo,
          playerScores,
          nearLong,
        },
      });
      if (res.result) {
        // player 데이터 만들기,
        // TODO: Ingame 정보 받아와서 이전홀 정보 확인해야 함
        const players: InGameInfo["holeInfos"][number]["players"] = {};
        Object.entries(playerScores).forEach(([userId, score]) => {
          // 수정 이전의 돈은 변하지 않으므로 그대로 사용
          const previousMoney =
            inGameInfo.holeInfos[modifyTargetHole - 1].players[userId]
              .previousMoney;
          players[userId] = {
            strokes: score,
            moneyChange: res.playersMoneyChange[userId],
            previousMoney,
            remainingMoney: previousMoney + res.playersMoneyChange[userId],
          };
        });
        handleModalResult?.({
          playerScores,
          holeInfo: {
            players,
            doubleConditions: res.doubleConditions,
            hole: modifyTargetHole,
            par: modifyTargetPar,
          },
        });
      }
    }
    // 점수 다입력 안되엇으므로 그냥 입력 처리
    else {
      openModal({
        id: "ALERT",
        args: {
          title: "점수 수정",
          msg: "모든 유저의 점수가 입력되어야 합니다.",
          okBtnLabel: "확인",
        },
      });
    }
  };

  useEffect(() => {
    const scores: PlayerScores = {};
    players.forEach((player) => {
      scores[player.userId] = player.holeScores[modifyTargetHole - 1];
    });
    setPlayerScores(scores);
  }, [gameRoomInfo, players, modifyTargetHole]);

  return (
    <>
      <S.ModalHeader>
        <div className="modalheader__title">스코어 수정하기</div>
        <img
          onClick={moveBack}
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="close"
        />
      </S.ModalHeader>
      <S.HoleInfo>
        {modifyTargetHole} H | 파 {modifyTargetPar}
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
        <Button onClick={handleModifyEnterScore}>확인</Button>
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
