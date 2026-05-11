const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <div className="px-5 py-3 border-b border-border">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            {children}
        </h2>
    </div>
);

export default SectionHeading;
