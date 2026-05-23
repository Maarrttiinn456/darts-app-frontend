import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeagueCard from '@/components/app/LeagueCard';
import ConfirmDeleteDialog from '@/components/app/ConfirmDeleteDialog';
import { useGetLeagues, useDeleteLeague, getGetLeaguesQueryKey } from '@/api/generated/leagues/leagues';
import { useAuth } from '@/contexts/AuthContext';
import { logoutUser } from '@/api/generated/auth/auth';
import type { LeagueWithCount } from '@/api/generated/dartsAppAPI.schemas';

const LeaguesPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const queryClient = useQueryClient();
    const { data: leagues, isLoading, isError } = useGetLeagues();
    const [deleteTarget, setDeleteTarget] = useState<LeagueWithCount | null>(null);

    const { mutate: deleteLeague, isPending: isDeleting } = useDeleteLeague({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getGetLeaguesQueryKey() });
                setDeleteTarget(null);
            },
        },
    });

    const handleLogout = async () => {
        try { await logoutUser(); } catch { /* clear client state regardless */ }
        logout();
        navigate('/login');
    };

    return (
        <main>

            <header className="sticky top-0 z-10 bg-background border-b border-border px-5 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-widest text-foreground">
                        Ligy
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                        onClick={() => navigate('/leagues/new')}
                    >
                        Přidat ligu
                    </Button>
                    <button
                        onClick={handleLogout}
                        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shrink-0"
                        aria-label="Odhlásit se"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            <section>
                {isLoading && (
                    <p className="px-5 py-8 text-sm text-muted-foreground">Načítám ligy...</p>
                )}
                {isError && (
                    <p className="px-5 py-8 text-sm text-destructive">Nepodařilo se načíst ligy.</p>
                )}
                {leagues && (
                    <div className="flex flex-col -space-y-px">
                        {leagues.map((league) => (
                            <LeagueCard
                                key={league.id}
                                league={league}
                                onClick={() => navigate(`/leagues/${league.id}`)}
                                isAdmin={!!(user?.id && league.adminId === user.id)}
                                onDelete={() => setDeleteTarget(league)}
                            />
                        ))}
                    </div>
                )}

                <ConfirmDeleteDialog
                    open={deleteTarget !== null}
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={() => deleteTarget?.id && deleteLeague({ leagueId: deleteTarget.id })}
                    title={`Smazat ligu „${deleteTarget?.name}"?`}
                    description="Budou smazány i všechny turnaje a hry. Tato akce je nevratná."
                    isPending={isDeleting}
                />
            </section>

        </main>
    );
};

export default LeaguesPage;
