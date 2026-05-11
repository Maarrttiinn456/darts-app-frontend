import { useState } from 'react';
import { Link } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import TargetMark from '@/components/app/TargetMark';

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

export default LoginPage;
