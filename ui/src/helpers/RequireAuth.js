import React from "react";
import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "./UserHelper";

function RequireAuth() {
    if (!isAuthenticated()) {
        return <Navigate to={{
            pathname: "/login"
        }} />;
    }

    return <Outlet />;
}

export default RequireAuth