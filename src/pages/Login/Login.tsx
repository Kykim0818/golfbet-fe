import styled from "styled-components";
import Button from "../../components/Button";
import { usePageRoute } from "../../hooks/usePageRoute";
import { testUser } from "../../utils/testUser";

const REACT_APP_KAKAO_API = process.env.REACT_APP_KAKAO_API;
export const REACT_APP_KAKAO_REDIRECT =
  process.env.REACT_APP_KAKAO_REDIRECT_API + "login";

export const Login = (props: {}) => {
  // TODO: login handling 방식에 따라 다를듯
  const { movePage } = usePageRoute();

  const handleKakaoLogin = () => {
    window.location.replace(
      `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_API}&redirect_uri=${REACT_APP_KAKAO_REDIRECT}&response_type=code`
    );
  };
  //
  const handleTestLogin = () => {
    testUser.login();
    movePage("/", { replace: true });
  };

  return (
    <Styled.Wrapper>
      <Styled.AppName>GOLF BET</Styled.AppName>
      <Styled.Img
        src={process.env.PUBLIC_URL + "/assets/svg/login.svg"}
        alt="no images"
      />
      <Styled.BtnGroup>
        <Styled.KakaoLoginBtn onClick={handleKakaoLogin}>
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/ic_kakao_logo.svg"}
            alt="logo"
          />
          카카오로 시작하기
        </Styled.KakaoLoginBtn>
        <Button onClick={handleTestLogin}>Test login</Button>
      </Styled.BtnGroup>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    // 화면 마다 지정
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0px 20px;
    // TODO : color
    background-color: #effaff;
  `,
  Img: styled.img`
    margin-top: 41px;
    margin-bottom: 36px;
  `,
  AppName: styled.div`
    // TODO: typo 대체
    font-size: 30px;
    font-weight: 700;
    line-height: 40.85px;
    color: var(--color-main-dark, #006977);
  `,
  BtnGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 320px;
      min-height: 46px;
    }
  `,
  KakaoLoginBtn: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;
    background-color: #fde333;
    border-radius: 15px;
    padding: 12px 0px;
  `,
};
