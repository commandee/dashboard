import type { AxiosError } from "axios";
import api from "./api";
import { writable, type Readable } from "svelte/store";

interface LoginData {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  email: string;
  restaurantId?: string;
  isOwner?: boolean;
}

const loginData = writable<User | undefined>(undefined);

export const login = {
  subscribe: loginData.subscribe,
};

export async function checkLogin(): Promise<boolean> {
  try {
    const user = await whoAmI();
    loginData.set(user);
    return true;
  } catch (err) {
    return false;
  }
}

export async function signin({ email, password }: LoginData) {
  try {
    const response = await api.post(
      "/user/login",
      { email, password },
      { withCredentials: true }
    );

    checkLogin();
  } catch (err) {
    const error = err as any;
    throw new Error(error.response.data.message);
  }
}



export async function whoAmI(): Promise<User> {
  const response = await api.get("/user/whoami", { withCredentials: true });

  const message = response.data.message;

  switch (response.status) {
    case 200:
      break;
    case 400:
    case 401:
      loginData.set(undefined);
      throw new Error(message);
    case 403:
      loginData.set(undefined);
      throw new Error("Your session has expired. Please login again.");
    default:
      loginData.set(undefined);
  }

  return response.data as User;
}
