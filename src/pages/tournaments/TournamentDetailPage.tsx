import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/app/PageHeader';
import NewGameModal from '@/components/app/NewGameModal';
import SectionHeading from '@/components/app/SectionHeading';

const TOURNAMENT = {
    id: 't1',
    name: 'Podzimní pohár',
    date: '15. 3. 2025',
};

const PLAYERS = [
    { id: 'u1', name: 'Jarda' },
    { id: 'u2', name: 'Pepa' },
    { id: 'u3', name: 'Honza' },
    { id: 'u4', name: 'Míša' },
];

const GAMES = [
    {
        id: 'g1',
        mode: '301',
        scores: [
            { userId: 'u1', points: 120 },
            { userId: 'u3', points: 90 },
            { userId: 'u2', points: 60 },
            { userId: 'u4', points: 30 },
        ],
    },
    {
        id: 'g2',
        mode: '501',
        scores: [
            { userId: 'u3', points: 180 },
            { userId: 'u1', points: 150 },
            { userId: 'u4', points: 120 },
            { userId: 'u2', points: 90 },
        ],
    },
    {
        id: 'g3',
        mode: 'Cricket',
        scores: [
            { userId: 'u1', points: 200 },
            { userId: 'u2', points: 160 },
            { userId: 'u3', points: 140 },
            { userId: 'u4', points: 100 },
        ],
    },
];

const totals = PLAYERS.map(p => ({
    userId: p.id,
    total: GAMES.reduce((sum, g) => {
        const s = g.scores.find(s => s.userId === p.id);
        return sum + (s?.points ?? 0);
    }, 0),
})).sort((a, b) => b.total - a.total);

const TournamentDetailPage = () => {
    const navigate = useNavigate();
    const { leagueId, tournamentId } = useParams();
    const [newGameOpen, setNewGameOpen] = useState(false);

    return (
        <main>
            <PageHeader
                onBack={() => navigate(`/leagues/${leagueId}`)}
                title={TOURNAMENT.name}
                subtitle={TOURNAMENT.date}
                action={
                    <Button
                        onClick={() => setNewGameOpen(true)}
                        className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                    >
                        Nová hra
                    </Button>
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
                <div className="px-5 pt-5 pb-4 overflow-x-auto -mx-0">
                    <table className="w-full min-w-[360px] border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-2 pr-3 w-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-medium">
                                    #
                                </th>
                                <th className="text-left py-2 pr-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-medium">
                                    Hráč
                                </th>
                                {GAMES.map(g => (
                                    <th
                                        key={g.id}
                                        className="text-right py-2 px-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-medium"
                                    >
                                        {g.mode}
                                    </th>
                                ))}
                                <th className="text-right py-2 pl-4 text-[10px] uppercase tracking-[0.14em] text-primary font-bold">
                                    Celkem
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {totals.map((row, idx) => {
                                const player = PLAYERS.find(p => p.id === row.userId)!;
                                const isLeader = idx === 0;
                                return (
                                    <tr
                                        key={row.userId}
                                        className={`border-b border-border/40 ${isLeader ? 'bg-primary/[0.06]' : ''}`}
                                    >
                                        <td className={`py-3 pr-3 text-xs font-black tabular-nums ${isLeader ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {idx + 1}
                                        </td>
                                        <td className={`py-3 pr-4 text-sm font-bold ${isLeader ? 'text-primary' : 'text-foreground'}`}>
                                            {player.name}
                                        </td>
                                        {GAMES.map(g => {
                                            const score = g.scores.find(s => s.userId === row.userId);
                                            return (
                                                <td
                                                    key={g.id}
                                                    className="py-3 px-3 text-right text-sm tabular-nums text-foreground/70"
                                                >
                                                    {score?.points ?? '—'}
                                                </td>
                                            );
                                        })}
                                        <td className={`py-3 pl-4 text-right text-sm font-black tabular-nums ${isLeader ? 'text-primary' : 'text-foreground'}`}>
                                            {row.total}
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
                    {GAMES.map((game, gameIdx) => {
                        const sorted = [...game.scores].sort((a, b) => b.points - a.points);
                        return (
                            <div key={game.id} className="px-5 py-5">
                                <div className="mb-4">
                                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
                                        Hra {gameIdx + 1}
                                    </p>
                                    <p className="text-xl font-black uppercase tracking-wider text-foreground">
                                        {game.mode}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    {sorted.map((score, pos) => {
                                        const player = PLAYERS.find(p => p.id === score.userId)!;
                                        const isWinner = pos === 0;
                                        return (
                                            <div key={score.userId} className="flex items-center gap-3">
                                                <span className={`text-xs font-black tabular-nums w-4 shrink-0 ${isWinner ? 'text-primary' : 'text-muted-foreground'}`}>
                                                    {pos + 1}.
                                                </span>
                                                <span className={`flex-1 text-sm font-bold ${isWinner ? 'text-foreground' : 'text-foreground/70'}`}>
                                                    {player.name}
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
        </main>
    );
};

export default TournamentDetailPage;
