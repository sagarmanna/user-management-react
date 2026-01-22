import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container navInner">
        <Link to="/" className="brand">
          <span className="brandBadge" aria-hidden="true">👥</span>
          <span className="brandText">User Manager</span>
        </Link>

        <span style={{ fontSize: 12, opacity: 0.8 }}>
      
        </span>
      </div>
    </header>
  );
}
