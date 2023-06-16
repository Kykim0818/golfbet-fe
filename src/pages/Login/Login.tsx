import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGIN } from "../../service/login/constant";
import { testAsync } from "../../utils/test-promise";

function getLoginInfo() {
  // localStorge 확인후 없으면 로그인페이지 , 있으면 메인페이지
  return { token: null };
}

export async function loginLoader() {
  // isLogined
  return await testAsync(getLoginInfo);
}

export const Login = () => {
  const navigate = useNavigate();
  const ret: any = useLoaderData() as ReturnType<typeof loginLoader>;

  //
  useEffect(() => {
    if (ret.token !== null) {
      navigate("/home");
    }
  }, [ret.token, navigate]);

  // TODO: login handling 방식에 따라 다를듯
  const handleKakaoLogin = () => {
    alert("Kakao Login");
  };
  const handleTestLogin = () => {
    localStorage.setItem("id", LOGIN.TEST_INFO.id);
    localStorage.setItem("token", LOGIN.TEST_INFO.token);
    navigate("/home");
  };

  return (
    <Styled.Wrapper>
      <Styled.Img
        src={process.env.PUBLIC_URL + "/assets/images/login_img.png"}
        alt="no images"
      />
      <Styled.AppName>GOLF BET</Styled.AppName>
      <Styled.BtnGroup>
        <button onClick={handleKakaoLogin}>Kakao login</button>
        <button onClick={handleTestLogin}>Test login</button>
      </Styled.BtnGroup>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0px 20px;
    // TODO : color
    background-color: #f8fafb;
  `,
  Img: styled.img`
    width: 209px;
    height: 272px;
    margin-top: 102px;
    margin-bottom: 36px;
  `,
  AppName: styled.div`
    // TODO: typo 대체
    font-size: 30px;
    font-weight: 700;
    line-height: 40.85px;
    color: var(--color-main-dark, #006977);
    margin-bottom: 60px;
  `,
  BtnGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    button {
      width: 320px;
    }
  `,
};
