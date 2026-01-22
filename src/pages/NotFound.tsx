import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h2>404 - Not Found</h2>
      <Link to="/" style={{ color: "#1b5cff", textDecoration: "none" }}>
        Go Home
      </Link>
    </div>
  );
}
