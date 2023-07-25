import { useRef } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { GameRule } from "./Rule/type";

type ContextType = {
  gameInfo: GameInfo;
};

const defaultGameRule: GameRule = {
  handiType: ["none"],
  specialBetRequirements: ["buddy", "tripple", "threeOrMorePlayersTied"],
  ddang: ["last"],
  nearestType: ["specified"],
};

export const MakeGame = () => {
  const gameInfo = useRef<GameInfo>({
    gameId: "",
    gameType: "field",
    golfCourse: {
      name: "",
      frontNineCourseName: "",
      backNineCourseName: "",
    },
    betType: "Stroke",
    playerCount: 2,
    gameRule: {
      handiType: ["none"],
      specialBetRequirements: ["buddy", "tripple"],
      ddang: ["last"],
      nearestType: ["specified"],
    },
    betAmountPerStroke: 0,
    bettingLimit: 0,
  });
  return (
    <S.Wrapper>
      <S.Content>
        <Outlet
          context={{ gameInfo: gameInfo.current } satisfies ContextType}
        />
      </S.Content>
    </S.Wrapper>
  );
};

export function useGameInfo() {
  return useOutletContext<ContextType>();
}

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
    flex-grow: 1;
    padding: 0px 26px;
    overflow: auto;
  `,
};

export interface GameInfo {
  gameId?: string;
  createUser?: string;
  gameType: "field" | "screen";
  golfCourse: {
    name: string;
    frontNineCourseName: string;
    backNineCourseName: string;
  };
  betType: "Stroke";
  playerCount: number;
  gameRule: GameRule;
  betAmountPerStroke: number;
  bettingLimit: number;
}
