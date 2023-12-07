import { useRef } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { PageStyle } from "../../../styles/page";
import { FixedGolfCenter } from "../FixedGolfCenter";
import { ParDetail } from "../SetupCheck/ParDetail";

// TODO 전역값 관리 어디서할지 정하면 수정
const GOLF_COURSE_COUNT = 9;
const defualtPars = [3, 3, 3, 3, 3, 3, 3, 3, 3];
export type MakeGolfCenterDetailProps = {
  userCustomCenterInfo: {
    centerName: string;
    region: string;
    frontNineCourseName: string;
    backNineCourseName: string;
  };
  handleModalResult?: (userCustomCenterParInfo: {
    frontNineCoursePars: number[];
    backNineCoursePars: number[];
  }) => void;
};

export const MakeGolfCenterDetail = ({
  userCustomCenterInfo: {
    centerName,
    region,
    frontNineCourseName,
    backNineCourseName,
  },
  handleModalResult,
}: MakeGolfCenterDetailProps) => {
  const { moveBack } = usePageRoute();
  const frontNineCourseDetail = useRef([...defualtPars]);
  const backNineCourseDetail = useRef([...defualtPars]);

  const handleClickSelectGolfCenterBtn = () => {
    // TODO-Server : 저장전 서버에 데이터 전송후,
    // 성공 response 후에 그 값을 선택으로 지정

    handleModalResult?.({
      frontNineCoursePars: frontNineCourseDetail.current,
      backNineCoursePars: backNineCourseDetail.current,
    });
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset
        title="골프장 상세"
        visibleBack
        // handleBack={() => movePage("../make_golf_center", { replace: true })}
        handleBack={moveBack}
      />
      <Styled.Body>
        <FixedGolfCenter
          centerType="field"
          name={centerName}
          frontNineCourseName={frontNineCourseName}
          backNineCourseName={backNineCourseName}
        />
        <div>
          <span>{frontNineCourseName}</span>
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
          <span>{backNineCourseName}</span>
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
    </PageStyle.Wrapper>
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
