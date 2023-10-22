import axios from "axios";

export const handleLogin = (accessToken?: string) => {
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
