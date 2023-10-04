import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "./hooks/useAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { SignUpUserInfoType, apiStartKakao } from "./service/api/user";

function App() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    localStorage.removeItem("tmpUserInfo");
  }, []);

  useEffect(() => {
    const handleKaKaoLogin = async (authCode: string | null) => {
      if (authCode !== null) {
        const response = await apiStartKakao(authCode);
        console.log(response);
        if (response?.newMemberYn) {
          // 카카오에서 가져 올 수 있는 정보 임시 저장 TODO : 전역에 저장
          const tmpUserInfo: SignUpUserInfoType = {
            platformId: response.userInfo.platformId,
            email: response.userInfo.email,
            gender: response.userInfo.gender ?? "male",
            nickname: response.userInfo.nickname ?? "",
            profile: response.userInfo.profile ?? "",
            signupPlatform: response.userInfo.signupPlatform ?? "",
          };
          localStorage.setItem("tmpUserInfo", JSON.stringify(tmpUserInfo));
          navigate("/terms_and_conditions", { replace: true });
          // 가입된 유저
        } else {
          // 토큰 처리
          // DB에 저장된 유저정보 TODO: 전역에 저장
        }
      }
    };
    if (code !== null) {
      handleKaKaoLogin(code);
    }
  }, [code, navigate]);

  /**
   *  login check
   *  login 된 상태면 -> main
   *  안된 상태면 -> login
   *  useAccount 전역 필요해보임
   */
  const { isLogined, handleLogIn, handleLogout } = useAccount();
  if (isLogined) return <Home handleLogout={handleLogout} />;
  return <Login handleLogin={handleLogIn} />;
}

export default App;
