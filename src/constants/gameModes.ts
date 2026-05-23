export const GAME_TYPES = [
    { id: '301', label: '301' },
    { id: '301_double_in', label: '301 Double In' },
    { id: '301_double_out', label: '301 Double Out' },
    { id: '301_double_in_out', label: '301 Double In/Out' },
    { id: '501', label: '501' },
    { id: '501_double_in', label: '501 Double In' },
    { id: '501_double_out', label: '501 Double Out' },
    { id: '501_double_in_out', label: '501 Double In/Out' },
    { id: '701', label: '701' },
    { id: '701_double_in', label: '701 Double In' },
    { id: '701_double_out', label: '701 Double Out' },
    { id: '701_double_in_out', label: '701 Double In/Out' },
    { id: 'cricket', label: 'Cricket' },
    { id: 'cut_throat', label: 'Cut Throat' },
    { id: 'high_score', label: 'High Score' },
    { id: 'low_score', label: 'Low Score' },
    { id: 'roulette', label: 'Roulette' },
    { id: 'purchase', label: 'Purchase' },
    { id: 'split', label: 'Split' },
    { id: 'other', label: 'Other' },
] as const;

export type GameTypeId = (typeof GAME_TYPES)[number]['id'];
