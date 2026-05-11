import { useState } from 'react';
import { Link } from 'react-router';
import { Target, Zap, Star, Flame, Crown, Trophy, type LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import TargetMark from '@/components/app/TargetMark';

type AvatarId = 'Target' | 'Zap' | 'Star' | 'Flame' | 'Crown' | 'Trophy';

const AVATARS: { id: AvatarId; Icon: LucideIcon }[] = [
    { id: 'Target', Icon: Target },
    { id: 'Zap', Icon: Zap },
    { id: 'Star', Icon: Star },
    { id: 'Flame', Icon: Flame },
    { id: 'Crown', Icon: Crown },
    { id: 'Trophy', Icon: Trophy },
];

const PLAYER_COLORS = [
    '#d97706',
    '#ef4444',
    '#3b82f6',
    '#22c55e',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#64748b',
];

const RegisterPage = () => {
    const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>('Target');
    const [selectedColor, setSelectedColor] = useState<string>('#d97706');

    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-sm">

                <div className="mb-10">
                    <TargetMark className="text-primary mb-5" />
                    <h1 className="font-black text-5xl text-foreground uppercase tracking-[0.18em] leading-[0.9]">
                        Darts
                    </h1>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.18em] mt-3">
                        Sleduj. Hraj. Vítěz.
                    </p>
                </div>

                <div className="h-px bg-primary/50 mb-10" aria-hidden="true" />

                <form noValidate className="flex flex-col gap-5">

                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor="username"
                            className="text-muted-foreground text-[10px] uppercase tracking-[0.14em]"
                        >
                            Uživatelské jméno
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="tvůj_nick"
                            autoComplete="username"
                            className="bg-input h-11"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor="email"
                            className="text-muted-foreground text-[10px] uppercase tracking-[0.14em]"
                        >
                            E-mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="tvuj@email.cz"
                            autoComplete="email"
                            className="bg-input h-11"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor="password"
                            className="text-muted-foreground text-[10px] uppercase tracking-[0.14em]"
                        >
                            Heslo
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            className="bg-input h-11"
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-[0.14em]">
                            Avatar
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                            {AVATARS.map(({ id, Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setSelectedAvatar(id)}
                                    className={cn(
                                        'h-12 flex items-center justify-center border transition-colors duration-150',
                                        selectedAvatar === id
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : 'border-border bg-input text-muted-foreground hover:border-primary/40 hover:text-foreground'
                                    )}
                                    aria-label={id}
                                    aria-pressed={selectedAvatar === id}
                                >
                                    <Icon size={18} strokeWidth={1.75} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-[0.14em]">
                            Barva hráče
                        </span>
                        <div className="grid grid-cols-8 gap-2">
                            {PLAYER_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setSelectedColor(color)}
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: selectedColor === color
                                            ? '0 0 0 2px oklch(0.12 0.012 50), 0 0 0 4px oklch(0.93 0.008 75)'
                                            : undefined,
                                    }}
                                    className={cn(
                                        'aspect-square w-full transition-all duration-150',
                                        selectedColor !== color && 'opacity-50 hover:opacity-80'
                                    )}
                                    aria-label={color}
                                    aria-pressed={selectedColor === color}
                                />
                            ))}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 font-black text-sm tracking-[0.22em] uppercase mt-1"
                    >
                        Zaregistrovat se
                    </Button>
                </form>

                <p className="mt-8 text-center text-muted-foreground text-sm">
                    Máš účet?{' '}
                    <Link
                        to="/"
                        className="text-foreground hover:text-primary transition-colors duration-150 underline underline-offset-4"
                    >
                        Přihlás se
                    </Link>
                </p>

            </div>
        </main>
    );
};

export default RegisterPage;
