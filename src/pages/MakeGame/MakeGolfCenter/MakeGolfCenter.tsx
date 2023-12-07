import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TitleAsset from "../../../components/TitleAsset";
import { useModal } from "../../../hooks/useModal";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { PageStyle } from "../../../styles/page";
import { GameInfo } from "../MakeGame";

export type MakeGolfCenterProps = {
  handleModalResult?: (userCustomCenter: GameInfo["golfCenter"]) => void;
};

export const MakeGolfCenter = ({ handleModalResult }: MakeGolfCenterProps) => {
  const { moveBack } = usePageRoute();
  const { openModal } = useModal();
  const [centerName, setCenterName] = useState("");
  // TODO: 임시 서울
  const [region, setRegion] = useState("서울");
  const [frontNineCourseName, setFrontNineCourseName] = useState("");
  const [backNineCourseName, setBackNineCourseName] = useState("");

  const handleOpenMakeGolfCenterDetail = async () => {
    // save tmp data for add
    if (
      centerName === "" ||
      frontNineCourseName === "" ||
      backNineCourseName === ""
    ) {
      openModal({
        id: "ALERT",
        args: {
          title: "",
          msg: "공백인 값이 있습니다. 확인해주세요",
          okBtnLabel: "확인",
        },
      });
      return;
    }
    const customGolfCenterDetail = await openModal<{
      frontNineCoursePars: number[];
      backNineCoursePars: number[];
    }>({
      id: "MAKE_GOLF_CENTER_DETAIL",
      args: {
        userCustomCenterInfo: {
          centerName,
          region,
          frontNineCourseName,
          backNineCourseName,
        },
      },
    });
    if (customGolfCenterDetail) {
      handleModalResult?.({
        id: "userCustom",
        name: centerName,
        region,
        frontNineCourse: {
          id: 0,
          name: frontNineCourseName,
          pars: customGolfCenterDetail.frontNineCoursePars,
        },
        backNineCourse: {
          id: 0,
          name: backNineCourseName,
          pars: customGolfCenterDetail.backNineCoursePars,
        },
      });
    }
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset title="골프장 추가" visibleBack handleBack={moveBack} />
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
          <Styled.Input placeholder="지역을 선택하세요" value={region} />
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
        <Button onClick={handleOpenMakeGolfCenterDetail}>다음</Button>
      </Styled.Footer>
    </PageStyle.Wrapper>
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
