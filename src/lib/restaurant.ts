import api from "./api";
import { checkLogin, login } from "./login";

type Restaurant = {
  id: string;
  name: string;
  address: string;
}

export async function getRestaurant(id: string) {
  const response = await api.get(`/restaurant/${id}`);

  return response.data as Restaurant;
}

export async function getRestaurants() {
  const response = await api.get("/user/restaurants", { withCredentials: true });
  console.log(response.data);

  return response.data as Restaurant[];
}

export function getLastRestaurant() {
  const restaurant = localStorage["restaurant"] as string | undefined;

  console.log(restaurant);

  return restaurant;
}
