import styled, { css } from "styled-components";

import { useEffect, useState } from "react";
import TitleAsset from "../../../components/TitleAsset";
import { useAppSelector } from "../../../hooks/redux";
import { useModal } from "../../../hooks/useModal";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { usePreventLeave } from "../../../hooks/usePreventLeave";
import { useStrictModeEffectOnce } from "../../../hooks/useStrictModeEffectOnce";
import { useSockets } from "../../../service/socketIo/socketIo.context";
import { PageStyle } from "../../../styles/page";
import { typo } from "../../../styles/typo";
import { deepClone } from "../../../utils/deepClone";
import {
  getDisplayBetTypeIconText,
  getDisplayBetTypeText,
  getDisplayCenterTypeText,
} from "../../../utils/display";
import { GameRoomInfo, GameRoomUser } from "../GameRoom";
import { EnterScoreResult } from "./EnterHoleScore/EnterHoleScore";
import { ModifyEnterScoreResult } from "./EnterHoleScore/ModifyEnterHoleScore";
import LeaderBoardTab from "./LeaderBoardTab";
import ProgressTab from "./ProgressTab";
import { InGameInfo } from "./type";
import { findLastRankPlayer } from "./util";

const TABS = [
  {
    value: "progressBoard",
    display: "진행 현황",
  } as const,
  {
    value: "leaderBoard",
    display: "리더 보드",
  } as const,
];
type TabValue = (typeof TABS)[number]["value"];
const BACK_NINE_START_HOLE = 10;
export type InGameProps = {
  gameRoomInfo: GameRoomInfo;
  surrenderGame: () => void;
  enterScore: (
    gameId: string,
    holeIdx: number,
    enterScoreResult: EnterScoreResult
  ) => void;
  finalizeScore: (
    gameId: string,
    userId: string,
    holeInfo: InGameInfo["holeInfos"][number],
    surrenders: string[]
  ) => void;
  modifyScore: (
    gameId: string,
    userId: string,
    modifyHoleInfo: Omit<InGameInfo["holeInfos"][number], "ddang">
  ) => void;
  // onReady: (gameId: string, userId: string, readyState: boolean) => void;
};

