import { useMemo, useState } from 'react';
import { useGetGame, useFinishGame, useDeleteGame } from '@/api/generated/games/games';
import { useGetGameScores, useUpdateScore } from '@/api/generated/scores/scores';
import { useTournamentDetail } from './useTournamentDetail';

export type GamePlayer = {
    id: string;
    name: string;
    color: string;
    points: number;
    totalPoints: number;
    wins: number;
};

export const useGame = (gameId: string, tournamentId: string) => {
    const { data: game, isLoading: gameLoading } = useGetGame(gameId);
    const { data: gameScores, isLoading: scoresLoading } = useGetGameScores(gameId);
    const { leaderboard, games, isLoading: tournamentLoading } = useTournamentDetail(tournamentId);
    const updateScore = useUpdateScore();
    const finishGame = useFinishGame();
    const deleteGame = useDeleteGame();

    const [localScores, setLocalScores] = useState<Record<string, number>>({});

    const players = useMemo<GamePlayer[]>(() => {
        if (!gameScores) return [];
        return gameScores.map((score) => {
            const lb = leaderboard.find((e) => e.userId === score.userId);
            const wins = games.filter((g) => g.winnerIds?.includes(score.userId!)).length;
            return {
                id: score.userId!,
                name: score.username ?? 'Unknown',
                color: score.color ?? '#888888',
                points: localScores[score.userId!] ?? score.points ?? 0,
                totalPoints: lb?.totalPoints ?? 0,
                wins,
            };
        });
    }, [gameScores, leaderboard, games, localScores]);

    const adjust = (userId: string, delta: 1 | -1) => {
        const current = players.find((p) => p.id === userId)?.points ?? 0;
        const next = Math.max(0, current + delta);
        setLocalScores((prev) => ({ ...prev, [userId]: next }));
        updateScore.mutate({ gameId, userId, data: { points: next } });
    };

    const evaluate = (): GamePlayer | null => {
        if (players.length === 0) return null;
        const top = players.reduce((best, p) => (p.points > best.points ? p : best));
        finishGame.mutate({ gameId, data: { winnerIds: [top.id] } });
        return top;
    };

    const cancel = (onSuccess: () => void) => {
        deleteGame.mutate({ gameId }, { onSuccess });
    };

    return {
        mode: game?.mode ?? '501',
        players,
        adjust,
        evaluate,
        cancel,
        isLoading: gameLoading || scoresLoading || tournamentLoading,
    };
};
