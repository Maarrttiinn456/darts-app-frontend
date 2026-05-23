import { ChevronRight, Trash2 } from 'lucide-react';
import type { LeagueWithCount } from '@/api/generated/dartsAppAPI.schemas';
import { formatDate } from '@/lib/utils';

interface LeagueCardProps {
    league: LeagueWithCount;
    onClick?: () => void;
    isAdmin?: boolean;
    onDelete?: () => void;
}

const LeagueCard = ({ league, onClick, isAdmin, onDelete }: LeagueCardProps) => {
    const memberCount = league.memberCount ?? 0;
    const date = formatDate(league.createdAt);

    return (
        <article
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            className="w-full border border-border bg-card px-5 py-4 flex items-center gap-4 hover:bg-secondary transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label={`Liga ${league.name}`}
        >
            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black uppercase tracking-wider text-foreground truncate">
                    {league.name ?? 'Bez názvu'}
                </h2>

                {date && (
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mt-0.5">
                        {date}
                    </p>
                )}

                {memberCount > 0 && (
                    <p className="mt-3 text-muted-foreground text-[10px] uppercase tracking-[0.14em]">
                        <span className="text-foreground font-black text-sm tabular-nums">
                            {memberCount}
                        </span>
                        {' '}hráčů
                    </p>
                )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
                {isAdmin && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                        onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter') onDelete?.(); }}
                        className="w-8 h-8 flex items-center justify-center text-destructive/50 hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        aria-label="Smazat ligu"
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
};

export default LeagueCard;
