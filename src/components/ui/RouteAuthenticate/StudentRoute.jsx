/** @format */

import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function StudentRoute({ children }) {
  const { role, isLoggedIn } = useAuth();

  if (isLoggedIn && role === "student") {
    return children;
  } else if (isLoggedIn && role === "admin") {
    return <Navigate to={"/admin/dashbord"} />;
  } else {
    return <Navigate to={"/"} />;
  }
}
