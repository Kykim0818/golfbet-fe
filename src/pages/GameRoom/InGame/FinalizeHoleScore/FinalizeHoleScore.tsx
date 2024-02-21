import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { useModal } from "../../../../hooks/useModal";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { typo } from "../../../../styles/typo";
import { deepClone } from "../../../../utils/deepClone";
import {
  getDisplayDoubleText,
  getDisplayHole,
} from "../../../../utils/display";
import { getCurrentPar } from "../../../../utils/gameInfo";
import {
  applyNearLongRule,
  calculateChangeMoney,
  checkDoubleCondition,
} from "../../../../utils/score";
import { GameRoomInfo } from "../../GameRoom";
import { EnterScoreResult } from "../EnterHoleScore/EnterHoleScore";
import { isApplyDdang } from "../util";
import { PlayerRow } from "./PlayerRow";

export type FinalizeHoleScoreProps = {
  handleModalResult?: (result: FinalizeHoleScoreResult) => void;
  playerScores: EnterScoreResult["playerScores"];
  gameRoomInfo: GameRoomInfo;
  /**
   * 니어리스트 , 롱기스트 선택 유저 id
   */
  nearLong: string[];
  /**
   * 점수 수정 처리 구분
   */
  modifyTargetHole?: number;
};

export type FinalizeHoleScoreResult = {
  result: boolean;
  doubleConditions: string[];
  playersMoneyChange: Record<string, number>;
  chargeOrSurrender: Record<string, "charge" | "surrender">;
};

export const FinalizeHoleScore = ({
  handleModalResult,
  playerScores,
  gameRoomInfo,
  nearLong,
  modifyTargetHole,
}: FinalizeHoleScoreProps) => {
  const { moveBack } = usePageRoute();
  const { openModal } = useModal();
  const { gameInfo, players, inGameInfo } = gameRoomInfo;
  const {
    betAmountPerStroke,
    bettingLimit,
    currentHole,
    golfCenter: {
      frontNineCourse: { pars: frontNineCoursePar },
      backNineCourse: { pars: backNineCoursePar },
    },
    gameRule: { ddang, specialBetRequirements },
  } = gameInfo;
  const { holeInfos } = inGameInfo;
  // 게임 포기했을 경우 포기 확정의 경우는 마지막에 단계를 지나야 이뤄지기 때문에
  // UI상에서 포기정보를 보여주기 위해 필요함
  const [uiPlayers, setUiPlayers] = useState(deepClone(players));
  const chargeOrSurrender = useRef<Record<string, "charge" | "surrender">>({});
  const targetHole = modifyTargetHole ?? currentHole;
  const targetPar = getCurrentPar(
    targetHole,
    frontNineCoursePar,
    backNineCoursePar
  );
  const doubleConditions = checkDoubleCondition(
    targetPar,
    specialBetRequirements,
    playerScores
  );
  // TODO : 땅여부 확인을 해야함
  const isDdang = isApplyDdang(targetHole - 1, inGameInfo.holeInfos);
  // 추가 정보 결정 해야함 점수로 배판인지여
  if (isDdang) doubleConditions.push("ddang");

  let playersMoneyChange = calculateChangeMoney(
    doubleConditions.length === 0 ? false : true,
    betAmountPerStroke,
    playerScores
  );
  // near long 계산
  if (nearLong.length !== 0) {
    playersMoneyChange = applyNearLongRule(
      doubleConditions.length !== 0,
      nearLong,
      playersMoneyChange,
      gameInfo
    );
  }
  // 금액 부족한 유저 찾기
  const previousPlayersMoneyInfo = holeInfos[currentHole - 2]?.players ?? {};
  const inSufficientBalanceUsers = Object.entries(playersMoneyChange).filter(
    ([userId, changeMoney]) => {
      const previousMoney =
        previousPlayersMoneyInfo[userId]?.previousMoney ?? bettingLimit;

      if (previousMoney + changeMoney < 0) return true;
      return false;
    }
  );

  useEffect(() => {
    // 수정 홀이 아니면 변화량에 잔액이 부족한지 확인해야함
    if (modifyTargetHole) return;
    if (inSufficientBalanceUsers.length <= 0) return;
    // openModal 하고 결과에 따라 chargeOrSurrender 값 반영
    console.log("잔액 부족 발생");
  }, [modifyTargetHole, inSufficientBalanceUsers.length]);

  const handleEnterScore = async () => {
    handleModalResult?.({
      doubleConditions,
      playersMoneyChange,
      result: true,
      // ddang: isDdangDeclare,
      chargeOrSurrender: chargeOrSurrender.current,
    });
  };

  return (
    <>
      <S.ModalHeader>
        <div className="modalheader__title">결과</div>
        <img
          onClick={moveBack}
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="close"
        />
      </S.ModalHeader>
      <S.HoleInfo>
        {getDisplayHole(targetHole)} H | 파 {targetPar}
      </S.HoleInfo>
      <S.Body>
        <S.HoleBetInfo>
          {getDisplayDoubleText(doubleConditions, targetPar, players.length)}
        </S.HoleBetInfo>
        <S.Players>
          {uiPlayers.map((player) => {
            return (
              <PlayerRow
                key={player.userId}
                imgSrc={player.imgSrc}
                nickName={player.nickName}
                score={playerScores[player.userId]}
                changeMoney={playersMoneyChange[player.userId]}
              />
            );
          })}
        </S.Players>
      </S.Body>
      <S.Footer>
        <Button onClick={handleEnterScore}>확정하기</Button>
        <Button variants="outlined" onClick={moveBack}>
          수정하기
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
  //
  Body: styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0px 15px;

    overflow: auto;
  `,
  HoleBetInfo: styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 11.25px;

    ${typo.s14w500}
    background-color: var(--color-main-light-hover, '#d9f3f6');
    color: var(--color-main-dark, #008395);
    padding: 10px 0px;
  `,

  Players: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    margin-top: 25px;
    margin-bottom: 25px;
  `,

  //
  Footer: styled.footer`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0px 20px 20px 20px;
  `,
};
