import styled from "styled-components";
import Button from "../../../../components/Button";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { typo } from "../../../../styles/typo";
import { getCurrentPar } from "../../../../utils/gameInfo";
import {
  calculateChangeMoney,
  checkDoubleCondition,
} from "../../../../utils/score";
import { GameRoomInfo } from "../../GameRoom";
import { EnterScoreResult } from "../EnterHoleScore/EnterHoleScore";
import { PlayerRow } from "./PlayerRow";

type FixHoleScoreProps = {
  handleModalResult?: (result: any) => void;
  playerScores: EnterScoreResult["playerScores"];
  gameRoomInfo: GameRoomInfo;
};

export const FixHoleScore = ({
  handleModalResult,
  playerScores,
  gameRoomInfo,
}: FixHoleScoreProps) => {
  const { moveBack } = usePageRoute();
  const currentHole = gameRoomInfo?.gameInfo.currentHole ?? 1;
  const currentPar = getCurrentPar(
    currentHole,
    gameRoomInfo!?.gameInfo.golfCenter.frontNineCourse.pars,
    gameRoomInfo!?.gameInfo.golfCenter.backNineCourse.pars
  );

  // TODO : 땅여부 확인을 어
  // 추가 정보 결정 해야함 점수로 배판인지여
  const doubleConditions = checkDoubleCondition(
    gameRoomInfo.gameInfo.gameRule.specialBetRequirements,
    currentPar,
    playerScores
  );
  const playersMoneyChange = calculateChangeMoney(
    doubleConditions.length === 0 ? true : false,
    gameRoomInfo.gameInfo.betAmountPerStroke,
    currentPar,
    playerScores
  );
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
        <S.HoleBetInfo>{}</S.HoleBetInfo>
        <S.Players>
          {gameRoomInfo.players.map((player) => {
            return (
              <PlayerRow
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
        <Button onClick={moveBack}>확정하기</Button>
        <Button onClick={moveBack}>수정하기</Button>
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
  //
  Body: styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  HoleBetInfo: styled.span``,

  Players: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,

  //
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
