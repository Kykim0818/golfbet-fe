import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import { FixedGolfCourse } from "../FixedGolfCourse";
import { HoleDetail } from "../HoleDetail";
import { useGameInfo } from "../MakeGame";

// TODO 전역값 관리 어디서할지 정하면 수정
const GOLF_COURSE_COUNT = 9;

export const MakeGolfCenterDetail = () => {
  const navigate = useNavigate();
  const { gameInfo, tmpGolfCenterInfoForAdd: tmpGolfCourseInfoForAdd } =
    useGameInfo();
  const frontNineCourseDetail = useRef(
    tmpGolfCourseInfoForAdd.frontNineCourse.holeCounts
  );
  const backNineCourseDetail = useRef(
    tmpGolfCourseInfoForAdd.backNineCourse.holeCounts
  );

  const handleClickSelectGolfCenterBtn = () => {
    // TODO-Server : 저장전 서버에 데이터 전송후,
    // 성공 response 후에 그 값을 선택으로 지정
    gameInfo.golfCenter = {
      name: tmpGolfCourseInfoForAdd.name,
      location: tmpGolfCourseInfoForAdd.location,
      frontNineCourse: {
        name: tmpGolfCourseInfoForAdd.frontNineCourse.name,
        holeCounts: frontNineCourseDetail.current,
      },
      backNineCourse: {
        name: tmpGolfCourseInfoForAdd.backNineCourse.name,
        holeCounts: backNineCourseDetail.current,
      },
    };
    navigate("/make_game");
  };

  return (
    <Styled.Wrapper>
      <TitleAsset
        title="골프장 상세"
        visibleBack
        handleBack={() => navigate("../make_golf_course", { replace: true })}
      />
      <Styled.Body>
        <FixedGolfCourse
          courseType={gameInfo.gameType}
          name={tmpGolfCourseInfoForAdd.name}
          frontNineCourseName={tmpGolfCourseInfoForAdd.frontNineCourse.name}
          backNineCourseName={tmpGolfCourseInfoForAdd.backNineCourse.name}
        />
        <div>
          <span>{tmpGolfCourseInfoForAdd.frontNineCourse.name}</span>
          {[...new Array(GOLF_COURSE_COUNT)].map((_, index) => (
            <HoleDetail
              key={index + 1}
              holeNumber={index + 1}
              parCount={frontNineCourseDetail.current[index]}
              onChange={(parCount) =>
                (frontNineCourseDetail.current[index] = parCount)
              }
            />
          ))}
        </div>
        <div>
          <span>{tmpGolfCourseInfoForAdd.backNineCourse.name}</span>
          {[...new Array(GOLF_COURSE_COUNT)].map((_, index) => (
            <HoleDetail
              key={index + 1}
              holeNumber={index + 1}
              parCount={backNineCourseDetail.current[index]}
              onChange={(parCount) =>
                (backNineCourseDetail.current[index] = parCount)
              }
            />
          ))}
        </div>
      </Styled.Body>
      <Button onClick={handleClickSelectGolfCenterBtn}>추가 후 선택하기</Button>
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
