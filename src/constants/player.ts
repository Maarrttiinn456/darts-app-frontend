import {
    Target, Crosshair, Zap, Flame, Star, Crown, Trophy,
    Swords, Shield, Rocket, Skull, Gem,
    type LucideIcon,
} from 'lucide-react';

export type AvatarId =
    | 'Target' | 'Crosshair' | 'Zap' | 'Flame' | 'Star' | 'Crown'
    | 'Trophy' | 'Swords' | 'Shield' | 'Rocket' | 'Skull' | 'Gem';

export const AVATARS: { id: AvatarId; Icon: LucideIcon }[] = [
    { id: 'Target', Icon: Target },
    { id: 'Crosshair', Icon: Crosshair },
    { id: 'Zap', Icon: Zap },
    { id: 'Flame', Icon: Flame },
    { id: 'Star', Icon: Star },
    { id: 'Crown', Icon: Crown },
    { id: 'Trophy', Icon: Trophy },
    { id: 'Swords', Icon: Swords },
    { id: 'Shield', Icon: Shield },
    { id: 'Rocket', Icon: Rocket },
    { id: 'Skull', Icon: Skull },
    { id: 'Gem', Icon: Gem },
];

export const PLAYER_COLORS: string[] = [
    '#f59e0b',
    '#d97706',
    '#ef4444',
    '#f97316',
    '#3b82f6',
    '#6366f1',
    '#22c55e',
    '#10b981',
    '#8b5cf6',
    '#a855f7',
    '#ec4899',
    '#f43f5e',
    '#06b6d4',
    '#0ea5e9',
    '#64748b',
    '#78716c',
];
