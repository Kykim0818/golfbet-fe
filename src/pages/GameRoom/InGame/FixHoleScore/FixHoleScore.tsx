import styled from "styled-components";
import Button from "../../../../components/Button";
import { useModal } from "../../../../hooks/useModal";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { typo } from "../../../../styles/typo";
import { getDisplayDoubleText } from "../../../../utils/display";
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

export type FixHoleScoreProps = {
  handleModalResult?: (result: FixHoleScoreResult) => void;
  playerScores: EnterScoreResult["playerScores"];
  gameRoomInfo: GameRoomInfo;
};

export type FixHoleScoreResult = {
  result: boolean;
  /**
   * 니어리스트 , 롱기스트 선택 유저 id
   */
  nearLong: string[];
  doubleConditions: string[];
  playersMoneyChange: Record<string, number>;
};

export const FixHoleScore = ({
  handleModalResult,
  playerScores,
  gameRoomInfo,
}: FixHoleScoreProps) => {
  const { moveBack } = usePageRoute();
  const { openModal } = useModal();
  const { gameInfo, players, inGameInfo } = gameRoomInfo;
  const {
    betAmountPerStroke,
    currentHole,
    golfCenter: {
      frontNineCourse: { pars: frontNineCoursePar },
      backNineCourse: { pars: backNineCoursePar },
    },
    gameRule: { ddang, specialBetRequirements },
  } = gameInfo;

  // const currentHole = gameRoomInfo?.gameInfo.currentHole ?? 1;
  const currentPar = getCurrentPar(
    currentHole,
    frontNineCoursePar,
    backNineCoursePar
  );
  const doubleConditions = checkDoubleCondition(
    currentPar,
    specialBetRequirements,
    playerScores
  );
  // TODO : 땅여부 확인을 해야함
  const isDdang = isApplyDdang(currentHole - 1, inGameInfo.holeInfos);
  // 추가 정보 결정 해야함 점수로 배판인지여
  if (isDdang) doubleConditions.push("ddang");

  let playersMoneyChange = calculateChangeMoney(
    doubleConditions.length === 0 ? false : true,
    betAmountPerStroke,
    playerScores
  );

  const handleEnterScore = async () => {
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
      // playersMoneyChange
      playersMoneyChange = applyNearLongRule(
        doubleConditions.length !== 0,
        nearLong,
        playersMoneyChange,
        gameInfo
      );
      // 니어,롱기 선택창에서 취소를 눌럿다면 땅 진행이 아니고 진행 취소
      if (nearLongRes === false) return;
    }

    handleModalResult?.({
      nearLong,
      doubleConditions,
      playersMoneyChange,
      result: true,
      // ddang: isDdangDeclare,
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
        {currentHole} H | 파 {currentPar}
      </S.HoleInfo>
      <S.Body>
        <S.HoleBetInfo>
          {getDisplayDoubleText(doubleConditions, currentPar, players.length)}
        </S.HoleBetInfo>
        <S.Players>
          {gameRoomInfo.players.map((player) => {
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
