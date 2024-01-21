import styled from "styled-components";

export const Loading = ({ onTest }: any) => {
  return (
    <S.PageBackground>
      <S.Background>
        <S.Body>
          <S.Img
            src={process.env.PUBLIC_URL + "/assets/gif/loading.gif"}
            onClick={onTest}
          />
        </S.Body>
      </S.Background>
    </S.PageBackground>
  );
};

const S = {
  PageBackground: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f6f8fc;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  Background: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(79, 77, 77, 0.61);
    z-index: 4;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  Body: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `,
  Img: styled.img``,
};
