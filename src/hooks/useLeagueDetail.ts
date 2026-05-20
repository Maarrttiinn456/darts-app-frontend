import { useMemo } from 'react';
import { useGetLeague } from '@/api/generated/leagues/leagues';
import { useGetLeagueTournaments } from '@/api/generated/tournaments/tournaments';

export const useLeagueDetail = (leagueId: string) => {
    const { data: league, ...leagueQuery } = useGetLeague(leagueId);
    const { data: tournaments = [], ...tournamentsQuery } = useGetLeagueTournaments(leagueId);

    const members = league?.members ?? [];

    const standings = useMemo(() => {
        const scores = league?.scores ?? [];
        const map = new Map<string, { points: number; wins: number; total: number }>();

        for (const score of scores) {
            if (!score.userId) continue;
            const entry = map.get(score.userId) ?? { points: 0, wins: 0, total: 0 };
            entry.points += score.points ?? 0;
            if (score.gameIsFinished) {
                entry.total += 1;
                if (score.gameWinnerIds?.includes(score.userId)) entry.wins += 1;
            }
            map.set(score.userId, entry);
        }

        return Array.from(map.entries())
            .map(([userId, { points, wins, total }]) => ({
                userId,
                points,
                wins,
                winPct: total > 0 ? Math.round((wins / total) * 100) : 0,
            }))
            .sort((a, b) => b.points - a.points);
    }, [league?.scores]);

    return {
        league,
        members,
        standings,
        tournaments,
        isLoading: leagueQuery.isLoading || tournamentsQuery.isLoading,
    };
};
