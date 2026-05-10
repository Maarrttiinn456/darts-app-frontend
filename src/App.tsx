import { Routes, Route } from 'react-router';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import LeaguesPage from '@/pages/leagues/LeaguesPage';
import CreateLeaguePage from '@/pages/leagues/CreateLeaguePage';
import AppLayout from '@/components/app/AppLayout';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<AppLayout />}>
                <Route path="/leagues" element={<LeaguesPage />} />
                <Route path="/leagues/new" element={<CreateLeaguePage />} />
            </Route>
        </Routes>
    );
};

export default App;
