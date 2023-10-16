import api from "./api";

export type Item = {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export async function getMenu() {
  const response = await api.get("/restaurant/menu", { withCredentials: true });

  return response.data as {
    id: string;
    name: string;
    price: number;
    description?: string;
  }[];
}

export async function get(id: string) {
  const response = await api.get(`/item/${id}`, { withCredentials: true });

  return response.data as {
    id: string;
    name: string; 
    price: number;
    description?: string;
  };
}
