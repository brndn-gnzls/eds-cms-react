import React from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Redirect to login page if no token is found.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Protected components.
    return children;
}

export default ProtectedRoute;