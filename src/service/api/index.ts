import axios, { Axios, AxiosRequestConfig } from "axios";
import { APIResponse } from "./type";

const client: Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// TODO: get
export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    console.log(process.env.REACT_APP_API_URL);
    const response = await client.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`[${url}] api get request error`);
  }
};

// TODO: post
// TODO: put
// TODO: delete
