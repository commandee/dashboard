import Axios, { type AxiosResponse, type AxiosRequestConfig, AxiosError } from "axios";
import { logout } from "./login";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

type ErrorResponse = {
  statusCode: number;
  code: string;
  error: string;
  message: string;
}

function wrapGet(method: typeof axios.get) {
  return async <T = unknown, D = any>(url: string, config?: AxiosRequestConfig<D>) => {
    try {
      return await method<T, AxiosResponse<T, any>, D>(url, config);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const sentError = error.response?.data!;

      switch (sentError.code) {
        case "FST_JWT_AUTHORIZATION_TOKEN_INVALID":
        case "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED":
          logout();
          break;

        case "FST_JWT_NO_AUTHORIZATION_IN_COOKIE":
          logout();
          break;
      }

      throw new Error(sentError.message);
    }
  }
}

function wrapPost(method: typeof axios.post) {
  return async <T = unknown, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    try {
      return await method<T, AxiosResponse<T, any>, D>(url, data, config);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const sentError = error.response?.data!;

      switch (sentError.code) {
        case "FST_JWT_AUTHORIZATION_TOKEN_INVALID":
        case "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED":
          logout();
          break;

        case "FST_JWT_NO_AUTHORIZATION_IN_COOKIE":
          logout();
          break;
      }

      throw new Error(sentError.message);
    }
  }
}

const api = {
  get: wrapGet(axios.get),
  post: wrapPost(axios.post),
  put: wrapPost(axios.put),
  delete: wrapGet(axios.delete),
}

export default api;
