import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/app/PageHeader';
import NewGameModal from '@/components/app/NewGameModal';
import ConfirmDeleteDialog from '@/components/app/ConfirmDeleteDialog';
import SectionHeading from '@/components/app/SectionHeading';
import { useTournamentDetail } from '@/hooks/useTournamentDetail';
import PageSpinner from '@/components/app/PageSpinner';
import { GAME_TYPES } from '@/constants/gameModes';
import { useDeleteGame } from '@/api/generated/games/games';
import { getGetTournamentDetailQueryKey } from '@/api/generated/tournaments/tournaments';

const TournamentDetailPage = () => {
    const navigate = useNavigate();
    const { leagueId, tournamentId } = useParams();
    const queryClient = useQueryClient();
    const [newGameOpen, setNewGameOpen] = useState(false);
    const [deleteGameId, setDeleteGameId] = useState<string | null>(null);

    const { tournament, games, leaderboard, isAdmin, isLoading } = useTournamentDetail(
        tournamentId ?? '',
        leagueId ?? '',
    );

    const { mutate: deleteGame, isPending: isDeleting } = useDeleteGame({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getGetTournamentDetailQueryKey(tournamentId) });
                setDeleteGameId(null);
            },
        },
    });

    if (isLoading) {
        return <PageSpinner />;
    }

    return (
        <main>
            <PageHeader
                onBack={() => navigate(`/leagues/${leagueId}`)}
                title={tournament?.name ?? ''}
                subtitle={tournament?.date ?? undefined}
                action={
                    isAdmin ? (
                        <Button
                            onClick={() => setNewGameOpen(true)}
                            className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                        >
                            Nová hra
                        </Button>
                    ) : undefined
                }
            />

            <NewGameModal
                open={newGameOpen}
                onClose={() => setNewGameOpen(false)}
                leagueId={leagueId ?? ''}
                tournamentId={tournamentId ?? ''}
            />

            <section>
                <SectionHeading>Bodová tabulka</SectionHeading>
                <div className="pt-5 pb-4 overflow-x-auto">
                    <table className="border-collapse" style={{ tableLayout: 'auto', width: '100%' }}>
                        <thead>
                            <tr className="border-b border-border">
                                <th className="sticky left-0 z-10 bg-background text-left py-2 pr-2 w-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-medium pl-5">
                                    #
                                </th>
                                <th className="sticky left-[calc(1.25rem+1.5rem)] z-10 bg-background text-left py-2 pr-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-medium whitespace-nowrap">
                                    Hráč
                                </th>
                                {games.map(g => (
                                    <th
                                        key={g.id}
                                        className="text-center py-2 px-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-medium whitespace-nowrap"
                                    >
                                        {GAME_TYPES.find((t) => t.id === g.mode?.toLowerCase())?.label ?? g.mode}
                                    </th>
                                ))}
                                <th className="sticky right-0 z-10 bg-background text-right py-2 pl-4 pr-5 text-[10px] uppercase tracking-[0.14em] text-primary font-bold whitespace-nowrap">
                                    Celkem
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((row, idx) => {
                                const isLeader = idx === 0;
                                const stickyBg = isLeader ? 'bg-[color-mix(in_srgb,var(--color-primary)_6%,var(--color-background))]' : 'bg-background';
                                return (
                                    <tr
                                        key={row.userId}
                                        className={`border-b border-border/40 ${isLeader ? 'bg-primary/[0.06]' : ''}`}
                                    >
                                        <td className={`sticky left-0 z-10 ${stickyBg} py-3 pr-2 text-xs font-black tabular-nums pl-5 ${isLeader ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {idx + 1}
                                        </td>
                                        <td className={`sticky left-[calc(1.25rem+1.5rem)] z-10 ${stickyBg} py-3 pr-4 text-sm font-bold ${isLeader ? 'text-primary' : 'text-foreground'}`}>
                                            <span className="block max-w-[5ch] truncate">
                                                {row.username}
                                            </span>
                                        </td>
                                        {games.map(g => {
                                            const score = g.scores?.find(s => s.userId === row.userId);
                                            return (
                                                <td
                                                    key={g.id}
                                                    className="py-3 px-3 text-center text-sm tabular-nums text-foreground/70"
                                                >
                                                    {score?.points ?? '—'}
                                                </td>
                                            );
                                        })}
                                        <td className={`sticky right-0 z-10 ${stickyBg} py-3 pl-4 pr-5 text-right text-sm font-black tabular-nums ${isLeader ? 'text-primary' : 'text-foreground'}`}>
                                            {row.totalPoints}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <SectionHeading>Odehrané hry</SectionHeading>
                <div className="divide-y divide-border">
                    {games.map((game, gameIdx) => {
                        const sorted = [...(game.scores ?? [])].sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
                        return (
                            <div key={game.id} className="px-5 py-5">
                                <div className="mb-4 flex items-start justify-between gap-2">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
                                            Hra {gameIdx + 1}
                                        </p>
                                        <p className="text-xl font-black uppercase tracking-wider text-foreground">
                                            {GAME_TYPES.find((t) => t.id === game.mode?.toLowerCase())?.label ?? game.mode}
                                        </p>
                                    </div>
                                    {isAdmin && (
                                        <button
                                            onClick={() => game.id && setDeleteGameId(game.id)}
                                            className="w-8 h-8 flex items-center justify-center text-destructive/50 hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shrink-0"
                                            aria-label="Smazat hru"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    {sorted.map((score, pos) => {
                                        const isWinner = pos === 0;
                                        return (
                                            <div key={score.userId} className="flex items-center gap-3">
                                                <span className={`text-xs font-black tabular-nums w-4 shrink-0 ${isWinner ? 'text-primary' : 'text-muted-foreground'}`}>
                                                    {pos + 1}.
                                                </span>
                                                <span className={`flex-1 text-sm font-bold ${isWinner ? 'text-foreground' : 'text-foreground/70'}`}>
                                                    {score.username}
                                                </span>
                                                <span className={`text-sm tabular-nums font-black ${isWinner ? 'text-primary' : 'text-muted-foreground'}`}>
                                                    {score.points} b
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <div className="h-10" />

            <ConfirmDeleteDialog
                open={deleteGameId !== null}
                onClose={() => setDeleteGameId(null)}
                onConfirm={() => deleteGameId && deleteGame({ gameId: deleteGameId })}
                title="Smazat hru?"
                description="Tato akce je nevratná."
                isPending={isDeleting}
            />
        </main>
    );
};

export default TournamentDetailPage;
