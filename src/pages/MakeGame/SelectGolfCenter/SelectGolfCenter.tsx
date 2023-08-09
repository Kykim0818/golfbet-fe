import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Tabs from "../../../components/Tabs";
import TitleAsset from "../../../components/TitleAsset";
import { useGameInfo } from "../MakeGame";
import { useSelectGolfCenter } from "./useSelectGolfCenter";

const NO_SEARCH_INPUT = "";

export const SelectGolfCenter = () => {
  const navigate = useNavigate();
  const { resetCenterInfoForAdd, gameInfo, golfCenterList } = useGameInfo();
  const [serachInputValue, setSearchInputValue] = useState(NO_SEARCH_INPUT);

  const { uiTabItems, currentSelectCenter, btnDisable } = useSelectGolfCenter(
    gameInfo.golfCenter,
    golfCenterList
  );

  // reset
  useEffect(() => {
    resetCenterInfoForAdd();
  }, [resetCenterInfoForAdd]);

  const handleSelectGolfCenter = () => {
    gameInfo.golfCenter = currentSelectCenter.current;
    navigate("/make_game");
  };
  return (
    <Styled.Wrapper>
      <TitleAsset
        title="게임 만들기"
        visibleBack
        handleBack={() => navigate("/make_game", { replace: true })}
      />
      <Styled.Body>
        <div>
          <Input placeholder="골프장을 검색해주세요" />
        </div>
        <Button
          onClick={() => navigate("../make_golf_course")}
          style={{ width: "fit-content" }}
          variants="outlined"
        >
          +직접 추가하기
        </Button>
        <Styled.Section>
          {serachInputValue === NO_SEARCH_INPUT ? (
            <Tabs items={uiTabItems} onChange={() => {}} />
          ) : (
            <div>list</div>
          )}
        </Styled.Section>
      </Styled.Body>
      <Styled.Footer>
        <Button onClick={handleSelectGolfCenter} disabled={btnDisable}>
          선택하기
        </Button>
      </Styled.Footer>
    </Styled.Wrapper>
  );
};

export type GolfCenterList = {
  group: string;
  centers: CenterInfo[];
}[];

export type CenterInfo = {
  id: string;
  type: "field" | "screen";
  name: string;
  region1: string;
  region2: string;
  holeCount: number;
  courses: CourseInfo[];
};

export type CourseInfo = {
  id: string;
  name: string;
  nameDetail: string;
  parsSum: number;
  pars: number[];
};

// const testTabItems: TabItem[] = [
//   {
//     id: "1",
//     label: "최근",
//     children: <CenterList centers={golfCenterList} />,
//   },
// ];

const Styled = {
  Wrapper: styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
  `,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 25px;
    margin-top: 40px;
    padding: 0px 26px;

    overflow: auto;
  `,
  Section: styled.section`
    margin-top: 25px;
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
