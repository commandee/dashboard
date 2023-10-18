import api from "./api";

export type Commanda = {
  id: string;
  costumer: string;
  table?: number | null;
}

export async function getAll() {
  const response = await api.get<Commanda[]>("/commanda", { withCredentials: true });
  return response.data;
}

export async function getById(id: string) {
  const response = await api.get<Commanda>(`/commanda/${id}`, { withCredentials: true });
  return response.data;
}
