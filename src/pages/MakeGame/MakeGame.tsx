import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleAsset from "../../components/TitleAsset";

export const MakeGame = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <TitleAsset
        title="게임 만들기"
        visibleBack
        handleBack={() => navigate(-1)}
      />
      <S.Content>Content</S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--color-bg, #f6f8fc);
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 26px;
  `,
};
