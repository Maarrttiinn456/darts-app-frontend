import { Link } from 'react-router';
import TargetMark from '@/components/app/TargetMark';
import LoginForm from '@/components/app/LoginForm';

const LoginPage = () => {
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

                <LoginForm />

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
