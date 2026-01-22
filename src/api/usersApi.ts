import { request } from "./http";
import type { User, UserInput } from "../types/user";

export const usersApi = {
  list: () => request<User[]>("/users"),
  get: (id: number) => request<User>(`/users/${id}`),

  // JSONPlaceholder simulates these (not persisted)
  create: (payload: UserInput) =>
    request<User>("/users", { method: "POST", body: JSON.stringify(payload) }),

  update: (id: number, payload: UserInput) =>
    request<User>(`/users/${id}`, { method: "PUT", body: JSON.stringify(payload) }),

  remove: (id: number) =>
    request<Record<string, never>>(`/users/${id}`, { method: "DELETE" }),
};
