import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
