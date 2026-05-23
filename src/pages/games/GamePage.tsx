import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import confetti from 'canvas-confetti';
import { Minus, Plus, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useGame, type GamePlayer } from '@/hooks/useGame';
import PageSpinner from '@/components/app/PageSpinner';
import { GAME_TYPES } from '@/constants/gameModes';

const GamePage = () => {
    const navigate = useNavigate();
    const { leagueId, tournamentId, gameId } = useParams();

    const { mode, players, adjust, evaluate, cancel, isLoading } = useGame(gameId!, tournamentId!);
    const [winner, setWinner] = useState<GamePlayer | null>(null);
    const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleEvaluate = () => {
        const top = evaluate();
        if (top) setWinner(top);
    };

    const handleBack = () => navigate(`/leagues/${leagueId}/tournaments/${tournamentId}`);

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

    if (isLoading) {
        return (
            <main className="h-dvh flex flex-col overflow-hidden">
                <PageSpinner />
            </main>
        );
    }

    return (
        <>
            <main className="h-dvh flex flex-col overflow-hidden">
                <header className="shrink-0 bg-background border-b border-border px-4 pt-3 pb-2 flex flex-col gap-2">
                    <h1 className="w-full text-xl font-black uppercase tracking-widest text-foreground text-center">
                        {GAME_TYPES.find((g) => g.id === mode?.toLowerCase())?.label ?? mode}
                    </h1>
                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger className="flex-1 h-9 px-3 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground border border-border">
                                Zrušit
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Zrušit hru?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Hra bude smazána a nebude se počítat do výsledků turnaje.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Pokračovat v hraní</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => cancel(handleBack)}>
                                        Zrušit hru
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button
                            size="sm"
                            onClick={handleEvaluate}
                            className="flex-1 h-9 px-3 text-[10px] font-black uppercase tracking-[0.15em]"
                        >
                            Vyhodnotit
                        </Button>
                    </div>
                </header>

                <div
                    className="flex-1 min-h-0 p-3 gap-3"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: players.length > 4 ? 'repeat(2, 1fr)' : '1fr',
                        gridTemplateRows: `repeat(${Math.ceil(players.length / (players.length > 4 ? 2 : 1))}, 1fr)`,
                    }}
                >
                    {players.map((player) => (
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
                                        {player.points}
                                    </span>
                                </div>
                                <div className="flex gap-2 shrink-0 mb-2">
                                    <button
                                        onClick={() => adjust(player.id, -1)}
                                        disabled={player.points === 0}
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
                    ))}
                </div>
            </main>

            {winner && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-6 text-center px-8">
                        <Trophy size={52} className="text-primary" strokeWidth={1.5} />
                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                Vítěz hry
                            </p>
                            <h2 className="text-4xl font-black uppercase tracking-widest text-foreground">
                                {winner.name}
                            </h2>
                            <p className="text-3xl font-black tabular-nums text-primary">
                                {winner.points} b
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
