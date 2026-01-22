import { Link } from "react-router-dom";
import type { User } from "../../types/user";

export default function UsersTable({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}) {
  return (
    <div className="card cardPad">
      <h3 className="cardTitle">Users</h3>

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: 220 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`} className="nameLink">
                    {u.name}
                  </Link>
                </td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>
                  <div className="actions">
                    <button className="btn" onClick={() => onEdit(u)}>
                      Edit
                    </button>
                    <button className="btn btnDanger" onClick={() => onDelete(u)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
