import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleAsset from "../../components/TitleAsset";

export const MakeGame = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <TitleAsset
        title="게임 만들기"
        visibleBack
        handleBack={() => navigate(-1)}
      />
      <S.Content>Content</S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--color-bg, #f6f8fc);
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 26px;
  `,
};

const defaultGameRule: GameInfo["gameRule"] = {
  handiType: "None",
  spcialBetRequirements: [],
  ddang: "꼴등만",
  nearestType: "별도 지정",
};

const MakeGameContent = () => {
  const [gameType, setGameType] = useState<GameInfo["gameType"]>("Field");
  const [golfCourse, setgolfCourse] = useState<GameInfo["golfCourse"]>("");
  const [betType, setBetType] = useState<GameInfo["betType"]>("Stroke");
  const [playerCount, setPlayerCount] = useState<GameInfo["playerCount"]>(0);
  const [gameRule, setGameRule] =
    useState<GameInfo["gameRule"]>(defaultGameRule);
  const [betAmountPerStroke, setBetAmountPerStroke] =
    useState<GameInfo["betAmountPerStroke"]>(0);
  const [bettingLimit, setBettingLimit] =
    useState<GameInfo["betAmountPerStroke"]>(0);

  <div>
    <div>
      <h5>게임분류</h5>
    </div>
  </div>;
};

interface GameInfo {
  gameId: string;
  createUser: string;
  gameType: "Field" | "Screen";
  golfCourse: string;
  isFrontNine: boolean;
  isBackNine: boolean;
  betType: "Stroke";
  playerCount: number;
  gameRule: {
    handiType: "None" | "Pre" | "Post";
    spcialBetRequirements: string[];
    ddang: "None" | "꼴등만";
    nearestType: "게임에 포함" | "별도 지정";
  };
  betAmountPerStroke: number;
  bettingLimit: number;
}
