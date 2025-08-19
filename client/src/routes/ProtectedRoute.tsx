import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SpinnerComponent from "@/components/spinner";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();  
  if (loading) {
    return <SpinnerComponent />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
