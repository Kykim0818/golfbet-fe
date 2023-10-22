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
    // token 필요 api 처리
    if (authOpitons?.token) {
      if (axios.defaults.headers.common["Authorization"] === undefined) {
        await requestAccessToken();
      }
    }
    let requestClient =
      authOpitons?.external === true ? externalClient : client;
    const response = await requestClient.get<APIResponse<T>>(url, config);
    // TODO access 만료 또는 유효 토큰 아닐 경우 처리 필요

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
    return true;
  }
  return false;
};
