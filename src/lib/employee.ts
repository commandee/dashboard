import api from "./api";
import type { User } from "./login";

export async function getEmployee(id: string) {
  const response = await api.get(`/user/${id}`);

  return response.data as {
    id: string;
    email: string;
    username: string;
  }
}

