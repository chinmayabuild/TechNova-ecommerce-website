import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  // Admin-specific redirects
  if (isAuthenticated && role === "admin" && pathname === "/admin/login") {
    return <Navigate to="/admin/dashboard" />;
  }

  // Prevent users from accessing admin routes
  if (isAuthenticated && role === "user" && pathname.startsWith("/admin")) {
    return <Navigate to="/" />;
  }

  // Prevent unauthenticated users from accessing admin dashboard
  if (!isAuthenticated && pathname.startsWith("/admin/dashboard")) {
    return <Navigate to="/" />;
  }

  // Redirect authenticated users away from login/signup
  if (isAuthenticated && (pathname.startsWith("/login") || pathname === "/signup")) {
    return <Navigate to="/" />;
  }

  // Require login for orders page
  if (!isAuthenticated && pathname === "/orders") {
    return <Navigate to="/login" />;
  }

  // Prevent checkout with an empty cart
  if (!cartItems.length && pathname === "/checkout") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
