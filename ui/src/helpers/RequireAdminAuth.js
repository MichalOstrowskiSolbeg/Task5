import React from "react";
import { Navigate, Outlet } from "react-router";
import { isAdmin,  } from "./UserHelper";

function RequireAdminAuth() {
    if (!isAdmin()) {
        return <Navigate to={{
            pathname: "/"
        }} />;
    }

    return <Outlet />;
}

export default RequireAdminAuth