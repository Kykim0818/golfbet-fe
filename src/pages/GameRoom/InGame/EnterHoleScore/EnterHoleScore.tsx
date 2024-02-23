import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../../../components/Button";
import GameAbandonMark from "../../../../components/domain/GameAbandonMark";
import { useAppSelector } from "../../../../hooks/redux";
import { useModal } from "../../../../hooks/useModal";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { useSockets } from "../../../../service/socketIo/socketIo.context";
import { UNENTERED_HOLE_SCORE } from "../../../../service/socketIo/util";
import { typo } from "../../../../styles/typo";
import { deepClone } from "../../../../utils/deepClone";
import {
  getDisplayEnterScore,
  getDisplayHole,
} from "../../../../utils/display";
import { getCurrentPar } from "../../../../utils/gameInfo";
import { FinalizeHoleScoreResult } from "../FinalizeHoleScore/FinalizeHoleScore";
import { InGameInfo } from "../type";

type EnterHoleScoreProps = {
  handleModalResult?: (result: EnterScoreResult) => void;
};

export type EnterScoreResult = {
  // 모두 입력 상태인지,
  isAllEnter: boolean;
  /** type PlayerScores = Record<string, number>; */
  playerScores: PlayerScores;
  holeInfo?: InGameInfo["holeInfos"][number];
  // 기권자들
  surrenders: string[];
};
type PlayerScores = Record<string, number>;

export const EnterHoleScore = ({ handleModalResult }: EnterHoleScoreProps) => {
  const [playerScores, setPlayerScores] = useState<PlayerScores>({});
  const { moveBack } = usePageRoute();
  const { openModal } = useModal();
  const { setCanEnterScore } = useSockets();
  // 예외 : par 나 holecount 없을 경우, 닫기
  const gameRoomInfo = useAppSelector((state) => state.game.gameRoomInfo);
  const userInfo = useAppSelector((state) => state.users.userInfo);
  if (gameRoomInfo === undefined) throw Error("gameRoomInfo is undefined");
  const { gameInfo, players, inGameInfo } = gameRoomInfo;
  const { gameId, currentHole, golfCenter, bettingLimit } = gameInfo;
  const { holeInfos, canInputScore } = inGameInfo;

  const currentPar = getCurrentPar(
    currentHole,
    golfCenter.frontNineCourse.pars,
    golfCenter.backNineCourse.pars
  );
  const isCanInputScore =
    canInputScore === "" || canInputScore === userInfo.userId;
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

  useEffect(() => {
    if (isCanInputScore === false) {
      openModal({
        id: "ALERT",
        args: {
          title: "점수 입력",
          msg: "다른 사용자가 점수 계산 중입니다.",
          okBtnLabel: "확인",
        },
      }).then(() => {
        moveBack();
      });
    }
  }, [isCanInputScore, moveBack]);

  useEffect(() => {
    const scores: PlayerScores = {};
    players.forEach((player) => {
      scores[player.userId] = player.holeScores[currentHole - 1];
    });
    setPlayerScores(scores);
  }, [gameRoomInfo, players, currentHole]);

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
    const gameQuitPlayers = players.filter(
      (player) => player.isGameQuit === true
    );
    const gameQuitPlayerIds = new Set(
      gameQuitPlayers.map((player) => player.userId)
    );
    Object.entries(playerScores).forEach(([userId, score]) => {
      // TODO: 포기한 사람인 경우 처리 고려 필요
      if (score === UNENTERED_HOLE_SCORE && !gameQuitPlayerIds.has(userId)) {
        isAllPlayerScoreEntered = false;
      }
    });
    // 점수 다입력되었으니 확정으로
    if (isAllPlayerScoreEntered) {
      // 여기서 입력제어
      if (gameId === undefined) return;
      if (userInfo.userId === undefined) {
        console.log("userInfo.userId is undefined");
        return;
      }
      setCanEnterScore(gameId, userInfo.userId);
      // #1 니어 롱기 처리
      const isNearLong = currentPar === 3 || currentPar === 5;
      const nearLong: string[] = [];
      if (isNearLong) {
        // string | boolean 인 이유는 뒤로가기로 modal 닫힐 경우에는 false 를 리턴하기 때문.
        let nearLongRes: string | boolean = false;
        if (currentPar === 3) {
          nearLongRes = await openModal<string>({
            id: "SELECT_NEAR_LONG",
            args: {
              players,
              nearLongType: "nearest",
            },
          });
        } else if (currentPar === 5) {
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
        if (nearLongRes === false) {
          setCanEnterScore(gameId, "");
          return;
        }
      }
      // TODO : 여기서 입력제어
      const filteredPlayerScores: PlayerScores = {};
      players.forEach((player) => {
        if (player.isGameQuit) return;
        filteredPlayerScores[player.userId] = playerScores[player.userId];
      });

      const res = await openModal<FinalizeHoleScoreResult>({
        id: "FINALIZE_HOLE_SCORE",
        args: {
          gameRoomInfo,
          playerScores: filteredPlayerScores,
          nearLong,
        },
      });
      if (res.result) {
        // player 데이터 만들기,
        // TODO: Ingame 정보 받아와서 이전홀 정보 확인해야 함
        const players: InGameInfo["holeInfos"][number]["players"] = {};
        Object.entries(playerScores).forEach(([userId, score]) => {
          // 현재홀 idx = 현재홀 - 1,로 이전홀의 idx = 현재홀 - 2
          const previousHoleIndex = currentHole - 2;
          // 1홀(이전 홀 idx = -1) 일때 는 베팅 준비금,
          const previousMoney =
            previousHoleIndex < 0
              ? bettingLimit
              : holeInfos?.[previousHoleIndex]?.players[userId].remainingMoney;
          players[userId] = {
            strokes: score,
            moneyChange: res.playersMoneyChange[userId] ?? 0,
            previousMoney,
            remainingMoney:
              previousMoney +
              (res.playersMoneyChange[userId] ?? 0) +
              res.plusMoney,
          };
        });

        handleModalResult?.({
          isAllEnter: true,
          playerScores,
          holeInfo: {
            players,
            ddang: false, // 일단 default return
            doubleConditions: res.doubleConditions,
            hole: currentHole,
            par: currentPar,
          },
          surrenders: res.surrenders,
        });
      } else {
        setCanEnterScore(gameId, "");
      }
    }
    // 점수 다입력 안되엇으므로 그냥 입력 처리
    else {
      console.log("일부 점수 입력");
      handleModalResult?.({
        isAllEnter: false,
        playerScores,
        surrenders: [],
      });
    }
  };

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
        {getDisplayHole(currentHole)} H | 파 {currentPar}
      </S.HoleInfo>
      <S.Body>
        <S.Section>
          {players.map((player) => {
            return (
              <div key={player.userId}>
                <S.UserSection isGameQuit={player.isGameQuit}>
                  <img src={player.imgSrc} alt="avatar" />
                  <span className="user__nickname">{player.nickName}</span>
                  {player.isGameQuit && <GameAbandonMark />}
                </S.UserSection>
                <S.ScoreButtons>
                  {inputScores.map((score) => {
                    return (
                      <S.ScoreButton
                        disabled={player.isGameQuit}
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
        <Button disabled={!isCanInputScore} onClick={handleEnterScore}>
          {isCanInputScore ? "확인" : "점수 계산 중 입니다."}
        </Button>
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
  UserSection: styled.div<{ isGameQuit: boolean }>`
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
    .user__nickname {
      ${typo.s14w700}
      color : ${(props) =>
        props.isGameQuit ? `var(--color-gray-300,#DADCE0)` : "#504F4F"};
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
