import { ChevronRight } from 'lucide-react';
import type { LeagueWithCount } from '@/api/generated/dartsAppAPI.schemas';
import { formatDate } from '@/lib/utils';

interface LeagueCardProps {
    league: LeagueWithCount;
    onClick?: () => void;
}

const LeagueCard = ({ league, onClick }: LeagueCardProps) => {
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

            <ChevronRight
                size={18}
                className="text-muted-foreground shrink-0"
                aria-hidden="true"
            />
        </article>
    );
};

export default LeagueCard;
