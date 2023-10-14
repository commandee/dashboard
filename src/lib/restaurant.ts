import api from "./api";
import { checkLogin, login } from "./login";

export async function restaurantLogin(restaurantId: string) {
  if (!login)
    throw new Error("Not logged in");

  const response = await api.post("/restaurant/login", {
    restaurantId,
  }, { withCredentials: true });

  checkLogin();
}
