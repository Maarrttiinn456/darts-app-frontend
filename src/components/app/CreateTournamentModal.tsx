import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    useCreateTournament,
    getGetLeagueTournamentsQueryKey,
} from '@/api/generated/tournaments/tournaments';
import { formatTournamentName } from '@/lib/utils';

type Props = {
    open: boolean;
    onClose: (tournamentId?: string) => void;
    leagueId: string;
};

const CreateTournamentModal = ({ open, onClose, leagueId }: Props) => {
    const [name, setName] = useState(() => formatTournamentName(new Date()));
    const canSubmit = name.trim().length > 0;

    const queryClient = useQueryClient();
    const { mutate, isPending } = useCreateTournament({
        mutation: {
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: getGetLeagueTournamentsQueryKey(leagueId),
                });

                const tournamentId = data.id;

                onClose(tournamentId);
            },
        },
    });

    const handleSubmit = () => {
        mutate({
            leagueId,
            data: { name, date: new Date().toISOString().slice(0, 10) },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            <DialogContent
                className="rounded-none border-border"
                showCloseButton={false}
            >
                <DialogHeader>
                    <DialogTitle className="text-lg font-black uppercase tracking-widest text-foreground">
                        Nový turnaj
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="tournament-name"
                        className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                        Název turnaje
                    </Label>
                    <Input
                        id="tournament-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                </div>

                <DialogFooter className="rounded-none -mx-4 -mb-4 px-4 py-3 border-t border-border bg-transparent flex-row justify-end gap-2">
                    <Button
                        variant="ghost"
                        className="h-10 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Zrušit
                    </Button>
                    <Button
                        className="h-10 text-xs font-black uppercase tracking-[0.2em]"
                        disabled={!canSubmit || isPending}
                        onClick={handleSubmit}
                    >
                        {isPending ? 'Vytváření…' : 'Vytvořit turnaj'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTournamentModal;
