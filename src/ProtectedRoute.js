import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Route {...rest} element={<Element />} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;