export const InGame = ({
  gameRoomInfo,
  surrenderGame,
  enterScore,
  finalizeScore,
  modifyScore,
}: InGameProps) => {
  // # bottom sheet
  const { openModal } = useModal();
  const { moveBack } = usePageRoute();
  const { setCanEnterScore } = useSockets();
  const modalStatus = useAppSelector((state) => state.modal.status);
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const [preventFlag, setPreventFlag] = useState(true);
  const [currentTab, setCurrentTab] = useState<TabValue>("progressBoard");
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
    handleClickOk: surrenderGame,
  });
  const { gameInfo, players, inGameInfo } = gameRoomInfo;
  const {
    gameId,
    gameType: centerType,
    golfCenter: centerInfo,
    betType,
    betAmountPerStroke,
    bettingLimit,
    currentHole,
    isBackNineStart,
    gameRule: { ddang },
  } = gameInfo;
  const { canInputScore } = inGameInfo;
  const isCanInputScore =
    canInputScore === "" || canInputScore === userInfo.userId;

  // 전후반 결정 요소
  const isFrontNine = currentHole <= 9;
  const currentPar = isFrontNine
    ? centerInfo.frontNineCourse.pars[currentHole - 1]
    : centerInfo.backNineCourse.pars[currentHole - 1];

  // 목적 : 진행화면에 입장 했을 경우에, 비정상 시나리오로 점수 입력에 제한이 걸려있을 때 풀어주기 위함
  // dependency에서 canInputScore를 넣지 않은 이유 : 입장했을 초기에만 처리하기 위함
  useEffect(() => {
    if (gameId === undefined) return;
    if (userInfo.userId === undefined) return;
    if (canInputScore === "") return;
    if (canInputScore === userInfo.userId) {
      setCanEnterScore(gameId ?? "", "");
    }
  }, [setCanEnterScore, gameId, userInfo.userId]);
  // 전반 종료
  useStrictModeEffectOnce(() => {
    if (currentHole === BACK_NINE_START_HOLE && isBackNineStart === false) {
      openModal({
        id: "IN_GAME_RESULT",
        args: {
          type: "front",
        },
      });
    }
  }, [openModal, currentHole, isBackNineStart, players]);

  const handleOpenEnterScore = async () => {
    const res = await openModal<EnterScoreResult>({
      id: "ENTER_HOLE_SCORE",
    });
    if (gameRoomInfo.gameInfo.gameId === undefined) {
      console.log("gameId is undefined");
      return;
    }
    if (res.isAllEnter) {
      if (gameId && res.holeInfo) {
        // #2 땅 확인
        // TODO : type 수정 필요
        let isDdangDeclare: false | "yes" | "no" = "no";
        const [ddangRuleValue] = ddang;
        if (ddangRuleValue === "onlyLastPlace") {
          // 기권 처리자는 땅 처리에서 제외
          const playerScoresExceptSurrender: EnterScoreResult["playerScores"] =
            deepClone(res.playerScores);
          res.surrenders.forEach((surrender) => {
            delete playerScoresExceptSurrender[surrender];
          });

          // 꼴등 식별
          const lastRankPlayers: GameRoomUser[] = [];
          findLastRankPlayer(playerScoresExceptSurrender).forEach((userId) => {
            players.forEach((player) => {
              if (player.userId === userId) {
                lastRankPlayers.push(player);
              }
            });
          });
          // 모달 오픈
          isDdangDeclare = await openModal<"yes" | "no" | false>({
            id: "DECLARE_DDANG",
            args: {
              lastPlayers: lastRankPlayers,
            },
          });
          if (isDdangDeclare === false) {
            setCanEnterScore(gameId, "");
            return;
          }
          res.holeInfo.ddang = isDdangDeclare === "yes" ? true : false;
        }
        // 점수 확정
        finalizeScore(gameId, userInfo.userId, res.holeInfo, res.surrenders);
      }
    }
    if (res.isAllEnter === false) {
      enterScore(gameRoomInfo.gameInfo.gameId, currentHole, res);
      return;
    }
  };

  const handleOpenModifyEnterScore = async (modifyTargetHole: number) => {
    const res = await openModal<ModifyEnterScoreResult>({
      id: "MODIFY_ENTER_HOLE_SCORE",
      args: {
        modifyTargetHole,
      },
    });
    if (gameId === undefined) {
      console.log("gameId is undefined");
      return;
    }
    modifyScore(gameId, userInfo.userId, res.holeInfo);
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
        </S.Top>
        <S.Mid>
          <S.Tabs>
            {TABS.map((tab) => {
              return (
                <S.Tab
                  key={tab.value}
                  selected={currentTab === tab.value}
                  onClick={() => setCurrentTab(tab.value)}
                >
                  {tab.display}
                </S.Tab>
              );
            })}
          </S.Tabs>
          <S.TabContent>
            {currentTab === "progressBoard" ? (
              <ProgressTab
                centerInfo={centerInfo}
                currentHole={currentHole}
                players={players}
                handleOpenEnterScore={handleOpenEnterScore}
                handleOpenModifyEnterScore={handleOpenModifyEnterScore}
                isCanInputScore={isCanInputScore}
              />
            ) : (
              <LeaderBoardTab
                centerInfo={centerInfo}
                players={players}
                userId={userInfo.userId}
              />
            )}
          </S.TabContent>
        </S.Mid>
      </div>
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
    flex-grow: 1;
    gap: 15px;

    margin-top: 20px;
  `,
  Tabs: styled.div`
    display: flex;
    padding-left: 10px;
  `,
  Tab: styled.span<{ selected: boolean }>`
    display: flex;
    justify-content: center;
    min-width: 90px;
    min-height: 35px;
    padding: 9px 5px;

    ${typo.s13w400}
    color : var(--color-gray-400);
    background-color: rgba(190, 194, 197, 0.2);
    border-radius: 8px 8px 0px 0px;
    ${(props) =>
      props.selected &&
      css`
        color: var(--color-gray-50);
        background-color: var(--color-main);
        font-weight: 700;
      `}
  `,
  TabContent: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
};
