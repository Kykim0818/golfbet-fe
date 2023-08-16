import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { UNIQUE_QUERY_KEY } from "../../service/api/constant";
import { apiGetAllGolfCenter } from "../../service/api/golfCenter";
import { deepClone } from "../../utils/deepClone";
import { GameRule } from "./Rule/type";
import { GolfCenterList } from "./SelectGolfCenter/SelectGolfCenter";

type ContextType = ContextStateType & ContextActionType;

type ContextStateType = {
  gameInfo: GameInfo;
  // 골프장 추가 시나리오에서 사용하는 임시 정보
  tmpGolfCenterInfoForAdd: GameInfo["golfCenter"];
  golfCenterList: GolfCenterList;
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
    betAmountPerStroke: 0,
    bettingLimit: 0,
  },
  tmpGolfCenterInfoForAdd: {
    name: "",
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
  golfCenterList: [],
};

export const MakeGame = () => {
  const { data } = useQuery(
    [UNIQUE_QUERY_KEY.GET_ALL_GOLF_CENTER],
    apiGetAllGolfCenter,
    {
      retry: 0,
    }
  );
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
    tmpGolfCenterInfo.current.frontNineCourse.pars =
      initialContextState.tmpGolfCenterInfoForAdd.frontNineCourse.pars;

    // backNineCourse
    tmpGolfCenterInfo.current.backNineCourse.name =
      initialContextState.tmpGolfCenterInfoForAdd.backNineCourse.name;
    tmpGolfCenterInfo.current.backNineCourse.pars =
      initialContextState.tmpGolfCenterInfoForAdd.backNineCourse.pars;

    // location
    tmpGolfCenterInfo.current.region =
      initialContextState.tmpGolfCenterInfoForAdd.region;
  };

  return (
    <S.Wrapper>
      <Outlet
        context={
          {
            gameInfo: gameInfo.current,
            tmpGolfCenterInfoForAdd: tmpGolfCenterInfo.current,
            golfCenterList: data?.result ?? [],
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
    region: string;
    frontNineCourse: {
      name: string;
      pars: number[];
    };
    backNineCourse: {
      name: string;
      pars: number[];
    };
  };
  betType: "Stroke";
  playerCount: number;
  gameRule: GameRule;
  betAmountPerStroke: number;
  bettingLimit: number;
}
