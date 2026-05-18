import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLeague, getLeague, getLeagues } from '@/api/leagues';

export const useLeagues = () => {
    return useQuery({
        queryKey: ['leagues'],
        queryFn: getLeagues,
    });
};

export const useLeague = (leagueId: string) => {
    return useQuery({
        queryKey: ['league', leagueId],
        queryFn: () => getLeague(leagueId),
    });
};

export const useCreateLeague = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createLeague,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leagues'] });
        },
    });
};
