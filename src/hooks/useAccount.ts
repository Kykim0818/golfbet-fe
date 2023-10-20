import axios from "axios";
import { useEffect, useState } from "react";
import { requestAccessToken } from "../service/api";
import { usePageRoute } from "./usePageRoute";

export const useAccount = () => {
  const [isLogined, setIsLogined] = useState(false);
  // TODO: 분리해도될지 고민 필요
  const { movePage } = usePageRoute();
  const handleLogout = () => {
    // TODO : logout API

    // 토큰 제거
    axios.defaults.headers.common["Authorization"] = undefined;
    // TODO: cookie 제거도 안됨
    movePage("/", { replace: true });
  };

  useEffect(() => {
    console.log("useAcoount useEffect trigger check");
    checkLogined().then((res) => {
      console.log("checkLogined res", res);
      if (res) {
        setIsLogined(true);
        return;
      }
      setIsLogined(false);
    });
  });

  return {
    isLogined,
    handleLogout,
  };
};

async function checkLogined() {
  // axios 가 없으면
  if (axios.defaults.headers.common["Authorization"] === undefined) {
    const res = await requestAccessToken();
    if (res === false) {
      return false;
    }
  }
  // 일단 토큰값이 있으면 만료되어도 로그인 상태임
  return true;
}
