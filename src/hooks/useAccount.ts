import axios from "axios";
import { useEffect, useState } from "react";
import { requestAccessToken } from "../service/api";
import { apiLogout, getUser } from "../service/api/user";
import { actionUser } from "../store/user/userSlice";
import { useAppDispatch } from "./redux";

export const useAccount = () => {
  const dispatch = useAppDispatch();
  const [isLogined, setIsLogined] = useState(false);

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

  // TODO: 분리해도될지 고민 필요
  const handleLogout = async () => {
    const res = await apiLogout();
    if (res) {
      // 토큰 제거
      axios.defaults.headers.common["Authorization"] = undefined;
      dispatch(actionUser.resetUserInfo());
      return true;
    }
    return false;
  };

  const reloadUserInfo = async () => {
    try {
      const { userInfo } = await getUser();
      dispatch(
        actionUser.setUser({
          userId: userInfo.userId,
          nickname: userInfo.nickname,
          profileImgSrc: userInfo.profileImgSrc,
        })
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    isLogined,
    handleLogout,
    reloadUserInfo,
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
