import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { IChildren } from "../../types";

export const ProtectedRoute = ({ children }: IChildren) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
