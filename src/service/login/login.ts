import axios from "axios";

export const handleLogin = (refreshToken?: string, accessToken?: string) => {
  // #1. 쿠키에 리프레시 저장
  if (refreshToken) {
    // setCookie("refreshToken", refreshToken, {
    //   path: "/",
    //   // 2주
    //   maxAge: 1209600,
    // });
  } else {
    // TODO:Error
    console.log("refresh token is undefined");
    return false;
  }
  // #2. 액세스 토큰 처리
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    // TODO:Error
    console.log("access token is undefined");
    return false;
  }
  return true;
};
