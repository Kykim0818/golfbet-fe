import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Tabs from "../../../components/Tabs";
import { TabItem } from "../../../components/Tabs/Tabs";
import TitleAsset from "../../../components/TitleAsset";
import { useGameInfo } from "../MakeGame";
import { CourseInfo, CourseList } from "./CourseList";

export const SelectGolfCourse = () => {
  const navigate = useNavigate();
  const { resetCourseInfoForAdd } = useGameInfo();

  useEffect(() => {
    resetCourseInfoForAdd();
  }, [resetCourseInfoForAdd]);

  return (
    <Styled.Wrapper>
      <TitleAsset
        title="게임 만들기"
        visibleBack
        handleBack={() => navigate("/make_game")}
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
          <Tabs items={testTabItems} onChange={() => {}} />
        </Styled.Section>
      </Styled.Body>
      <Styled.Footer>
        <Button disabled>선택하기</Button>
      </Styled.Footer>
    </Styled.Wrapper>
  );
};

// TODO 데이터 세팅 부분 로직 필요
const testCourses: CourseInfo[] = [
  {
    id: "1",
    name: "골프클럽 Q",
    region: "경기 안성",
    holeCount: 36,
    frontNineCourses: ["Q 전반코스 1", "Q 전반코스 2"],
    backNineCourses: ["후반코스 1", "후반코스 2"],
  },
  {
    id: "2",
    name: "포레스트힐",
    region: "경기 포천",
    holeCount: 36,
    frontNineCourses: ["힐 전반코스 1", "힐 전반코스 2"],
    backNineCourses: ["후반코스 1", "후반코스 2"],
  },
  {
    id: "3",
    name: "몽베르",
    region: "경기 안성",
    holeCount: 36,
    frontNineCourses: ["몽 전반코스 1", "몽 전반코스 2"],
    backNineCourses: ["후반코스 1", "후반코스 2"],
  },
];

const testTabItems: TabItem[] = [
  {
    id: "1",
    label: "최근",
    children: <CourseList items={testCourses} />,
  },
];

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
