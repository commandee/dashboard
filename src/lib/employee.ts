import api from "./api";
import type { Role } from "./login";

export async function getEmployee(id: string) {
  const response = await api.get(`/user/${id}`, { withCredentials: true });

  return response.data as {
    id: string;
    email: string;
    username: string;
    role: Role
  }
}

export async function getAllEmployees() {
  const response = await api.get("/restaurant/employees", { withCredentials: true });
  return response.data as {
    id: string;
    email: string;
    username: string;
    role: Role
  }[];
}

export async function employeeCount(): Promise<number> {
  const response = await api.get("/restaurant/employee/count", { withCredentials: true });
  return Number(response.data);
}
