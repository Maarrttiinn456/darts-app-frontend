import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { components } from '@/types/api';

type LeagueMember = components['schemas']['LeagueMember'];

const SAMPLE_PLAYERS: LeagueMember[] = [
    { id: '1', username: 'Jarda', color: '#e8a020' },
    { id: '2', username: 'Pepa', color: '#4a9e6b' },
    { id: '3', username: 'Honza', color: '#5b8dd9' },
    { id: '4', username: 'Míša', color: '#c75b5b' },
    { id: '5', username: 'Tomáš', color: '#8b6bd9' },
    { id: '6', username: 'Radek', color: '#d97a3a' },
    { id: '7', username: 'Karel', color: '#d9c03a' },
    { id: '8', username: 'Marek', color: '#3ab8d9' },
];

const CreateLeaguePage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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

    return (
        <main className="flex flex-col min-h-screen">

            {/* Header */}
            <header className="sticky top-0 z-10 bg-background border-b border-border px-5 py-4 flex items-center gap-4">
                <button
                    onClick={() => navigate('/leagues')}
                    aria-label="Zpět na ligy"
                    className="flex items-center justify-center w-8 h-8 -ml-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                    <ArrowLeft size={20} strokeWidth={2} />
                </button>
                <h1 className="text-2xl font-black uppercase tracking-widest text-foreground">
                    Nová liga
                </h1>
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-8 px-5 py-6 pb-28">

                {/* League name */}
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

                {/* Player selection */}
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
                        {SAMPLE_PLAYERS.map((player) => {
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
                                        className="shrink-0 w-4 h-4 rounded-full"
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

            {/* Footer */}
            <footer className="fixed bottom-0 inset-x-0 z-10 bg-background border-t border-border px-5 py-4">
                <div className="max-w-sm mx-auto">
                    <Button
                        className="w-full h-12 text-xs font-black uppercase tracking-[0.2em]"
                        disabled={!canSubmit}
                        onClick={() => navigate('/leagues')}
                    >
                        Vytvořit ligu
                    </Button>
                </div>
            </footer>

        </main>
    );
};

export default CreateLeaguePage;
