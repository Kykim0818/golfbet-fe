import { getData, postData } from ".";
import { REACT_APP_KAKAO_REDIRECT } from "../../pages/Login/Login";
import { testAsync } from "../../utils/test-promise";
import { API_URL } from "./constant";

export type User = {
  id: string;
  imgSrc: string;
  moneySum: number;
  fieldGameScore: number;
  screenGameScore: number;
  status: null | any;
};

export const getUser = (userId: string): Promise<User> =>
  testAsync(() => mockUserInfo, 100).then((res) => res as User);
// const ret = await axios.get<User>(
//   "https://my-json-server.typicode.com/typicode/demo/posts"
// );
const mockUserInfo = {
  id: "test",
  imgSrc: process.env.PUBLIC_URL + "/assets/images/profile_test_img.png",
  moneySum: 100000,
  fieldGameScore: 0,
  screenGameScore: 30,
  status: null,
};

// TODO : db 에서 토큰 검증
export const checkLoginValidation = (token: string): Promise<boolean> =>
  testAsync(() => true, 100).then((res) => res as boolean);

export async function requestLogout(
  userId: string,
  token: string
): Promise<boolean> {
  const testResult = Math.floor(Math.random() * 10) > 0;
  return testAsync(() => testResult, 100).then((res) => res as boolean);
}

type API_START_KAKAO_RES = {
  accessToken: string;
  refreshToken: string;
  newMemberYn: boolean;
  userInfo: SignUpUserInfoType;
};

export type SignUpUserInfoType = {
  platformId: string;
  profile: string;
  email: string;
  gender: string;
  signupPlatform: string;
  nickname: string;
};

export async function apiStartKakao(authCode: string) {
  try {
    const response = await postData<API_START_KAKAO_RES>(
      API_URL.START_KAKAO,
      {
        code: authCode,
        redirectUrl: REACT_APP_KAKAO_REDIRECT,
      },
      { timeout: 2000 }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function apiSignUp() {}

export async function apiCheckDuplicate(
  type: "email" | "nickname",
  value: string
) {
  try {
    if (type === "email") {
      const response = await getData<{ duplicateYn: boolean }>(
        API_URL.CHECK_DUPLICATE,
        {
          params: { email: value },
          timeout: 2000,
        }
      );
      return response.data;
    }
    if (type === "nickname") {
      const response = await getData<{ duplicateYn: boolean }>(
        API_URL.CHECK_DUPLICATE,
        {
          params: { nickname: value },
          timeout: 2000,
        }
      );
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
}
