import { testAsync } from "../../utils/test-promise";

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
  id: "TEST",
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
