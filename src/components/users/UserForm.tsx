import { useEffect, useState } from "react";
import type { UserInput } from "../../types/user";

const empty: UserInput = { name: "", email: "", phone: "" };

export default function UserForm({
  initial,
  onSubmit,
  onCancel,
  submitText,
}: {
  initial?: UserInput;
  onSubmit: (data: UserInput) => Promise<void> | void;
  onCancel?: () => void;
  submitText: string;
}) {
  const [form, setForm] = useState<UserInput>(empty);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(initial ?? empty);
  }, [initial]);

  function set<K extends keyof UserInput>(key: K, value: UserInput[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
      if (!initial) setForm(empty);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card cardPad">
      <h3 className="cardTitle">{initial ? "Edit User" : "Create User"}</h3>

      <form className="formGrid" onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="field">
          <label>Email</label>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
            placeholder="name@example.com"
          />
        </div>

        <div className="field">
          <label>Phone</label>
          <input
            className="input"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            required
            placeholder="Phone number"
          />
        </div>

        <div className="actions">
          <button className="btn btnPrimary" disabled={submitting}>
            {submitting ? "Saving..." : submitText}
          </button>

          {onCancel && (
            <button className="btn btnGhost" type="button" onClick={onCancel} disabled={submitting}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
