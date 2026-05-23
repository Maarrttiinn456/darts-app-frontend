import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUsers } from '@/api/generated/users/users';
import { useCreateLeague, getGetLeaguesQueryKey } from '@/api/generated/leagues/leagues';

const CreateLeaguePage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const queryClient = useQueryClient();
    const { data: users = [], isLoading } = useGetUsers();
    const { mutate: createLeague, isPending } = useCreateLeague();

    const togglePlayer = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const canSubmit = name.trim().length > 0 && selectedIds.size > 0;

    const handleSubmit = () => {
        createLeague(
            { data: { name, memberIds: Array.from(selectedIds) } },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: getGetLeaguesQueryKey() });
                    navigate('/leagues');
                },
            },
        );
    };

    return (
        <main className="flex flex-col min-h-screen">

            <header className="sticky top-0 z-10 bg-background border-b border-border px-5 py-4 flex items-center gap-4">
                <button
                    onClick={() => navigate('/leagues')}
                    aria-label="Zpět na ligy"
                    className="flex items-center justify-center w-11 h-11 -ml-2.5 shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <ArrowLeft size={20} strokeWidth={2} />
                </button>
                <h1 className="text-2xl font-black uppercase tracking-widest text-foreground">
                    Nová liga
                </h1>
            </header>

            <div className="flex-1 flex flex-col gap-8 px-5 py-6 pb-28">

                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="league-name"
                        className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                        Název ligy
                    </Label>
                    <Input
                        id="league-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Zimní liga 2025"
                        autoFocus
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                        <Label className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            Hráči
                        </Label>
                        {selectedIds.size > 0 && (
                            <span className="text-[10px] uppercase tracking-[0.14em] text-primary font-black">
                                {selectedIds.size} vybráno
                            </span>
                        )}
                    </div>

                    <div className="border border-border divide-y divide-border">
                        {isLoading && (
                            <p className="px-4 py-3.5 text-sm text-muted-foreground">Načítání hráčů…</p>
                        )}
                        {users.map((player) => {
                            const isSelected = selectedIds.has(player.id!);
                            return (
                                <button
                                    key={player.id}
                                    onClick={() => togglePlayer(player.id!)}
                                    aria-pressed={isSelected}
                                    className={[
                                        'flex items-center gap-3 w-full px-4 py-3.5 text-left transition-colors duration-150',
                                        isSelected ? 'bg-secondary' : 'hover:bg-accent',
                                    ].join(' ')}
                                >
                                    <span
                                        className="shrink-0 w-3 h-3"
                                        style={{ backgroundColor: player.color ?? undefined }}
                                        aria-hidden="true"
                                    />
                                    <span className="flex-1 text-sm font-medium text-foreground">
                                        {player.username}
                                    </span>
                                    {isSelected && (
                                        <Check
                                            size={15}
                                            strokeWidth={2.5}
                                            className="shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>

            <footer className="fixed bottom-0 inset-x-0 z-10 bg-background border-t border-border px-5 py-4">
                <div className="max-w-sm mx-auto">
                    <Button
                        className="w-full h-12 text-xs font-black uppercase tracking-[0.2em]"
                        disabled={!canSubmit || isPending}
                        onClick={handleSubmit}
                    >
                        Vytvořit ligu
                    </Button>
                </div>
            </footer>

        </main>
    );
};

export default CreateLeaguePage;
