import axios, { Axios, AxiosRequestConfig } from "axios";
import { getCookie } from "../../utils/cookie";
import { APIResponse } from "./type";

const client: Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // CORS 요청 허용 TODO
  // withCredentials: true,
});

// TODO: get
export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  authOpitons?: { token: boolean }
): Promise<APIResponse<T>> => {
  try {
    if (authOpitons?.token) {
    }
    const response = await client.get<APIResponse<T>>(url, config);
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
  authOpitons?: { token: boolean }
): Promise<APIResponse<T>> => {
  try {
    const response = await client.post<APIResponse<T>>(url, data, config);
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
  if (getCookie("refreshToken")) {
    console.log("accessToken is undefined,need request");
    axios.defaults.headers.common["Authorization"] = "TEST";
    return true;
  }
  return false;
};
