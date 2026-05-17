import { Outlet } from 'react-router';

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-sm mx-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
