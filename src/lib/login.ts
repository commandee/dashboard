import type { AxiosError } from "axios";
import api from "./api";
import { writable, type Readable } from "svelte/store";
import { getEmployee } from "./employee";
import { getLastRestaurant, getRestaurant } from "./restaurant";
import { push, replace } from "svelte-spa-router";

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

let user: User | undefined;

export const login = {
  subscribe: loginData.subscribe,
  get user() { return user }
};

login.subscribe((value) => {
  user = value;
});

login.subscribe((value) => {
  if (!value || !value.restaurant) return;

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
    const error = err as any;
    throw new Error(error.response.data.message);
  }
}

export async function logout() {
  await api.post("/user/logout", {}, { withCredentials: true });
  loginData.set(undefined);
  replace("#/login");
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
