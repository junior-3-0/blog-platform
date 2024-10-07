import { Navigate } from "react-router-dom";

export function RequestAuth2({ children }) {
  const jwt = JSON.parse(localStorage.getItem("user"))?.user?.token;
  if (!jwt) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}
