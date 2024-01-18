import styled from "styled-components";

import { useState } from "react";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import RankBoard from "../../../components/domain/RankBoard";
import { useAppSelector } from "../../../hooks/redux";
import { useModal } from "../../../hooks/useModal";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { usePreventLeave } from "../../../hooks/usePreventLeave";
import { PageStyle } from "../../../styles/page";
import { typo } from "../../../styles/typo";
import {
  getDisplayBetTypeIconText,
  getDisplayBetTypeText,
  getDisplayCenterTypeText,
} from "../../../utils/display";
import { GameRoomInfo } from "../GameRoom";
import { EnterScoreResult } from "./EnterHoleScore/EnterHoleScore";
import ProgressBoard from "./ProgressBoard";
import { InGameInfo } from "./type";

export type InGameProps = {
  gameRoomInfo: GameRoomInfo;
  exitRoom: () => void;
  enterScore: (
    gameId: string,
    holeIdx: number,
    enterScoreResult: EnterScoreResult
  ) => void;
  fixScore: (
    gameId: string,
    userId: string,
    holeInfo: InGameInfo["holeInfos"][number]
  ) => void;
  // onReady: (gameId: string, userId: string, readyState: boolean) => void;
};

export const InGame = ({
  gameRoomInfo,
  exitRoom,
  enterScore,
  fixScore,
}: InGameProps) => {
  // # bottom sheet
  const { openModal } = useModal();
  const { moveBack } = usePageRoute();
  const modalStatus = useAppSelector((state) => state.modal.status);
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const [preventFlag, setPreventFlag] = useState(true);
  // # web socket game info
  // 모달이 떠있으면, 패딩 X && 임의 플래그
  usePreventLeave({
    confirmTriggerFlag: modalStatus.length === 0 && preventFlag,
    args: {
      title: "게임방 나가기",
      msg: "참여중인 게임방에서 나가겠습니까?",
      okBtnLabel: "나가기",
      cancelBtnLabel: "닫기",
    },
    handleClickOk: exitRoom,
  });
  const { gameInfo, players } = gameRoomInfo;
  const {
    gameType: centerType,
    golfCenter: centerInfo,
    betType,
    betAmountPerStroke,
    bettingLimit,
    currentHole,
  } = gameInfo;

  // 전후반 결정 요소
  const isFrontNine = currentHole <= 9;
  const currentPar = isFrontNine
    ? centerInfo.frontNineCourse.pars[currentHole - 1]
    : centerInfo.backNineCourse.pars[currentHole - 1];

  const handleOpenEnterScore = async () => {
    const res = await openModal<EnterScoreResult>({
      id: "ENTER_HOLE_SCORE",
    });
    if (gameRoomInfo.gameInfo.gameId === undefined) {
      console.log("gameId is undefined");
      return;
    }
    if (res.isAllEnter) {
      // const holeInfo: InGameInfo["holeInfos"][number] = {
      //   ddang: false,
      // };
      console.log("TODO : InGame - 점수 확정", res);
      // fixScore();
    }
    if (res.isAllEnter === false) {
      enterScore(gameRoomInfo.gameInfo.gameId, currentHole, res);
      return;
    }
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset
        handleBack={() => moveBack()}
        visibleBack
        title={gameRoomInfo.gameInfo.gameId}
      />
      <div
        style={{
          padding: "0px 15px",
          display: "flex",
          flexDirection: "column",
          flex: "1",
          overflow: "auto",
          paddingBottom: "15px",
        }}
      >
        <S.Top>
          {/* 1 */}
          <S.CenterNameSection>
            <S.CenterType>{getDisplayCenterTypeText(centerType)}</S.CenterType>
            <S.CenterName>{centerInfo.name}</S.CenterName>
          </S.CenterNameSection>
          {/* 2 */}
          <S.Info>
            <div style={{ display: "flex", gap: "9px" }}>
              <S.BetIcon>{getDisplayBetTypeIconText(betType)}</S.BetIcon>
              <S.BetTypeText>{getDisplayBetTypeText(betType)}</S.BetTypeText>
            </div>
            <div
              style={{
                display: "flex",
                gap: "32px",
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              <S.BetMoneyInfo>
                <S.BetMoneyText>1타당</S.BetMoneyText>
                <S.MoneySection>
                  <S.Money>{betAmountPerStroke}</S.Money>
                  <span>원</span>
                </S.MoneySection>
              </S.BetMoneyInfo>
              <S.BetMoneyInfo>
                <S.BetMoneyText>게임 준비금</S.BetMoneyText>
                <S.MoneySection>
                  <S.Money>{bettingLimit}</S.Money>
                  <span>원</span>
                </S.MoneySection>
              </S.BetMoneyInfo>
            </div>
          </S.Info>
          <div>
            <Button size="small">땅하기</Button>
          </div>
          <ProgressBoard currentHole={currentHole} centerInfo={centerInfo} />
        </S.Top>
        <S.Mid>
          <S.RankBoardHeader>순위</S.RankBoardHeader>
          <RankBoard players={players} />
        </S.Mid>
      </div>
      <S.Footer>
        <Button onClick={handleOpenEnterScore}>+스코어 입력하기</Button>
      </S.Footer>
    </PageStyle.Wrapper>
  );
};

//
const S = {
  Top: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 8px;
    padding: 15px 15px;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0px 4px 2px 0px rgba(205, 209, 202, 0.12);
  `,
  CenterNameSection: styled.div`
    display: flex;
    gap: 10px;
  `,
  // 1
  CenterName: styled.span`
    display: flex;
    align-items: center;
    // typo
    color: #504f4f;
    font-size: 16px;
    font-weight: 700;
  `,
  CenterType: styled.span`
    border-radius: 10px;
    background: #e6f7f9;
    padding: 5px 12px;
    // typo
    color: var(--color-main-dark, #008395);
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
  `,

  // 2
  Info: styled.div`
    display: flex;
    align-items: center;
    gap: 45px;
    border-radius: 15px;
    background-color: #f8fafb;
    padding: 12px 23px;
  `,
  BetInfo: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  BetIcon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19px;
    height: 19px;
    border-radius: 2px;
    background: #008395;

    // typo
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  BetTypeText: styled.div`
    ${typo.s14w700}
  `,
  BetMoneyInfo: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  BetMoneyText: styled.span`
    ${typo.s10w400}
    color: #504F4F
  `,
  MoneySection: styled.div`
    display: flex;
    span {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  Money: styled.span`
    ${typo.s12w700}
    color: #008395;
  `,
  // # Rank
  Mid: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    margin-top: 20px;
  `,
  RankBoardHeader: styled.div`
    ${typo.s14w700}
    color : #00AFC6;
  `,

  //
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
