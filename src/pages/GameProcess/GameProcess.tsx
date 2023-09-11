import styled from "styled-components";
import TitleAsset from "../../components/TitleAsset";
import {
  getDisplayCenterTypeText,
  getDisplayBetTypeText,
} from "../../utils/display";
import { GameInfo } from "../MakeGame/MakeGame";
import { GameRoomUser } from "../GameRoom/GameRoom";

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
          name: "",
          pars: [3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
        backNineCourse: {
          name: "",
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
      },
      {
        userId: "user1",
        nickName: "유저1",
        imgSrc: "",
        avgScore: 80,
        readyState: false,
        handicaps: [],
      },
      {
        userId: "user2",
        nickName: "유저2",
        imgSrc: "",
        avgScore: 81,
        readyState: true,
        handicaps: [],
      },
    ],
  },
};

type GameProcessProps = {};

export const GameProcess = () => {
  const centerType = testGameRoomInfo.gameRoomInfo.gameInfo.gameType;
  const name = testGameRoomInfo.gameRoomInfo.gameInfo.golfCenter.name;
  const betType = testGameRoomInfo.gameRoomInfo.gameInfo.betType;
  const betAmountPerStroke =
    testGameRoomInfo.gameRoomInfo.gameInfo.betAmountPerStroke;
  const bettingLimit = testGameRoomInfo.gameRoomInfo.gameInfo.bettingLimit;

  return (
    <S.Wrapper>
      <TitleAsset
        visibleBack
        title={testGameRoomInfo.gameRoomInfo.gameInfo.gameId}
      />
      <div style={{ padding: "0px 15px" }}>
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
        </S.Top>
      </div>
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
};
