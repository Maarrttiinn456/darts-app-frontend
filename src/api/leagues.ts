import { api } from '@/lib/api';
import type { components, paths } from '@/types/api';

type CreateLeagueBody =
    paths['/api/leagues']['post']['requestBody']['content']['application/json'];
type LeagueDetail = components['schemas']['League'] & {
    members?: components['schemas']['LeagueMember'][];
    scores?: components['schemas']['LeagueScore'][];
};

export const getLeagues = async (): Promise<
    components['schemas']['LeagueWithCount'][]
> => {
    const res =
        await api.get<components['schemas']['LeagueWithCount'][]>(
            '/api/leagues',
        );
    return res.data;
};

export const createLeague = async (
    body: CreateLeagueBody,
): Promise<components['schemas']['League']> => {
    const res = await api.post<components['schemas']['League']>(
        '/api/leagues',
        body,
    );
    return res.data;
};

export const getLeague = async (leagueId: string): Promise<LeagueDetail> => {
    const res = await api.get<LeagueDetail>(`/api/leagues/${leagueId}`);
    return res.data;
};
