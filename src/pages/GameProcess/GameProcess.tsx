import styled from "styled-components";
import Button from "../../components/Button";
import TitleAsset from "../../components/TitleAsset";
import { useModal } from "../../hooks/useModal";
import { usePageRoute } from "../../hooks/usePageRoute";
import { typo } from "../../styles/typo";
import {
  getDisplayBetTypeIconText,
  getDisplayBetTypeText,
  getDisplayCenterTypeText,
} from "../../utils/display";
import { GameRoomUser } from "../GameRoom/GameRoom";
import { GameInfo } from "../MakeGame/MakeGame";
import GameBoard from "./GameBoard";
import RankBoard from "./RankBoard";

export const testGameRoomInfo: {
  gameRoomInfo: {
    gameInfo: GameInfo;
    roomMakerId: string;
    players: GameRoomUser[];
  };
} = {
  gameRoomInfo: {
    gameInfo: {
      gameId: "FIELD2023050701",
      gameType: "field",
      startDate: "2023-11-04",
      golfCenter: {
        id: "test",
        name: "이천 실크밸리GG",
        region: "",
        frontNineCourse: {
          id: "test",
          name: "레이크",
          pars: [3, 3, 3, 5, 3, 3, 3, 3, 3],
        },
        backNineCourse: {
          id: "test",
          name: "벨리",
          pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
      },
      betType: "Stroke",
      playerCount: 4,
      gameRule: {
        handiType: ["backHandicap"],
        specialBetRequirements: ["buddy", "triple", "threeOrMoreTie"],
        ddang: ["onlyLastPlace"],
        nearestType: ["separateAmount"],
      },
      betAmountPerStroke: 1000,
      bettingLimit: 50000,
    },
    roomMakerId: "test",
    players: [
      {
        userId: "test",
        nickName: "테스트",
        imgSrc: "",
        avgScore: 85,
        readyState: true,
        handicaps: [],
        currentMoney: 0,
        currentScore: 0,
        holeScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        userId: "user1",
        nickName: "유저1",
        imgSrc: "",
        avgScore: 80,
        readyState: false,
        handicaps: [],
        currentMoney: 0,
        currentScore: 0,
        holeScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        userId: "user2",
        nickName: "유저2",
        imgSrc: "",
        avgScore: 81,
        readyState: true,
        handicaps: [],
        currentMoney: 0,
        currentScore: 0,
        holeScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
};

type GameProcessProps = {};

export const GameProcess = () => {
  // # bottom sheet
  const { openModal } = useModal();
  const { moveBack } = usePageRoute();
  // # web socket game info
  const centerType = testGameRoomInfo.gameRoomInfo.gameInfo.gameType;
  const name = testGameRoomInfo.gameRoomInfo.gameInfo.golfCenter.name;
  const betType = testGameRoomInfo.gameRoomInfo.gameInfo.betType;
  const betAmountPerStroke =
    testGameRoomInfo.gameRoomInfo.gameInfo.betAmountPerStroke;
  const bettingLimit = testGameRoomInfo.gameRoomInfo.gameInfo.bettingLimit;
  const centerInfo = testGameRoomInfo.gameRoomInfo.gameInfo.golfCenter;
  const players = testGameRoomInfo.gameRoomInfo.players;
  // TODO
  const currentHole = 4;
  // 전후반 결정 요소
  const isFrontNine = true;
  const currentPar = isFrontNine
    ? centerInfo.frontNineCourse.pars[currentHole - 1]
    : centerInfo.backNineCourse.pars[currentHole - 1];

  return (
    <S.Wrapper>
      <TitleAsset
        handleBack={() => moveBack()}
        visibleBack
        title={testGameRoomInfo.gameRoomInfo.gameInfo.gameId}
      />
      <div
        style={{
          padding: "0px 15px",
          display: "flex",
          flexDirection: "column",
          flex: "1",
        }}
      >
        <S.Top>
          {/* 1 */}
          <S.CenterNameSection>
            <S.CenterType>{getDisplayCenterTypeText(centerType)}</S.CenterType>
            <S.CenterName>{name}</S.CenterName>
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
          <GameBoard currentHole={currentHole} centerInfo={centerInfo} />
        </S.Top>
        <S.Mid>
          <S.RankBoardHeader>순위</S.RankBoardHeader>
          <RankBoard players={players} />
        </S.Mid>
      </div>
      <S.Footer>
        <Button
          onClick={() => {
            openModal({
              id: "ENTER_AND_CHECK_SCORE",
              args: {
                gameRoomInfo: testGameRoomInfo.gameRoomInfo,
                holeCount: currentHole,
                par: currentPar,
              },
            });
          }}
        >
          +스코어 입력하기
        </Button>
      </S.Footer>
    </S.Wrapper>
  );
};

//
const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--color-bg, #f6f8fc);
  `,
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
