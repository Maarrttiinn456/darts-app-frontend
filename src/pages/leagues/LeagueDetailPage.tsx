import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLeagueDetail } from '@/hooks/useLeagueDetail';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/app/PageHeader';
import CreateTournamentModal from '@/components/app/CreateTournamentModal';
import LeagueStandings from '@/components/app/LeagueStandings';
import LeagueTournamentList from '@/components/app/LeagueTournamentList';
import LeagueStatsChart from '@/components/app/LeagueStatsChart';

type Tab = 'tabulka' | 'turnaje' | 'statistiky';

const TABS: { id: Tab; label: string }[] = [
    { id: 'tabulka', label: 'Tabulka' },
    { id: 'turnaje', label: 'Turnaje' },
    { id: 'statistiky', label: 'Statistiky' },
];

const LeagueDetailPage = () => {
    const navigate = useNavigate();
    const { leagueId } = useParams();
    const { league, members, standings, tournaments } = useLeagueDetail(
        leagueId!,
    );

    console.log('LeagueDetailPage render', {
        league,
        members,
        standings,
        tournaments,
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('tabulka');

    return (
        <main>
            <div className="sticky top-0 z-10">
                <PageHeader
                    onBack={() => navigate('/leagues')}
                    title={league?.name ?? ''}
                    action={
                        <Button
                            className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                            onClick={() => setModalOpen(true)}
                        >
                            Přidat turnaj
                        </Button>
                    }
                />

                <nav className="bg-background flex" aria-label="Sekce ligy">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            aria-selected={activeTab === tab.id}
                            role="tab"
                            className={`flex-1 py-3 text-xs font-black uppercase tracking-[0.16em] border-b-2 transition-colors duration-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset ${
                                activeTab === tab.id
                                    ? 'text-foreground border-primary'
                                    : 'text-muted-foreground border-border hover:text-foreground/70'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <CreateTournamentModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />

            {activeTab === 'tabulka' && (
                <LeagueStandings standings={standings} members={members} />
            )}
            {activeTab === 'turnaje' && (
                <LeagueTournamentList
                    tournaments={tournaments}
                    members={members}
                    onTournamentClick={(id) =>
                        navigate(`/leagues/${leagueId}/tournaments/${id}`)
                    }
                />
            )}
            {activeTab === 'statistiky' && (
                <LeagueStatsChart data={[]} members={members} />
            )}
        </main>
    );
};

export default LeagueDetailPage;
