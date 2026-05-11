import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import LeagueStandings, { type StandingRow } from '@/components/app/LeagueStandings';
import LeagueTournamentList, { type TournamentSummary } from '@/components/app/LeagueTournamentList';
import LeagueStatsChart, { type ChartDataPoint } from '@/components/app/LeagueStatsChart';

const LEAGUE = {
    id: '1',
    name: 'Liga u Kocoura',
    adminId: 'u1',
    createdAt: '2024-03-12T18:00:00Z',
};

const MEMBERS = [
    { id: 'u1', username: 'Jarda', color: '#e8a020' },
    { id: 'u2', username: 'Pepa', color: '#4a9e6b' },
    { id: 'u3', username: 'Honza', color: '#5b8dd9' },
    { id: 'u4', username: 'Míša', color: '#c75b5b' },
    { id: 'u5', username: 'Tomáš', color: '#8b6bd9' },
    { id: 'u6', username: 'Radek', color: '#d97a3a' },
];

const STANDINGS: StandingRow[] = [
    { userId: 'u1', points: 2840, wins: 18, winPct: 72 },
    { userId: 'u3', points: 2610, wins: 15, winPct: 65 },
    { userId: 'u2', points: 2390, wins: 12, winPct: 55 },
    { userId: 'u5', points: 2100, wins: 10, winPct: 48 },
    { userId: 'u6', points: 1870, wins: 8,  winPct: 40 },
    { userId: 'u4', points: 1540, wins: 6,  winPct: 33 },
];

const TOURNAMENTS: TournamentSummary[] = [
    { id: 't1', name: 'Jarní šampionát',  date: '2024-04-05', games: 12, winnerId: 'u1' },
    { id: 't2', name: 'Letní výzva',       date: '2024-06-20', games: 9,  winnerId: 'u3' },
    { id: 't3', name: 'Srpnový pohár',     date: '2024-08-15', games: 15, winnerId: 'u1' },
    { id: 't4', name: 'Podzimní bitva',    date: '2024-10-10', games: 11, winnerId: 'u2' },
    { id: 't5', name: 'Zimní klasika',     date: '2024-12-18', games: 8,  winnerId: 'u1' },
];

const CHART_DATA: ChartDataPoint[] = [
    { tournament: 'Jarní',    u1: 480,  u2: 390,  u3: 420,  u4: 260,  u5: 310,  u6: 290  },
    { tournament: 'Letní',    u1: 920,  u2: 780,  u3: 890,  u4: 510,  u5: 650,  u6: 560  },
    { tournament: 'Srpnový',  u1: 1380, u2: 1120, u3: 1280, u4: 820,  u5: 1020, u6: 870  },
    { tournament: 'Podzimní', u1: 1940, u2: 1580, u3: 1820, u4: 1150, u5: 1400, u6: 1220 },
    { tournament: 'Zimní',    u1: 2840, u2: 2390, u3: 2610, u4: 1540, u5: 2100, u6: 1870 },
];

const LeagueDetailPage = () => {
    const navigate = useNavigate();

    return (
        <main>
            <header className="sticky top-0 z-10 bg-background border-b border-border px-5 py-4 flex items-center gap-3">
                <button
                    onClick={() => navigate('/leagues')}
                    className="-ml-1 p-1 shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    aria-label="Zpět na seznam lig"
                >
                    <ChevronLeft size={22} />
                </button>
                <h1 className="flex-1 text-xl font-black uppercase tracking-widest text-foreground truncate">
                    {LEAGUE.name}
                </h1>
                <Button
                    className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                    onClick={() => navigate(`/leagues/${LEAGUE.id}/tournaments/new`)}
                >
                    Přidat turnaj
                </Button>
            </header>

            <LeagueStandings standings={STANDINGS} members={MEMBERS} />

            <LeagueTournamentList
                tournaments={TOURNAMENTS}
                members={MEMBERS}
                onTournamentClick={id => navigate(`/leagues/${LEAGUE.id}/tournaments/${id}`)}
            />

            <LeagueStatsChart data={CHART_DATA} members={MEMBERS} />

            <div className="h-8" />
        </main>
    );
};

export default LeagueDetailPage;
