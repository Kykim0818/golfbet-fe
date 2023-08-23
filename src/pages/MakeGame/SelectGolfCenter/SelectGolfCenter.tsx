import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Tabs from "../../../components/Tabs";
import TitleAsset from "../../../components/TitleAsset";
import { useGameInfo } from "../MakeGame";
import { CenterList } from "./CenterList";
import { useSelectGolfCenter } from "./useSelectGolfCenter";

const NO_SEARCH_INPUT = "";

export const SelectGolfCenter = () => {
  const navigate = useNavigate();
  const { resetCenterInfoForAdd, gameInfo, golfCenterList } = useGameInfo();
  const [serachInputValue, setSearchInputValue] = useState(NO_SEARCH_INPUT);
  const [inputFocus, setInputFocus] = useState(false);
  // 검색 결과
  const allCenters =
    golfCenterList.filter((center) => center.group === "전체")[0]?.centers ??
    [];
  const searchedCenters = allCenters.filter((center) =>
    center.name.includes(serachInputValue)
  );

  const { uiTabItems, currentSelectCenter, btnDisable, handleOnChange } =
    useSelectGolfCenter(gameInfo.golfCenter, golfCenterList);

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
        title="골프장 선택"
        visibleClose
        handleClose={() => navigate("/make_game", { replace: true })}
      />
      <Styled.Body>
        <Styled.InputSection>
          <Input
            placeholder="골프장을 검색해주세요"
            onChange={(e) => setSearchInputValue(e.target.value)}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
          <button>
            <img
              src={process.env.PUBLIC_URL + "/assets/svg/ic_search_btn.svg"}
              alt="no icons"
            />
          </button>
        </Styled.InputSection>
        <Styled.AddButtonSection>
          <Button
            onClick={() => navigate("../make_golf_center")}
            style={{ width: "fit-content" }}
            variants="outlined"
          >
            +직접 추가하기
          </Button>
        </Styled.AddButtonSection>
        <Styled.Section>
          {serachInputValue === NO_SEARCH_INPUT && inputFocus === false ? (
            <Tabs items={uiTabItems} defaultId="최근" />
          ) : (
            <CenterList centers={searchedCenters} onChange={handleOnChange} />
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
  region: string;
  holeCount: number;
  courses: CourseInfo[];
};

export type CourseInfo = {
  id: string;
  name: string;
  // nameDetail: string;
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
    margin-top: 52px;
    padding: 0px 26px;

    overflow: auto;
  `,
  Section: styled.section`
    margin-top: 25px;
  `,
  InputSection: styled.div`
    display: flex;
    gap: 15px;
    input {
      width: 100%;
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 40px;
      min-height: 40px;
      border-radius: 50%;
      border: none;
      background-color: var(--color-main);
    }
  `,
  AddButtonSection: styled.div`
    display: flex;
    justify-content: flex-end;

    button {
      padding: 4px 16px;
      //custom

      color: var(--color-main-dark, #008395);
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
