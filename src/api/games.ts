import { api } from '@/lib/api';
import type { components, paths } from '@/types/api';

type CreateGameBody = paths['/api/tournaments/{tournamentId}/games']['post']['requestBody']['content']['application/json'];
type UpdateScoreBody = paths['/api/games/{gameId}/scores/{userId}']['patch']['requestBody']['content']['application/json'];

export const getGames = async (tournamentId: string): Promise<components['schemas']['Game'][]> => {
    const res = await api.get<components['schemas']['Game'][]>(`/api/tournaments/${tournamentId}/games`);
    return res.data;
};

export const createGame = async (tournamentId: string, body: CreateGameBody): Promise<components['schemas']['Game']> => {
    const res = await api.post<components['schemas']['Game']>(`/api/tournaments/${tournamentId}/games`, body);
    return res.data;
};

export const getGame = async (gameId: string): Promise<components['schemas']['Game']> => {
    const res = await api.get<components['schemas']['Game']>(`/api/games/${gameId}`);
    return res.data;
};

export const finishGame = async (gameId: string): Promise<components['schemas']['Game']> => {
    const res = await api.patch<components['schemas']['Game']>(`/api/games/${gameId}/finish`);
    return res.data;
};

export const getScores = async (gameId: string): Promise<components['schemas']['GameScore'][]> => {
    const res = await api.get<components['schemas']['GameScore'][]>(`/api/games/${gameId}/scores`);
    return res.data;
};

export const updateScore = async (gameId: string, userId: string, body: UpdateScoreBody): Promise<components['schemas']['GameScore']> => {
    const res = await api.patch<components['schemas']['GameScore']>(`/api/games/${gameId}/scores/${userId}`, body);
    return res.data;
};
