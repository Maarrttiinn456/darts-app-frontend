import { useState } from 'react';
import { Link } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type LoginState = 'idle' | 'loading' | 'error';

const LoginPage = () => {
    const [loginState, setLoginState] = useState<LoginState>('idle');

    const handleSubmit = () => {
        setLoginState('loading');
        // TODO: replace with actual API call
        setTimeout(() => setLoginState('error'), 1500);
    };

    const isLoading = loginState === 'loading';
    const hasError = loginState === 'error';

    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-sm">

                {/* Brand */}
                <div className="mb-10">
                    <TargetMark className="text-primary mb-5" />
                    <h1 className="font-black text-5xl text-foreground uppercase tracking-[0.18em] leading-[0.9]">
                        Darts
                    </h1>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.18em] mt-3">
                        Sleduj. Hraj. Vítěz.
                    </p>
                </div>

                {/* Separator */}
                <div className="h-px bg-primary/50 mb-10" aria-hidden="true" />

                {/* Form */}
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} noValidate className="flex flex-col gap-5">

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
                            required
                            disabled={isLoading}
                            aria-invalid={hasError ? true : undefined}
                            autoComplete="email"
                            className="bg-input h-11"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="password"
                                className="text-muted-foreground text-[10px] uppercase tracking-[0.14em]"
                            >
                                Heslo
                            </Label>
                            <Link
                                to="/forgot-password"
                                className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-150"
                            >
                                Zapomenuté heslo
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                            aria-invalid={hasError ? true : undefined}
                            autoComplete="current-password"
                            className="bg-input h-11"
                        />
                    </div>

                    {hasError && (
                        <p role="alert" className="text-destructive text-sm text-center -mt-1">
                            Špatný e-mail nebo heslo.
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 font-black text-sm tracking-[0.22em] uppercase mt-1"
                    >
                        {isLoading ? 'Přihlašuji…' : 'Přihlásit se'}
                    </Button>
                </form>

                {/* Footer */}
                <p className="mt-8 text-center text-muted-foreground text-sm">
                    Nemáš účet?{' '}
                    <Link
                        to="/register"
                        className="text-foreground hover:text-primary transition-colors duration-150 underline underline-offset-4"
                    >
                        Zaregistruj se
                    </Link>
                </p>

            </div>
        </main>
    );
};

function TargetMark({ className }: { className?: string }) {
    return (
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
            {/* Dart shaft entering the bullseye from upper-right */}
            <line
                x1="21" y1="15"
                x2="31" y2="5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Dart flight — two short strokes at the tail */}
            <path
                d="M31 5 L34 3 M31 5 L33 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default LoginPage;
