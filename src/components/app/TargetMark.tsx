const TargetMark = ({ className }: { className?: string }) => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        className={className}
        aria-hidden="true"
    >
        <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="8"  stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="3"  fill="currentColor" />
        <line
            x1="21" y1="15"
            x2="31" y2="5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M31 5 L34 3 M31 5 L33 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

export default TargetMark;
