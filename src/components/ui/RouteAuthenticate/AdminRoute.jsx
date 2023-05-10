/** @format */

import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { role, isLoggedIn } = useAuth();

  if (isLoggedIn && role === "admin") {
    return children;
  } else if (isLoggedIn && role === "student") {
    return <Navigate to={"/course-player"} />;
  } else {
    return <Navigate to={"/admin"} />;
  }
}
