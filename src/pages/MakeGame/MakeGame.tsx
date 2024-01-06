import { useQuery } from "@tanstack/react-query";
import { Outlet, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { UNIQUE_QUERY_KEY } from "../../service/api/constant";
import { apiGetAllGolfCenter } from "../../service/api/golfCenter";
import { GameRule } from "./Rule/type";
import { GolfCenterList } from "./SelectGolfCenter/SelectGolfCenter";

type ContextType = ContextStateType & ContextActionType;
type ContextStateType = {
  golfCenterList: GolfCenterList;
};
type ContextActionType = {};

export const initialContextState: ContextStateType = {
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
  return (
    <S.Wrapper>
      <Outlet
        context={
          {
            golfCenterList: data?.data?.centerInfos ?? [],
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
  startDate: string;
  golfCenter: {
    id: string;
    name: string;
    region: string;
    frontNineCourse: {
      id: number;
      name: string;
      pars: number[];
    };
    backNineCourse: {
      id: number;
      name: string;
      pars: number[];
    };
  };
  currentHole: number;
  gameState: string;
  betType: "stroke";
  playerCount: number;
  gameRule: GameRule;
  nearestAmount: number;
  betAmountPerStroke: number;
  bettingLimit: number;
}
