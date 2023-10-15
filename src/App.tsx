import { useEffect } from "react";
import { useAccount } from "./hooks/useAccount";
import { usePageRoute } from "./hooks/usePageRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { SignUpUserInfoType, apiStartKakao } from "./service/api/user";
import { handleLogin } from "./service/login/login";

function App() {
  const { movePage } = usePageRoute();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    localStorage.removeItem("tmpUserInfo");
  }, []);

  useEffect(() => {
    const handleKaKaoLogin = async (authCode: string | null) => {
      if (authCode !== null) {
        const response = await apiStartKakao(authCode);
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
          movePage("/terms_and_conditions", { replace: true });
        } else {
          // 가입된 유저
          handleLogin(response?.refreshToken, response?.accessToken);
          movePage("/", { replace: true });
        }
      }
    };
    if (code !== null) {
      handleKaKaoLogin(code);
    }
  }, [code, movePage]);

  /**
   *  login check
   *  login 된 상태면 -> main
   *  안된 상태면 -> login
   *  useAccount 전역 필요해보임
   */
  const { isLogined, handleLogIn, handleLogout } = useAccount();
  console.log("isLogined", isLogined);
  if (isLogined) return <Home handleLogout={handleLogout} />;
  return <Login handleLogin={handleLogIn} />;
}

export default App;
