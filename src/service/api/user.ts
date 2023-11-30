import axios from "axios";
import { getData, postData } from ".";
import { REACT_APP_KAKAO_REDIRECT } from "../../pages/Login/Login";
import { testAsync } from "../../utils/test-promise";
import { API_URL } from "./constant";

export type BasicUserInfo = {
  userId: string;
  nickname: string;
  profileImgSrc: string;
  screenScore: number;
  screenTotalMoneyChange: number;
  fieldScore: number;
  fieldTotalMoneyChange: number;
  currentGameId?: string;
};

export const getUser = async () => {
  try {
    const response = await getData<{ userInfo: BasicUserInfo }>(
      API_URL.GET_USER_INFO,
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
        timeout: 2000,
      },
      { requireToken: true }
    );
    console.log(response);
    if (response.statusCode === 404 || response.statusCode === 500)
      throw new Error();
    return response.data;
  } catch (e) {
    // 응답실패
    // alert 적으면 계속 query 실행됨
    console.log(e);
    return { userInfo: mockUserInfo };
  }
};
// testAsync(() => mockUserInfo, 100).then((res) => res as User);
// const ret = await axios.get<User>(
//   "https://my-json-server.typicode.com/typicode/demo/posts"
// );
const mockUserInfo: BasicUserInfo = {
  userId: "test",
  nickname: "TEST",
  profileImgSrc: process.env.PUBLIC_URL + "/assets/images/profile_test_img.png",
  screenScore: 99,
  screenTotalMoneyChange: 9999,
  fieldScore: 99,
  fieldTotalMoneyChange: 9999,
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

type ApiSignUpParams = {
  platformId: number;
  gender: "male" | "female";
  email: string;
  profile: string;
  nickname: string;
  phoneNumber: string;
  termsOfServiceAgreement: boolean;
  privacyUsageAgreement: boolean;
  marketingConsent: boolean;
};

export async function apiSignUp(params: ApiSignUpParams) {
  try {
    const response = await postData<any>(API_URL.SIGN_UP, params, {
      timeout: 2000,
    });
    console.log(response.statusCode);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function apiGetAccessToken() {
  try {
    const response = await postData<{
      accessToken: string;
    }>(
      API_URL.GET_ACCESS_TOKEN,
      undefined,
      {
        timeout: 2000,
      },
      { requireToken: false, external: true }
    );
    console.log("apiGetAccessTokenResponse", response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function apiLogout() {
  try {
    const response = await postData<{ result: string }>(
      API_URL.LOGOUT,
      undefined,
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
        timeout: 2000,
      }
    );
    if (response.data.result === "success") {
      return true;
    }
    throw Error();
  } catch (e) {
    console.log("error", e);
    return false;
  }
}

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
