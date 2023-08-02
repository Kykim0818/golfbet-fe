import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TitleAsset from "../../../components/TitleAsset";
import { useGameInfo } from "../MakeGame";

export const MakeGolfCourse = () => {
  const navigate = useNavigate();
  const { tmpGolfCourseInfoForAdd } = useGameInfo();

  const [courseName, setCourseName] = useState(tmpGolfCourseInfoForAdd.name);
  const [location, setLocation] = useState(tmpGolfCourseInfoForAdd.location);
  const [frontNineCourseName, setFrontNineCourseName] = useState(
    tmpGolfCourseInfoForAdd.frontNineCourse.name
  );
  const [backNineCourseName, setBackNineCourseName] = useState(
    tmpGolfCourseInfoForAdd.backNineCourse.name
  );

  const handleClickNextBtn = () => {
    // save tmp data for add
    if (
      courseName === "" ||
      frontNineCourseName === "" ||
      backNineCourseName === ""
    ) {
      //TODO: alert
      alert("공백인 값이 있습니다. 확인해주세요");
      return;
    }
    tmpGolfCourseInfoForAdd.name = courseName;
    tmpGolfCourseInfoForAdd.location = location;
    tmpGolfCourseInfoForAdd.frontNineCourse.name = frontNineCourseName;
    tmpGolfCourseInfoForAdd.backNineCourse.name = backNineCourseName;
    navigate("../make_golf_course_detail");
  };

  return (
    <Styled.Wrapper>
      <TitleAsset
        title="골프장 추가"
        visibleBack
        handleBack={() => navigate("../select_golf_course", { replace: true })}
      />
      <Styled.Body>
        <div>
          <h5>골프장</h5>
          <Input
            placeholder="골프장명을 입력해주세요."
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div>
          <h5>지역</h5>
          <div>{location}</div>
        </div>
        <div>
          <h5>전반</h5>
          <Input
            placeholder="전반 코스 이름을 입력해주세요."
            value={frontNineCourseName}
            onChange={(e) => setFrontNineCourseName(e.target.value)}
          />
        </div>
        <div>
          <h5>후반</h5>
          <Input
            placeholder="후반 코스 이름을 입력해주세요."
            value={backNineCourseName}
            onChange={(e) => setBackNineCourseName(e.target.value)}
          />
        </div>
      </Styled.Body>
      <Button onClick={handleClickNextBtn}>다음</Button>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 25px;
    margin-top: 40px;
    padding: 0px 26px;

    overflow: auto;
  `,
};
