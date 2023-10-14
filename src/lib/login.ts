import type { AxiosError } from "axios";
import api from "./api";
import { writable, type Readable } from "svelte/store";
import { getEmployee } from "./employee";
import { getLastRestaurant, getRestaurant } from "./restaurant";

interface LoginData {
  email: string;
  password: string;
  restaurantId?: string;
}

export type Role = "admin" | "employee";

export interface User {
  id: string;
  email: string;
  username: string;
  restaurant?: {
    id: string;
    name: string;
    address: string;
    role: Role
  };
}

const loginData = writable<User | undefined>(undefined);

export const login = {
  subscribe: loginData.subscribe
};

login.subscribe((value) => {
  if (!value || !value.restaurant) return;

  console.log("storing", )
  localStorage.setItem("restaurant", value.restaurant.id);
});

export async function checkLogin(): Promise<boolean> {
  try {
    const userInfo = await whoAmI();
    loginData.set(userInfo);
    return true;
  } catch (err) {
    return false;
  }
}

export async function signin({ email, password, restaurantId }: LoginData) {
  try {
    if (!restaurantId)
      restaurantId = getLastRestaurant();

    const response = await api.post(
      "/user/login",
      { email, password, restaurantId },
      { withCredentials: true }
    );

    const user = response.data as {
      id: string;
      email: string;
      username: string;
    };

    loginData.set(user);
  } catch (err) {
    console.log(err);

    const error = err as any;
    throw new Error(error.response.data.message);
  }
}

export async function restaurantLogin(restaurantId: string) {
  if (!login) throw new Error("Not logged in");

  const response = await api.post(
    "/restaurant/login",
    { id: restaurantId },
    { withCredentials: true }
  );

  const user = response.data as {
    id: string;
    email: string;
    username: string;
    restaurant: {
      id: string;
      name: string;
      address: string;
      role: Role;
    };
  };

  loginData.set(user);
}

async function whoAmI() {
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

  return response.data as {
    id: string;
    email: string;
    username: string;
    restaurant?: {
      id: string;
      name: string;
      address: string;
      role: Role;
    };
  };
}
