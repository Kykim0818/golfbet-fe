import axios, { Axios, AxiosRequestConfig } from "axios";
import { APIResponse } from "./type";
import { apiGetAccessToken } from "./user";

const client: Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // CORS 요청 허용 TODO
  withCredentials: true,
});

const externalClient: Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // CORS 요청 허용 TODO
  withCredentials: true,
});

// TODO: get
export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  authOpitons?: { token: boolean; external?: boolean }
): Promise<APIResponse<T>> => {
  try {
    if (authOpitons?.token) {
    }
    let requestClient =
      authOpitons?.external === true ? externalClient : client;
    const response = await requestClient.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`[${url}] api get request error`);
  }
};

// TODO: post
export const postData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
  authOpitons?: { token: boolean; external?: boolean }
): Promise<APIResponse<T>> => {
  try {
    let requestClient =
      authOpitons?.external === true ? externalClient : client;
    const response = await requestClient.post<APIResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`[${url}] api get request error`);
  }
};
// TODO: put
// TODO: delete

// TODO : util
export const requestAccessToken = async () => {
  // refresh로 access 갱신
  const ret = await apiGetAccessToken();
  if (ret?.accessToken) {
    axios.defaults.headers.common["Authorization"] = ret?.accessToken;
    if (ret.newRefreshToken) {
      console.log("refreshToken", ret.newRefreshToken);
      // setCookie("refreshToken", ret.newRefreshToken, {
      //   path: "/",
      //   httpOnly: true,
      //   // 2주
      //   maxAge: 1209600,
      // });
    }
    return true;
  }
  return false;
};
