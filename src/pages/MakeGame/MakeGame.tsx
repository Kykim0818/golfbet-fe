import { useRef } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { deepClone } from "../../utils/deepClone";
import { GameRule } from "./Rule/type";

type ContextType = ContextStateType & ContextActionType;

type ContextStateType = {
  gameInfo: GameInfo;
  // 골프장 추가 시나리오에서 사용하는 임시 정보
  tmpGolfCourseInfoForAdd: GameInfo["golfCourse"];
};

type ContextActionType = {
  resetCourseInfoForAdd: () => void;
};

export const initialContextState: ContextStateType = {
  gameInfo: {
    gameId: "",
    gameType: "field",
    golfCourse: {
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
  tmpGolfCourseInfoForAdd: {
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
  const tmpGolfCourseInfo = useRef<GameInfo["golfCourse"]>(
    deepClone(initialContextState.tmpGolfCourseInfoForAdd)
  );

  const resetTmpGolfCourseInfo = () => {
    // ISSUE: 왜 한번에 초기하는 안되는지 모르겠음
    tmpGolfCourseInfo.current.name =
      initialContextState.tmpGolfCourseInfoForAdd.name;

    // frontNineCourse
    tmpGolfCourseInfo.current.frontNineCourse.name =
      initialContextState.tmpGolfCourseInfoForAdd.frontNineCourse.name;
    tmpGolfCourseInfo.current.frontNineCourse.holeCounts =
      initialContextState.tmpGolfCourseInfoForAdd.frontNineCourse.holeCounts;

    // backNineCourse
    tmpGolfCourseInfo.current.backNineCourse.name =
      initialContextState.tmpGolfCourseInfoForAdd.backNineCourse.name;
    tmpGolfCourseInfo.current.backNineCourse.holeCounts =
      initialContextState.tmpGolfCourseInfoForAdd.backNineCourse.holeCounts;

    // location
    tmpGolfCourseInfo.current.location =
      initialContextState.tmpGolfCourseInfoForAdd.location;
  };

  return (
    <S.Wrapper>
      <Outlet
        context={
          {
            gameInfo: gameInfo.current,
            tmpGolfCourseInfoForAdd: tmpGolfCourseInfo.current,
            resetCourseInfoForAdd: resetTmpGolfCourseInfo,
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
  golfCourse: {
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
