// src/routes/ProtectedTeamsRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedTeamsRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext
  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser")); // Get from sessionStorage
  console.log("stored user", storedUser);
  const currentUser = user || storedUser; // Use the user from context or sessionStorage
  const isAuthenticated = currentUser?.id; // Check if the user is authenticated
  const userRole = currentUser?.role; // Get the user's role
  console.log("user role", userRole);
  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If the user is not an admin, redirect to the home page
  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If the user is an admin, render the children (i.e., the protected page)
  return children;
};

export default ProtectedTeamsRoute;
