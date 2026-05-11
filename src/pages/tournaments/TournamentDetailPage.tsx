import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewGameModal from '@/components/app/NewGameModal';

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
            <header className="sticky top-0 z-10 bg-background border-b border-border px-5 py-4 flex items-center gap-3">
                <button
                    onClick={() => navigate(`/leagues/${leagueId}`)}
                    className="-ml-1 p-1 shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    aria-label="Zpět na detail ligy"
                >
                    <ChevronLeft size={22} />
                </button>
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-black uppercase tracking-widest text-foreground truncate">
                        {TOURNAMENT.name}
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {TOURNAMENT.date}
                    </p>
                </div>
                <Button
                    onClick={() => setNewGameOpen(true)}
                    className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                >
                    Nová hra
                </Button>
            </header>

            <NewGameModal
                open={newGameOpen}
                onClose={() => setNewGameOpen(false)}
                leagueId={leagueId ?? ''}
                tournamentId={tournamentId ?? ''}
            />

            <section className="px-5 pt-6 pb-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                    Bodová tabulka
                </p>
                <div className="overflow-x-auto -mx-5 px-5">
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

            <section className="px-5 pt-2 pb-10">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                    Odehrané hry
                </p>
                <div className="flex flex-col gap-3">
                    {GAMES.map((game, gameIdx) => {
                        const sorted = [...game.scores].sort((a, b) => b.points - a.points);
                        return (
                            <div key={game.id} className="bg-card border border-border p-4">
                                <div className="flex items-baseline justify-between mb-3">
                                    <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                        Hra {gameIdx + 1}
                                    </span>
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
                                        {game.mode}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {sorted.map((score, pos) => {
                                        const player = PLAYERS.find(p => p.id === score.userId)!;
                                        const isWinner = pos === 0;
                                        return (
                                            <div key={score.userId} className="flex items-center gap-3">
                                                <span className={`text-xs font-black tabular-nums w-4 shrink-0 ${isWinner ? 'text-primary' : 'text-muted-foreground'}`}>
                                                    {pos + 1}.
                                                </span>
                                                <span className={`flex-1 text-sm font-bold ${isWinner ? 'text-primary' : 'text-foreground'}`}>
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
        </main>
    );
};

export default TournamentDetailPage;
