import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import { FixedGolfCourse } from "../FixedGolfCourse";
import { HoleDetail } from "../HoleDetail";

const todoData = {
  courseType: "field",
  name: "이천 실크밸리 GC",
  frontNineCourseName: "레이크",
  backNineCourseName: "밸리",
};

// TODO 전역값 관리 어디서할지 정하면 수정
const GOLF_COURSE_COUNT = 9;

export const MakeGolfCourseDetail = () => {
  const navigate = useNavigate();
  return (
    <Styled.Wrapper>
      <TitleAsset
        title="골프장 상세"
        visibleBack
        handleBack={() => navigate("../make_golf_course")}
      />
      <Styled.Body>
        <FixedGolfCourse
          courseType={todoData.courseType as "field"}
          name={todoData.name}
          frontNineCourseName={todoData.frontNineCourseName}
          backNineCourseName={todoData.backNineCourseName}
        />
        <div>
          <span>{todoData.frontNineCourseName}</span>
          {[...new Array(GOLF_COURSE_COUNT)].map((_, index) => (
            <HoleDetail
              key={index + 1}
              holeCount={index + 1}
              onChange={() => console.log("change")}
            />
          ))}
        </div>
        <div>
          <span>{todoData.backNineCourseName}</span>
          {[...new Array(GOLF_COURSE_COUNT)].map((_, index) => (
            <HoleDetail
              key={index + 1}
              holeCount={index + 1}
              onChange={() => console.log("change")}
            />
          ))}
        </div>
      </Styled.Body>
      <Button onClick={() => navigate("/make_game")}>추가 후 선택하기</Button>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  Body: styled.div``,
};
