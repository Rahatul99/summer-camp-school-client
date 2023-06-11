import { Navigate, useLocation } from "react-router";
import { SyncLoader } from 'react-spinners';
import useAuth from "../Components/Hooks/useAuth";
import useInstructor from "../Components/Hooks/useInstructor";


const InstructorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || isInstructorLoading) {
        return (<div className="flex items-center justify-center h-screen">
            <SyncLoader color="#36d7b7" />
        </div>)
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default InstructorRoute;