import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import confetti from 'canvas-confetti';
import { Minus, Plus, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PLAYERS = [
    { id: 'u1', name: 'Martin', color: '#e8a020', wins: 3, totalPoints: 450 },
    { id: 'u2', name: 'Pavel', color: '#2563eb', wins: 1, totalPoints: 180 },
    { id: 'u3', name: 'Tomáš', color: '#16a34a', wins: 2, totalPoints: 320 },
    { id: 'u4', name: 'Lucie', color: '#dc2626', wins: 0, totalPoints: 95 },
];

type Player = (typeof PLAYERS)[number];

const GamePage = () => {
    const navigate = useNavigate();
    const { leagueId, tournamentId } = useParams();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') ?? '501';

    const [scores, setScores] = useState<Record<string, number>>(() =>
        Object.fromEntries(PLAYERS.map((p) => [p.id, 0])),
    );
    const [winner, setWinner] = useState<Player | null>(null);
    const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const adjust = (playerId: string, delta: 1 | -1) => {
        setScores((prev) => ({
            ...prev,
            [playerId]: Math.max(0, (prev[playerId] ?? 0) + delta),
        }));
    };

    const handleEvaluate = () => {
        const top = PLAYERS.reduce((best, p) =>
            (scores[p.id] ?? 0) > (scores[best.id] ?? 0) ? p : best,
        );
        setWinner(top);
    };

    const handleBack = () => {
        navigate(`/leagues/${leagueId}/tournaments/${tournamentId}`);
    };

    useEffect(() => {
        if (!winner) return;

        const fire = () =>
            confetti({
                particleCount: 130,
                spread: 80,
                origin: { y: 0.55 },
                colors: ['#e8a020', '#f5c842', '#d4a017', '#ffffff', '#fef3c7'],
            });

        fire();
        confettiTimer.current = setTimeout(fire, 450);

        return () => {
            if (confettiTimer.current) clearTimeout(confettiTimer.current);
        };
    }, [winner]);

    return (
        <>
            <main className="h-dvh flex flex-col overflow-hidden">
                <header className="shrink-0 bg-background border-b border-border px-4 py-3 flex items-center gap-2">
                    <h1 className="flex-1 text-xl font-black uppercase tracking-widest text-foreground text-center">
                        {mode}
                    </h1>

                    <div className="flex items-center gap-2 shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBack}
                            className="h-9 px-3 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
                        >
                            Zrušit
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleEvaluate}
                            className="h-9 px-3 text-[10px] font-black uppercase tracking-[0.15em]"
                        >
                            Vyhodnotit
                        </Button>
                    </div>
                </header>

                <div
                    className="flex-1 min-h-0 p-3 gap-3"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: PLAYERS.length > 4 ? 'repeat(2, 1fr)' : '1fr',
                        gridTemplateRows: `repeat(${Math.ceil(PLAYERS.length / (PLAYERS.length > 4 ? 2 : 1))}, 1fr)`,
                    }}
                >
                    {PLAYERS.map((player) => {
                        const score = scores[player.id] ?? 0;
                        return (
                            <div
                                key={player.id}
                                className="relative overflow-hidden flex flex-col min-h-0"
                                style={{ backgroundColor: player.color }}
                            >
                                <div className="absolute inset-0 bg-black/65" />

                                <div className="relative z-10 flex flex-col h-full px-3 py-2">
                                    <p className="text-[9px] uppercase tracking-[0.16em] text-white/60 font-bold shrink-0">
                                        {player.name}
                                    </p>

                                    <div className="flex-1 flex items-center justify-center">
                                        <span className="text-5xl font-black tabular-nums text-white leading-none">
                                            {score}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 shrink-0 mb-2">
                                        <button
                                            onClick={() => adjust(player.id, -1)}
                                            disabled={score === 0}
                                            className="flex-1 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-150 text-white active:bg-white/30"
                                            aria-label={`Odebrat bod — ${player.name}`}
                                        >
                                            <Minus size={18} strokeWidth={2.5} />
                                        </button>
                                        <button
                                            onClick={() => adjust(player.id, 1)}
                                            className="flex-1 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors duration-150 text-white active:bg-white/40"
                                            aria-label={`Přidat bod — ${player.name}`}
                                        >
                                            <Plus size={18} strokeWidth={2.5} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between shrink-0 pt-2 border-t border-white/15">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-black tabular-nums text-white/70 leading-none">
                                                {player.wins}
                                            </span>
                                            <span className="text-[8px] uppercase tracking-[0.12em] text-white/35">
                                                výher
                                            </span>
                                        </div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-2xl font-black tabular-nums text-white leading-none">
                                                {player.totalPoints}
                                            </span>
                                            <span className="text-[8px] uppercase tracking-[0.12em] text-white/55">
                                                bodů
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {winner && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-6 text-center px-8">
                        <Trophy
                            size={52}
                            className="text-primary"
                            strokeWidth={1.5}
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                Vítěz hry
                            </p>
                            <h2 className="text-4xl font-black uppercase tracking-widest text-foreground">
                                {winner.name}
                            </h2>
                            <p className="text-3xl font-black tabular-nums text-primary">
                                {scores[winner.id]} b
                            </p>
                        </div>
                        <Button
                            onClick={handleBack}
                            className="h-12 px-10 font-black uppercase tracking-[0.2em]"
                        >
                            Pokračovat
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default GamePage;
