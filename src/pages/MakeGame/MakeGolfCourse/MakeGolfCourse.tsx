import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";

export const MakeGolfCourse = () => {
  const navigate = useNavigate();

  return (
    <Styled.Wrapper>
      <TitleAsset
        title="골프장 추가"
        visibleBack
        handleBack={() => navigate("../select_golf_course")}
      />
      <Styled.Body></Styled.Body>
      <Button onClick={() => navigate("../make_golf_course_detail")}>
        다음
      </Button>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  Body: styled.div``,
};
