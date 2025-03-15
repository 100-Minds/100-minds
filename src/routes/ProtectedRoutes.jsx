import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser")); // Get from sessionStorage
  const isAuthenticated = user?.id || storedUser?.id; // Check if user has an ID

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
