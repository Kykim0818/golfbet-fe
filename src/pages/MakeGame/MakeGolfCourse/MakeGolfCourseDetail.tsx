import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import styled from "styled-components";

export const MakeGolfCourseDetail = () => {
  const navigate = useNavigate();
  return (
    <Styled.Wrapper>
      <TitleAsset
        title="골프장 상세"
        visibleBack
        handleBack={() => navigate("../make_golf_course")}
      />
      <Styled.Body>골프장 상세</Styled.Body>
      <Button onClick={() => navigate("/make_game")}>추가 후 선택하기</Button>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  Body: styled.div``,
};
