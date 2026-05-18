import { useQuery } from '@tanstack/react-query';
import { getTournaments } from '@/api/tournaments';

export const useTournaments = (leagueId: string) => {
    return useQuery({
        queryKey: ['tournaments', leagueId],
        queryFn: () => getTournaments(leagueId),
    });
};
