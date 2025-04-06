import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser")); // Get from sessionStorage
  const isAuthenticated = user?.id || storedUser?.id; // Check if user has an ID

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ requiredRole }) => {
//   const { user } = useAuth(); // Get user from AuthContext
//   const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser")); // Get from sessionStorage
//   const currentUser = user || storedUser; // Check if we have a user from context or session storage
//   const isAuthenticated = currentUser?.id; // Check if user is authenticated
//   const userRole = currentUser?.role; // Get the role of the user

//   // If the user is not authenticated, redirect to the login page
//   if (!isAuthenticated) {
//     return <Navigate to="/signin" replace />;
//   }

//   // If the user is authenticated but does not have the required role, redirect to another page (e.g., homepage)
//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/" replace />;
//   }

//   // If the user is authenticated and has the required role, render the outlet (i.e., the protected page)
//   return <Outlet />;
// };

// export default ProtectedRoute;
