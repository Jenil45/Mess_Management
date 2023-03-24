import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth"


const RequireAuth = ({accessRole}) => {
    const {auth} = useAuth();
    const location = useLocation()

    return (
        auth.email && (auth.role === accessRole) 
            ? <Outlet />
            : auth.email ?  <Navigate to="/unauthorized" state={{from : location}} replace/>
            : <Navigate to="/login" state={{from : location}} replace/>
    )
}

export default RequireAuth
