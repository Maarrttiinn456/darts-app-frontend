import { api } from '@/lib/api';
import type { components, paths } from '@/types/api';

type CreateTournamentBody = paths['/api/leagues/{leagueId}/tournaments']['post']['requestBody']['content']['application/json'];

export const getTournaments = async (leagueId: string): Promise<components['schemas']['Tournament'][]> => {
    const res = await api.get<components['schemas']['Tournament'][]>(`/api/leagues/${leagueId}/tournaments`);
    return res.data;
};

export const createTournament = async (leagueId: string, body: CreateTournamentBody): Promise<components['schemas']['Tournament']> => {
    const res = await api.post<components['schemas']['Tournament']>(`/api/leagues/${leagueId}/tournaments`, body);
    return res.data;
};

export const getTournament = async (tournamentId: string): Promise<components['schemas']['Tournament']> => {
    const res = await api.get<components['schemas']['Tournament']>(`/api/tournaments/${tournamentId}`);
    return res.data;
};
