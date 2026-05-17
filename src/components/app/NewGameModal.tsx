import { useNavigate } from 'react-router';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const MODES = [
    { id: '301', description: 'Klasická hra na nulu' },
    { id: '501', description: 'Delší hra, více šipek' },
    { id: 'Cricket', description: 'Zavírej sektory, boduj' },
] as const;

type Props = {
    open: boolean;
    onClose: () => void;
    leagueId: string;
    tournamentId: string;
};

const NewGameModal = ({ open, onClose, leagueId, tournamentId }: Props) => {
    const navigate = useNavigate();

    const handleSelect = (mode: string) => {
        onClose();
        navigate(
            `/leagues/${leagueId}/tournaments/${tournamentId}/games/preview?mode=${mode}`,
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

                <div className="flex flex-col">
                    {MODES.map((mode, i) => (
                        <button
                            key={mode.id}
                            onClick={() => handleSelect(mode.id)}
                            className={`w-full flex items-center justify-between px-5 py-5 hover:bg-primary/[0.06] active:bg-primary/10 transition-colors duration-150 text-left group ${i < MODES.length - 1 ? 'border-b border-border' : ''}`}
                        >
                            <span className="text-4xl font-black tabular-nums text-foreground group-hover:text-primary transition-colors duration-150 leading-none">
                                {mode.id}
                            </span>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-150">
                                {mode.description}
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
