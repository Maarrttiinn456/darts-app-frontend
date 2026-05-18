import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLeague, getLeagues } from '@/api/leagues';

export const useLeagues = () => {
    return useQuery({
        queryKey: ['leagues'],
        queryFn: getLeagues,
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
