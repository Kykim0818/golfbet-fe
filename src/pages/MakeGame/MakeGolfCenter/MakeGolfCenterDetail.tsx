import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import { FixedGolfCenter } from "../FixedGolfCenter";
import { useGameInfo } from "../MakeGame";
import { ParDetail } from "../SetupCheck/ParDetail";

// TODO 전역값 관리 어디서할지 정하면 수정
const GOLF_COURSE_COUNT = 9;

export const MakeGolfCenterDetail = () => {
  const navigate = useNavigate();
  const { gameInfo, tmpGolfCenterInfoForAdd: tmpGolfCourseInfoForAdd } =
    useGameInfo();
  const frontNineCourseDetail = useRef(
    tmpGolfCourseInfoForAdd.frontNineCourse.pars
  );
  const backNineCourseDetail = useRef(
    tmpGolfCourseInfoForAdd.backNineCourse.pars
  );

  const handleClickSelectGolfCenterBtn = () => {
    // TODO-Server : 저장전 서버에 데이터 전송후,
    // 성공 response 후에 그 값을 선택으로 지정
    gameInfo.golfCenter = {
      name: tmpGolfCourseInfoForAdd.name,
      region: tmpGolfCourseInfoForAdd.region,
      frontNineCourse: {
        name: tmpGolfCourseInfoForAdd.frontNineCourse.name,
        pars: frontNineCourseDetail.current,
      },
      backNineCourse: {
        name: tmpGolfCourseInfoForAdd.backNineCourse.name,
        pars: backNineCourseDetail.current,
      },
    };
    navigate("/make_game");
  };

  return (
    <>
      <TitleAsset
        title="골프장 상세"
        visibleBack
        handleBack={() => navigate("../make_golf_center", { replace: true })}
      />
      <Styled.Body>
        <FixedGolfCenter
          centerType={gameInfo.gameType}
          name={tmpGolfCourseInfoForAdd.name}
          frontNineCourseName={tmpGolfCourseInfoForAdd.frontNineCourse.name}
          backNineCourseName={tmpGolfCourseInfoForAdd.backNineCourse.name}
        />
        <div>
          <span>{tmpGolfCourseInfoForAdd.frontNineCourse.name}</span>
          {[...new Array(GOLF_COURSE_COUNT)].map((_, index) => (
            <ParDetail
              key={index}
              holeIndex={index + 1}
              parCount={frontNineCourseDetail.current[index]}
              onChange={(_, parCount) =>
                (frontNineCourseDetail.current[index] = parCount)
              }
            />
          ))}
        </div>
        <div>
          <span>{tmpGolfCourseInfoForAdd.backNineCourse.name}</span>
          {[...new Array(GOLF_COURSE_COUNT)].map((_, index) => (
            <ParDetail
              key={index}
              holeIndex={index + 1}
              parCount={backNineCourseDetail.current[index]}
              onChange={(_, parCount) =>
                (backNineCourseDetail.current[index] = parCount)
              }
            />
          ))}
        </div>
      </Styled.Body>
      <Styled.Footer>
        <Button onClick={handleClickSelectGolfCenterBtn}>
          추가 후 선택하기
        </Button>
      </Styled.Footer>
    </>
  );
};

const Styled = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 25px;
    margin-top: 40px;
    padding: 0px 26px;

    overflow: auto;
  `,
  // footer
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
