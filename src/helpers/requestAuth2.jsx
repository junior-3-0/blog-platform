import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function RequestAuth2({ children }) {
  const jwt = useSelector((state) => state.signup.user.user?.token);
  if (!jwt) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}
