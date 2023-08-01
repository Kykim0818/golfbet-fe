import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TitleAsset from "../../../components/TitleAsset";
import { GameInfo } from "../MakeGame";

type GolfCourseInfo = {
  type: GameInfo["gameType"];
  name: string;
  location: string;
  frontNineCourseName: string;
  backNineCourseName: string;
};

export const MakeGolfCourse = () => {
  const navigate = useNavigate();
  const golfCourseInfo = useRef<GolfCourseInfo>({
    type: "field",
    name: "",
    location: "",
    frontNineCourseName: "",
    backNineCourseName: "",
  });

  return (
    <Styled.Wrapper>
      <TitleAsset
        title="골프장 추가"
        visibleBack
        handleBack={() => navigate("../select_golf_course")}
      />
      <Styled.Body>
        <div>
          <h5>골프장</h5>
          <Input
            placeholder="골프장명을 입력해주세요."
            value={golfCourseInfo.current.name}
            onChange={(e) => (golfCourseInfo.current.name = e.target.value)}
          />
        </div>
        <div>
          <h5>지역</h5>
          <div>{golfCourseInfo.current.location}</div>
        </div>
        <div>
          <h5>전반</h5>
          <Input
            placeholder="전반 코스 이름을 입력해주세요."
            value={golfCourseInfo.current.frontNineCourseName}
            onChange={(e) =>
              (golfCourseInfo.current.frontNineCourseName = e.target.value)
            }
          />
        </div>
        <div>
          <h5>후반</h5>
          <Input
            placeholder="후반 코스 이름을 입력해주세요."
            value={golfCourseInfo.current.backNineCourseName}
            onChange={(e) =>
              (golfCourseInfo.current.backNineCourseName = e.target.value)
            }
          />
        </div>
      </Styled.Body>
      <Button onClick={() => navigate("../make_golf_course_detail")}>
        다음
      </Button>
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
