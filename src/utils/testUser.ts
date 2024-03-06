import axios from "axios";
import { BasicUserInfo } from "../service/api/user";

const TEST_KEY = "isTest";

const login = () => {
  const randomTestCode = `TEST${Math.floor(Math.random() * 100)}`;
  axios.defaults.headers.common["Authorization"] = randomTestCode;
  sessionStorage.setItem(TEST_KEY, randomTestCode);
};

const logout = () => {
  sessionStorage.removeItem(TEST_KEY);
  delete axios.defaults.headers.common["Authorization"];
};

const getInfo = () => {
  const testKey = sessionStorage.getItem(TEST_KEY);
  if (testKey) {
    return new Promise<{ userInfo: BasicUserInfo }>((resolve) =>
      resolve({
        userInfo: {
          userId: testKey,
          nickname: testKey,
          profileImgSrc:
            process.env.PUBLIC_URL + "/assets/images/profile_test_img.png",
          screenScore: 99,
          screenTotalMoneyChange: 9999,
          fieldScore: 99,
          fieldTotalMoneyChange: 9999,
          currentGameId: "",
        },
      })
    );
  }
  throw Error("테스트 유저가 아닙니다.");
};

const isTest = () => {
  return !!sessionStorage.getItem(TEST_KEY);
};

export const testUser = {
  login,
  logout,
  getInfo,
  isTest,
};
