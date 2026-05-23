import { useGetTournamentDetail } from '@/api/generated/tournaments/tournaments';
import { useGetLeague } from '@/api/generated/leagues/leagues';
import { useAuth } from '@/contexts/AuthContext';

export const useTournamentDetail = (tournamentId: string, leagueId: string) => {
    const { user } = useAuth();
    const { data, isLoading: tournamentLoading } = useGetTournamentDetail(tournamentId);
    const { data: league, isLoading: leagueLoading } = useGetLeague(leagueId);

    const isAdmin = !!(user?.id && league?.adminId && league.adminId === user.id);

    return {
        tournament: data,
        games: data?.games ?? [],
        leaderboard: data?.leaderboard ?? [],
        isAdmin,
        isLoading: tournamentLoading || leagueLoading,
    };
};
