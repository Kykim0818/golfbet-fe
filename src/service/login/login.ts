import axios from "axios";
import { getCookie, setCookie } from "../../utils/cookie";

export const handleLogin = (refreshToken?: string, accessToken?: string) => {
  // #1. 쿠키에 리프레시 저장
  if (refreshToken) {
    // TODO 이거 로직 수정해야함 refresh 프론트에서 못읽음
    if (getCookie("refreshToken") === refreshToken) return;
    setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      // 2주
      maxAge: 1209600,
    });
  } else {
    // TODO:Error
    console.log("refresh token is undefined");
  }
  // #2. 액세스 토큰 처리
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    // TODO:Error
    console.log("access token is undefined");
  }
};
