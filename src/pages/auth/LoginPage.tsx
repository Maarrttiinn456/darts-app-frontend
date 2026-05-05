import { Link } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-5 relative overflow-hidden">
            {/* Left accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-orange-500/40 to-transparent" />

            <div className="relative z-10 w-full max-w-[390px]">
                {/* Brand header */}
                <div className="mb-10">
                    <svg
                        className="mb-3 text-orange-500"
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <line
                            x1="20"
                            y1="4"
                            x2="4"
                            y2="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <polygon points="20,4 14,6 18,10" fill="currentColor" />
                        <circle
                            cx="7"
                            cy="17"
                            r="2.2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                        />
                    </svg>
                    <h1 className="font-black text-[3rem] text-zinc-100 uppercase tracking-[0.2em] leading-none">
                        Darts
                    </h1>
                    <p className="text-zinc-500 text-xs uppercase tracking-[0.18em] mt-1">
                        Sleduj. Hraj. Vítěz.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-zinc-900 border border-zinc-800 p-7 rounded-none">
                    <div className="mb-7">
                        <h2 className="font-black text-[1.65rem] text-zinc-100 uppercase tracking-[0.15em]">
                            Přihlášení
                        </h2>
                        <div className="mt-2 h-[2px] w-8 bg-orange-500" />
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="email"
                                className="text-zinc-500 text-[10px] uppercase tracking-[0.14em]"
                            >
                                E-mail
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tvuj@email.cz"
                                className="bg-zinc-950 rounded-none h-11"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="password"
                                className="text-zinc-500 text-[10px] uppercase tracking-[0.14em]"
                            >
                                Heslo
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-zinc-950 rounded-none h-11"
                            />
                        </div>

                        <Button className="w-full h-12 rounded-none font-black text-base tracking-[0.22em] uppercase mt-1 bg-orange-500 text-black hover:bg-orange-400">
                            Přihlásit se
                        </Button>
                    </div>
                </div>

                {/* Register link */}
                <p className="mt-5 text-center text-zinc-500 text-sm">
                    Nemáš účet?{' '}
                    <Link
                        to="/register"
                        className="text-zinc-100 hover:text-orange-500 transition-colors hover:underline underline-offset-4"
                    >
                        Zaregistruj se
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
