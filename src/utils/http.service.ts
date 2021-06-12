import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

export const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return axiosInstance
    .request<T>(config)
    .then((response) => response)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};
