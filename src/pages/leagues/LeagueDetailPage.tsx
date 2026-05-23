import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useLeagueDetail } from '@/hooks/useLeagueDetail';
import { useAuth } from '@/contexts/AuthContext';
import { useDeleteTournament, getGetLeagueTournamentsQueryKey } from '@/api/generated/tournaments/tournaments';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/app/PageHeader';
import CreateTournamentModal from '@/components/app/CreateTournamentModal';
import ConfirmDeleteDialog from '@/components/app/ConfirmDeleteDialog';
import LeagueStandings from '@/components/app/LeagueStandings';
import LeagueTournamentList, { type TournamentSummary } from '@/components/app/LeagueTournamentList';
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
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { league, members, standings, tournaments, chartData } = useLeagueDetail(leagueId!);

    const isAdmin = !!(user?.id && league?.adminId && league.adminId === user.id);

    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('tabulka');
    const [deleteTournamentTarget, setDeleteTournamentTarget] = useState<TournamentSummary | null>(null);

    const { mutate: deleteTournament, isPending: isDeleting } = useDeleteTournament({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getGetLeagueTournamentsQueryKey(leagueId) });
                setDeleteTournamentTarget(null);
            },
        },
    });

    const handleCloseModal = (tournamentId?: string) => {
        setModalOpen(false);
        if (tournamentId) {
            navigate(`/leagues/${leagueId}/tournaments/${tournamentId}`);
        } else {
            navigate(`/leagues/${leagueId}`);
        }
    };

    return (
        <main>
            <div className="sticky top-0 z-10">
                <PageHeader
                    onBack={() => navigate('/leagues')}
                    title={league?.name ?? ''}
                    action={
                        isAdmin ? (
                            <Button
                                className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                                onClick={() => setModalOpen(true)}
                            >
                                Přidat turnaj
                            </Button>
                        ) : undefined
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
                onClose={handleCloseModal}
                leagueId={leagueId!}
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
                    isAdmin={isAdmin}
                    onDeleteTournament={(id) => {
                        const t = tournaments.find((t) => t.id === id) ?? null;
                        setDeleteTournamentTarget(t);
                    }}
                />
            )}

            <ConfirmDeleteDialog
                open={deleteTournamentTarget !== null}
                onClose={() => setDeleteTournamentTarget(null)}
                onConfirm={() => deleteTournamentTarget?.id && deleteTournament({ tournamentId: deleteTournamentTarget.id })}
                title={`Smazat turnaj „${deleteTournamentTarget?.name}"?`}
                description="Budou smazány i všechny hry v turnaji. Tato akce je nevratná."
                isPending={isDeleting}
            />
            {activeTab === 'statistiky' && (
                <LeagueStatsChart data={chartData} members={members} />
            )}
        </main>
    );
};

export default LeagueDetailPage;
