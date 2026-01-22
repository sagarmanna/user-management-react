import { useMemo, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import type { User, UserInput } from "../types/user";
import Spinner from "../components/ui/Spinner";
import Toast from "../components/ui/Toast";
import UsersTable from "../components/users/UsersTable";
import UserForm from "../components/users/UserForm";

export default function Home() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [editing, setEditing] = useState<User | null>(null);

  const editInitial: UserInput | undefined = useMemo(() => {
    if (!editing) return undefined;
    return { name: editing.name, email: editing.email, phone: editing.phone };
  }, [editing]);

  async function onCreate(data: UserInput) {
    await createUser(data);
  }

  async function onUpdate(data: UserInput) {
    if (!editing) return;
    const ok = await updateUser(editing.id, data);
    if (ok) setEditing(null);
  }

  async function onDelete(u: User) {
    const yes = window.confirm(`Delete ${u.name}?`);
    if (!yes) return;
    await deleteUser(u.id);
    if (editing?.id === u.id) setEditing(null);
  }

  return (
    <div className="container">
      <div className="grid">
        <div>
          {error && <Toast message={error} />}
          {loading ? (
            <Spinner />
          ) : (
            <UsersTable users={users} onEdit={setEditing} onDelete={onDelete} />
          )}
        </div>

        <div>
          {!editing ? (
            <UserForm submitText="Create" onSubmit={onCreate} />
          ) : (
            <UserForm
              initial={editInitial}
              submitText="Update"
              onSubmit={onUpdate}
              onCancel={() => setEditing(null)}
            />
          )}

          {/* ✅ Only ONE note here */}
          <p className="note">
            Note: JSONPlaceholder simulates POST/PUT/DELETE, so changes are shown in UI only.
          </p>
        </div>
      </div>
    </div>
  );
}
