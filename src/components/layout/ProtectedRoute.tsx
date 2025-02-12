import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const token = useAppSelector(selectCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace={true} state={location} />;
  }

  return children;
};

export default ProtectedRoute;
