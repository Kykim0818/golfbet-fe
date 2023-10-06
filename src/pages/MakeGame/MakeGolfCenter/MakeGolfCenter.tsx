import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TitleAsset from "../../../components/TitleAsset";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { useGameInfo } from "../MakeGame";

export const MakeGolfCenter = () => {
  const { movePage } = usePageRoute();
  const { tmpGolfCenterInfoForAdd: tmpGolfCourseInfoForAdd } = useGameInfo();

  const [centerName, setCenterName] = useState(tmpGolfCourseInfoForAdd.name);
  const [region, setRegion] = useState(tmpGolfCourseInfoForAdd.region);
  const [frontNineCourseName, setFrontNineCourseName] = useState(
    tmpGolfCourseInfoForAdd.frontNineCourse.name
  );
  const [backNineCourseName, setBackNineCourseName] = useState(
    tmpGolfCourseInfoForAdd.backNineCourse.name
  );

  const handleClickNextBtn = () => {
    // save tmp data for add
    if (
      centerName === "" ||
      frontNineCourseName === "" ||
      backNineCourseName === ""
    ) {
      //TODO: alert
      alert("공백인 값이 있습니다. 확인해주세요");
      return;
    }
    tmpGolfCourseInfoForAdd.name = centerName;
    tmpGolfCourseInfoForAdd.region = region;
    tmpGolfCourseInfoForAdd.frontNineCourse.name = frontNineCourseName;
    tmpGolfCourseInfoForAdd.backNineCourse.name = backNineCourseName;
    movePage("../make_golf_center_detail");
  };

  return (
    <>
      <TitleAsset
        title="골프장 추가"
        visibleBack
        handleBack={() => movePage("../select_golf_center", { replace: true })}
      />
      <Styled.Body>
        <div>
          <h5>골프장</h5>
          <Styled.Input
            placeholder="골프장명을 입력해주세요."
            value={centerName}
            onChange={(e) => setCenterName(e.target.value)}
          />
        </div>
        <div>
          <h5>지역</h5>
          <div>{region}</div>
        </div>
        <div>
          <h5>전반</h5>
          <Styled.Input
            placeholder="전반 코스 이름을 입력해주세요."
            value={frontNineCourseName}
            onChange={(e) => setFrontNineCourseName(e.target.value)}
          />
        </div>
        <div>
          <h5>후반</h5>
          <Styled.Input
            placeholder="후반 코스 이름을 입력해주세요."
            value={backNineCourseName}
            onChange={(e) => setBackNineCourseName(e.target.value)}
          />
        </div>
      </Styled.Body>
      <Styled.Footer>
        <Button onClick={handleClickNextBtn}>다음</Button>
      </Styled.Footer>
    </>
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
  Input: styled(Input)`
    width: 100%;
  `,
  // footer
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
