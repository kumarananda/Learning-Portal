/** @format */

import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function PublicRoute({ children }) {
  const { role, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return children;
  }

  // check role base user and navigation (admin or student)
  if (isLoggedIn) {
    if (role === "admin") {
      return <Navigate to="/admin/dashbord" />;
    } else {
      return <Navigate to="/course-player" />;
    }
  }
}
