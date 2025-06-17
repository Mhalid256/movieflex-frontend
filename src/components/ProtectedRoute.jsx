import React from 'react';

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, requireSubscription }) => {
  const { user, isSubscribed } = useAuth();

  if (!user) {
    return <Navigate to="/signup" />;
  }

  if (requireSubscription && !isSubscribed) {
    return <Navigate to="/trailers" />;
  }

  return children;
};
