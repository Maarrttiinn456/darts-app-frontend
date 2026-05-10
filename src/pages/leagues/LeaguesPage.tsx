import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import LeagueCard, { type LeagueWithMembers } from '@/components/app/LeagueCard';

const SAMPLE_LEAGUES: LeagueWithMembers[] = [
    {
        id: '1',
        name: 'Liga u Kocoura',
        adminId: 'u1',
        createdAt: '2024-03-12T18:00:00Z',
        members: [
            { id: 'u1', username: 'Jarda', color: '#e8a020' },
            { id: 'u2', username: 'Pepa', color: '#4a9e6b' },
            { id: 'u3', username: 'Honza', color: '#5b8dd9' },
            { id: 'u4', username: 'Míša', color: '#c75b5b' },
            { id: 'u5', username: 'Tomáš', color: '#8b6bd9' },
            { id: 'u6', username: 'Radek', color: '#d97a3a' },
        ],
    },
    {
        id: '2',
        name: 'Podzimní série 2024',
        adminId: 'u2',
        createdAt: '2024-09-01T17:30:00Z',
        members: [
            { id: 'u2', username: 'Pepa', color: '#4a9e6b' },
            { id: 'u7', username: 'Karel', color: '#d9c03a' },
            { id: 'u8', username: 'Marek', color: '#3ab8d9' },
            { id: 'u9', username: 'Lukáš', color: '#d94a8a' },
        ],
    },
    {
        id: '3',
        name: 'Zimní pohár',
        adminId: 'u3',
        createdAt: '2024-11-20T20:00:00Z',
        members: [
            { id: 'u1', username: 'Jarda', color: '#e8a020' },
            { id: 'u3', username: 'Honza', color: '#5b8dd9' },
            { id: 'u5', username: 'Tomáš', color: '#8b6bd9' },
            { id: 'u7', username: 'Karel', color: '#d9c03a' },
            { id: 'u8', username: 'Marek', color: '#3ab8d9' },
            { id: 'u9', username: 'Lukáš', color: '#d94a8a' },
            { id: 'u10', username: 'Pavel', color: '#6bd9a4' },
            { id: 'u11', username: 'Martin', color: '#d96b6b' },
        ],
    },
    {
        id: '4',
        name: 'Přátelský turnaj',
        adminId: 'u4',
        createdAt: '2025-01-15T19:00:00Z',
        members: [
            { id: 'u4', username: 'Míša', color: '#c75b5b' },
            { id: 'u6', username: 'Radek', color: '#d97a3a' },
            { id: 'u10', username: 'Pavel', color: '#6bd9a4' },
        ],
    },
];

const LeaguesPage = () => {
    const navigate = useNavigate();

    return (
        <main>

            {/* Header */}
            <header className="sticky top-0 z-10 bg-background border-b border-border px-5 py-4 flex items-center justify-between gap-4">
                <h1 className="text-2xl font-black uppercase tracking-widest text-foreground">
                    Ligy
                </h1>
                <Button
                    className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                    onClick={() => navigate('/leagues/new')}
                >
                    Přidat ligu
                </Button>
            </header>

            {/* League list */}
            <section>
                <div className="flex flex-col divide-y divide-border">
                    {SAMPLE_LEAGUES.map((league) => (
                        <LeagueCard
                            key={league.id}
                            league={league}
                            onClick={() => navigate(`/leagues/${league.id}`)}
                        />
                    ))}
                </div>
            </section>

        </main>
    );
};

export default LeaguesPage;
