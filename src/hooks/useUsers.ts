import { useEffect, useMemo, useState } from "react";
import { usersApi } from "../api/usersApi";
import type { User, UserInput } from "../types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const data = await usersApi.list();
      setUsers(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function createUser(input: UserInput) {
    setError(null);
    try {
      const created = await usersApi.create(input);
      // simulate local insert
      setUsers((prev) => [{ ...created, id: Date.now() }, ...prev]);
      return true;
    } catch (e: any) {
      setError(e?.message ?? "Failed to create user");
      return false;
    }
  }

  async function updateUser(id: number, input: UserInput) {
    setError(null);
    try {
      await usersApi.update(id, input);
      // simulate local update
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...input } : u)));
      return true;
    } catch (e: any) {
      setError(e?.message ?? "Failed to update user");
      return false;
    }
  }

  async function deleteUser(id: number) {
    setError(null);
    try {
      await usersApi.remove(id);
      // simulate local delete
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch (e: any) {
      setError(e?.message ?? "Failed to delete user");
      return false;
    }
  }

  const actions = useMemo(
    () => ({ fetchUsers, createUser, updateUser, deleteUser }),
    []
  );

  return { users, loading, error, ...actions };
}
