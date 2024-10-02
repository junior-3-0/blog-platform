import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function RequestAuth({ children }) {
  const jwt = useSelector((state) => state.signup.user.user?.token);
  if (jwt) {
    return <Navigate to="/articles" replace />;
  }
  return children;
}
