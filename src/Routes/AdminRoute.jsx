import { Navigate, useLocation } from "react-router";
import useAuth from "../Components/Hooks/useAuth";
import useAdmin from "../Components/Hooks/useAdmin";
import { SyncLoader } from 'react-spinners';


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (<div className="flex items-center justify-center h-screen">
            <SyncLoader color="#36d7b7" />
        </div>)
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;