import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();

    //console.log('ProtectedRoute - user:', user, 'isLoading:', isLoading);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
