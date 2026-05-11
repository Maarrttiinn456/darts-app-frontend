import SectionHeading from '@/components/app/SectionHeading';

export type StandingRow = {
    userId: string;
    points: number;
    wins: number;
    winPct: number;
};

type Member = {
    id: string;
    username: string;
    color?: string;
};

interface LeagueStandingsProps {
    standings: StandingRow[];
    members: Member[];
}

const LeagueStandings = ({ standings, members }: LeagueStandingsProps) => {
    const memberMap = Object.fromEntries(members.map(m => [m.id, m]));

    return (
        <section>
            <SectionHeading>Ligová tabulka</SectionHeading>
            <div className="divide-y divide-border">
                {standings.map((s, i) => {
                    const member = memberMap[s.userId];
                    return (
                        <div key={s.userId} className="px-5 py-4">
                            <div className="flex items-center gap-3">
                                <span className="w-8 shrink-0 text-2xl font-black tabular-nums text-muted-foreground">
                                    #{i + 1}
                                </span>
                                <span
                                    className="w-2.5 h-2.5 shrink-0"
                                    style={{ backgroundColor: member?.color }}
                                />
                                <span className="flex-1 text-base font-black uppercase tracking-wider text-foreground truncate">
                                    {member?.username}
                                </span>
                                <span className="text-2xl font-black tabular-nums text-foreground">
                                    {s.points.toLocaleString('cs-CZ')}
                                </span>
                            </div>
                            <p className="mt-1.5 pl-11 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                <span className="text-foreground font-black">{s.wins}</span>
                                {' výher · '}
                                <span className="text-foreground font-black">{s.winPct}%</span>
                                {' úspěšnost'}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default LeagueStandings;
