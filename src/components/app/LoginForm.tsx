import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/useLogin';

const schema = z.object({
    email: z.email('Zadej platnou e-mailovou adresu.'),
    password: z.string().min(1, 'Heslo nesmí být prázdné.'),
});

type Schema = z.infer<typeof schema>;

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Schema>({ resolver: zodResolver(schema) });

    const { mutate: submitLogin, isPending, serverError } = useLogin();

    const handleFormSubmit = (data: Schema) => submitLogin(data);

    return (
        <form
            noValidate
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
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
                    {...register('email')}
                />
                {errors.email && (
                    <p className="text-destructive text-[11px]">
                        {errors.email.message}
                    </p>
                )}
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
                    autoComplete="current-password"
                    className="bg-input h-11"
                    {...register('password')}
                />
                {errors.password && (
                    <p className="text-destructive text-[11px]">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {serverError && (
                <p role="alert" className="text-destructive text-sm text-center -mt-1">
                    {serverError}
                </p>
            )}

            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 font-black text-sm tracking-[0.22em] uppercase mt-1"
            >
                {isPending ? 'Přihlašuji…' : 'Přihlásit se'}
            </Button>
        </form>
    );
};

export default LoginForm;
