import { ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export type TournamentSummary = {
    id?: string;
    name?: string;
    date?: string | null;
    games?: number;
    winnerId?: string;
};

type Member = {
    id?: string;
    username?: string;
};

interface LeagueTournamentListProps {
    tournaments: TournamentSummary[];
    members: Member[];
    onTournamentClick: (tournamentId: string) => void;
}

const LeagueTournamentList = ({ tournaments, members, onTournamentClick }: LeagueTournamentListProps) => {
    const memberMap = Object.fromEntries(members.map(m => [m.id, m]));

    if (tournaments.length === 0) {
        return (
            <section className="px-5 py-12 text-center">
                <p className="text-sm text-muted-foreground">Zatím žádné turnaje</p>
            </section>
        );
    }

    return (
        <section>
            <div className="divide-y divide-border">
                {tournaments.map(t => {
                    return (
                        <article
                            key={t.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => t.id && onTournamentClick(t.id)}
                            onKeyDown={e => e.key === 'Enter' && t.id && onTournamentClick(t.id)}
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
                                {(t.games !== undefined || t.winnerId) && (
                                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                        {t.games !== undefined && (
                                            <>
                                                <span className="text-foreground font-black">{t.games}</span>
                                                {' her · '}
                                            </>
                                        )}
                                        {'vítěz: '}
                                        <span className="text-foreground font-black">
                                            {t.winnerId ? memberMap[t.winnerId]?.username : '—'}
                                        </span>
                                    </p>
                                )}
                            </div>
                            <ChevronRight
                                size={18}
                                className="text-muted-foreground shrink-0"
                                aria-hidden="true"
                            />
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default LeagueTournamentList;
