import { useNavigate } from 'react-router';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { GAME_TYPES } from '@/constants/gameModes';
import { useCreateGame } from '@/api/generated/games/games';

type Props = {
    open: boolean;
    onClose: () => void;
    leagueId: string;
    tournamentId: string;
};

const NewGameModal = ({ open, onClose, leagueId, tournamentId }: Props) => {
    const navigate = useNavigate();
    const { mutate: createGame, isPending } = useCreateGame();

    const handleSelect = (mode: string) => {
        createGame(
            { tournamentId, data: { mode } },
            {
                onSuccess: (game) => {
                    onClose();
                    navigate(`/leagues/${leagueId}/tournaments/${tournamentId}/games/${game.id}`);
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="rounded-none border-border p-0 gap-0" showCloseButton={false}>
                <DialogHeader className="px-5 pt-5 pb-4 border-b border-border">
                    <DialogTitle className="text-lg font-black uppercase tracking-widest text-foreground">
                        Nová hra
                    </DialogTitle>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        Vyber herní mód
                    </p>
                </DialogHeader>

                <div className="flex flex-col overflow-y-auto max-h-[60vh]">
                    {GAME_TYPES.map((mode, i) => (
                        <button
                            key={mode.id}
                            onClick={() => handleSelect(mode.id)}
                            disabled={isPending}
                            className={`w-full flex items-center justify-between px-5 py-5 hover:bg-primary/[0.06] active:bg-primary/10 transition-colors duration-150 text-left group disabled:opacity-50 disabled:pointer-events-none ${i < GAME_TYPES.length - 1 ? 'border-b border-border' : ''}`}
                        >
                            <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors duration-150 leading-none">
                                {mode.label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="px-5 py-3 border-t border-border">
                    <button
                        onClick={onClose}
                        className="w-full text-center text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-150 py-1"
                    >
                        Zrušit
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NewGameModal;
