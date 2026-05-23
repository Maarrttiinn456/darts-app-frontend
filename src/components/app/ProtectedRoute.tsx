import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import PageSpinner from '@/components/app/PageSpinner';

const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <PageSpinner />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
