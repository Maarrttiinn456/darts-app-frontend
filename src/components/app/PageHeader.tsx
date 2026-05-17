import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
    onBack: () => void;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const PageHeader = ({ onBack, title, subtitle, action }: PageHeaderProps) => (
    <header className="bg-background border-b border-border px-5 py-4 flex items-center gap-3">
        <button
            onClick={onBack}
            className="-ml-2.5 w-11 h-11 flex items-center justify-center shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label={`Zpět`}
        >
            <ChevronLeft size={22} />
        </button>
        <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black uppercase tracking-widest text-foreground truncate">
                {title}
            </h1>
            {subtitle && (
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {subtitle}
                </p>
            )}
        </div>
        {action}
    </header>
);

export default PageHeader;
