import { useRef } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { deepClone } from "../../utils/deepClone";
import { GameRule } from "./Rule/type";

type ContextType = ContextStateType & ContextActionType;

type ContextStateType = {
  gameInfo: GameInfo;
  // 골프장 추가 시나리오에서 사용하는 임시 정보
  tmpGolfCenterInfoForAdd: GameInfo["golfCenter"];
};

type ContextActionType = {
  resetCenterInfoForAdd: () => void;
};

export const initialContextState: ContextStateType = {
  gameInfo: {
    gameId: "",
    gameType: "field",
    golfCenter: {
      name: "",
      location: "",
      frontNineCourse: {
        name: "",
        holeCounts: [3, 3, 3, 3, 3, 3, 3, 3, 3],
      },
      backNineCourse: {
        name: "",
        holeCounts: [3, 3, 3, 3, 3, 3, 3, 3, 3],
      },
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
  },
  tmpGolfCenterInfoForAdd: {
    name: "",
    location: "",
    frontNineCourse: {
      name: "",
      holeCounts: [3, 3, 3, 3, 3, 3, 3, 3, 3],
    },
    backNineCourse: {
      name: "",
      holeCounts: [3, 3, 3, 3, 3, 3, 3, 3, 3],
    },
  },
};

export const MakeGame = () => {
  // TODO : 새로고침시 경고 문구 띄우면 좋아보임
  const gameInfo = useRef<GameInfo>(deepClone(initialContextState.gameInfo));
  const tmpGolfCenterInfo = useRef<GameInfo["golfCenter"]>(
    deepClone(initialContextState.tmpGolfCenterInfoForAdd)
  );

  const resetTmpGolfCenterInfo = () => {
    // ISSUE: 왜 한번에 초기하는 안되는지 모르겠음
    tmpGolfCenterInfo.current.name =
      initialContextState.tmpGolfCenterInfoForAdd.name;

    // frontNineCourse
    tmpGolfCenterInfo.current.frontNineCourse.name =
      initialContextState.tmpGolfCenterInfoForAdd.frontNineCourse.name;
    tmpGolfCenterInfo.current.frontNineCourse.holeCounts =
      initialContextState.tmpGolfCenterInfoForAdd.frontNineCourse.holeCounts;

    // backNineCourse
    tmpGolfCenterInfo.current.backNineCourse.name =
      initialContextState.tmpGolfCenterInfoForAdd.backNineCourse.name;
    tmpGolfCenterInfo.current.backNineCourse.holeCounts =
      initialContextState.tmpGolfCenterInfoForAdd.backNineCourse.holeCounts;

    // location
    tmpGolfCenterInfo.current.location =
      initialContextState.tmpGolfCenterInfoForAdd.location;
  };

  return (
    <S.Wrapper>
      <Outlet
        context={
          {
            gameInfo: gameInfo.current,
            tmpGolfCenterInfoForAdd: tmpGolfCenterInfo.current,
            resetCenterInfoForAdd: resetTmpGolfCenterInfo,
          } satisfies ContextType
        }
      />
    </S.Wrapper>
  );
};

// TODO:refactor 분리가능한지 확인
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
  golfCenter: {
    name: string;
    location: string;
    frontNineCourse: {
      name: string;
      holeCounts: number[];
    };
    backNineCourse: {
      name: string;
      holeCounts: number[];
    };
  };
  betType: "Stroke";
  playerCount: number;
  gameRule: GameRule;
  betAmountPerStroke: number;
  bettingLimit: number;
}
