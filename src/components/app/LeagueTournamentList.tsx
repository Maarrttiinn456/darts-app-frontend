import { ChevronRight, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export type TournamentSummary = {
    id?: string;
    name?: string;
    date?: string | null;
    games?: number;
    winners?: { id?: string; username?: string }[] | null;
};

interface LeagueTournamentListProps {
    tournaments: TournamentSummary[];
    members?: unknown[];
    onTournamentClick: (tournamentId: string) => void;
    isAdmin?: boolean;
    onDeleteTournament?: (tournamentId: string) => void;
}

const LeagueTournamentList = ({
    tournaments,
    onTournamentClick,
    isAdmin,
    onDeleteTournament,
}: LeagueTournamentListProps) => {
    if (tournaments.length === 0) {
        return (
            <section className="px-5 py-12 text-center">
                <p className="text-sm text-muted-foreground">
                    Zatím žádné turnaje
                </p>
            </section>
        );
    }

    return (
        <section>
            <div className="divide-y divide-border">
                {tournaments.map((t) => {
                    return (
                        <article
                            key={t.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => t.id && onTournamentClick(t.id)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' &&
                                t.id &&
                                onTournamentClick(t.id)
                            }
                            className="px-5 py-4 flex items-center gap-4 hover:bg-secondary transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            aria-label={`Turnaj ${t.name}`}
                        >
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-black uppercase tracking-wider text-foreground truncate">
                                    {t.name}
                                </h3>
                                <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                    {t.date ? formatDate(t.date) : '—'}
                                </p>
                                {(t.games !== undefined ||
                                    (t.winners && t.winners.length > 0)) && (
                                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                        {t.games !== undefined && (
                                            <>
                                                <span className="text-foreground font-black">
                                                    {t.games}
                                                </span>
                                                {' her · '}
                                            </>
                                        )}
                                        {t.winners && t.winners.length > 0 && (
                                            <>
                                                {'vítěz: '}
                                                <span className="text-foreground font-black">
                                                    {t.winners
                                                        .map((w) => w.username)
                                                        .join(', ')}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                {isAdmin && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); t.id && onDeleteTournament?.(t.id); }}
                                        onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter') t.id && onDeleteTournament?.(t.id); }}
                                        className="w-8 h-8 flex items-center justify-center text-destructive/50 hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        aria-label="Smazat turnaj"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                                <ChevronRight
                                    size={18}
                                    className="text-muted-foreground"
                                    aria-hidden="true"
                                />
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default LeagueTournamentList;
