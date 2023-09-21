import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BottomSheetModal from "../../components/BottomSheetModal";
import Button from "../../components/Button";
import TitleAsset from "../../components/TitleAsset";
import EnterAndCheckScore from "../../components/domain/EnterAndCheckScore";
import {
  getDisplayBetTypeText,
  getDisplayCenterTypeText,
} from "../../utils/display";
import { preventGoBack } from "../../utils/preventGoBack";
import { GameRoomUser } from "../GameRoom/GameRoom";
import { GameInfo } from "../MakeGame/MakeGame";
import GameBoard from "./GameBoard";
import RankBoard from "./RankBoard";

const testGameRoomInfo: {
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
      golfCenter: {
        name: "이천 실크밸리GG",
        region: "",
        frontNineCourse: {
          name: "레이크",
          pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
        backNineCourse: {
          name: "벨리",
          pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
      },
      betType: "Stroke",
      playerCount: 4,
      gameRule: {
        handiType: ["post"],
        specialBetRequirements: ["buddy", "tripple", "threeOrMorePlayersTied"],
        ddang: ["last"],
        nearestType: ["specified"],
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
  const [open, setOpen] = useState(false);
  const preventBottomSheetClose = useRef(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    // history.back();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", preventGoBack);
    } else {
      console.log("close");
      window.removeEventListener("popstate", preventGoBack);
    }
  }, [open]);

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
            <div>{getDisplayBetTypeText(betType)}</div>
            <div style={{ display: "flex" }}>
              <S.BetInfo>
                <span>1타당</span>
                <span>{betAmountPerStroke}원</span>
              </S.BetInfo>
              <S.BetInfo>
                <span>한도</span>
                <span>{bettingLimit}원</span>
              </S.BetInfo>
            </div>
          </S.Info>
          <Button size="small">땅하기</Button>
          <GameBoard currentHole={currentHole} centerInfo={centerInfo} />
        </S.Top>
        <RankBoard players={players} />
      </div>
      <S.Footer>
        <Button onClick={handleOpenModal}>+스코어 입력하기</Button>
      </S.Footer>
      {open && (
        <BottomSheetModal closeModal={handleCloseModal}>
          <EnterAndCheckScore
            handleCloseSheet={handleCloseModal}
            gameRoomInfo={testGameRoomInfo.gameRoomInfo}
            holeCount={currentHole}
            par={currentPar}
          />
        </BottomSheetModal>
      )}
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
    padding: 0px 15px;
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
  `,
  BetInfo: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  //
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
