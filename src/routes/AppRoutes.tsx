import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
