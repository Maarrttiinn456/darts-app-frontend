import { Routes, Route } from 'react-router';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import LeaguesPage from '@/pages/leagues/LeaguesPage';
import CreateLeaguePage from '@/pages/leagues/CreateLeaguePage';
import LeagueDetailPage from '@/pages/leagues/LeagueDetailPage';
import TournamentDetailPage from '@/pages/tournaments/TournamentDetailPage';
import GamePage from '@/pages/games/GamePage';
import AppLayout from '@/components/app/AppLayout';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<AppLayout />}>
                <Route path="/leagues" element={<LeaguesPage />} />
                <Route path="/leagues/new" element={<CreateLeaguePage />} />
                <Route
                    path="/leagues/:leagueId"
                    element={<LeagueDetailPage />}
                />
                <Route
                    path="/leagues/:leagueId/tournaments/:tournamentId"
                    element={<TournamentDetailPage />}
                />
                <Route
                    path="/leagues/:leagueId/tournaments/:tournamentId/games/:gameId"
                    element={<GamePage />}
                />
            </Route>
        </Routes>
    );
};

export default App;
