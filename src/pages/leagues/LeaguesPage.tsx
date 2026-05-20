import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import LeagueCard from '@/components/app/LeagueCard';
import { useGetLeagues } from '@/api/generated/leagues/leagues';

const LeaguesPage = () => {
    const navigate = useNavigate();
    const { data: leagues, isLoading, isError } = useGetLeagues();

    return (
        <main>

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
                            />
                        ))}
                    </div>
                )}
            </section>

        </main>
    );
};

export default LeaguesPage;
