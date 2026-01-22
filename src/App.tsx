import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
      <Navbar />
      <AppRoutes />
    </div>
  );
}
