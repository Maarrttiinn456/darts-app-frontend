import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PLAYER_COLORS } from '@/constants/player';
import { useRegister } from '@/hooks/useRegister';

const schema = z.object({
    username: z.string().min(2, 'Uživatelské jméno musí mít alespoň 2 znaky.'),
    email: z.email('Zadej platnou e-mailovou adresu.'),
    password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků.'),
    color: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

const RegisterForm = () => {
    const [selectedColor, setSelectedColor] = useState<string>('#d97706');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            color: '#d97706',
        },
    });

    const { mutate: submitRegister, isPending, serverError } = useRegister();

    const handleFormSubmit = (data: Schema) => submitRegister(data);

    return (
        <form
            noValidate
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
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
                    {...register('username')}
                />
                {errors.username && (
                    <p className="text-destructive text-[11px]">
                        {errors.username.message}
                    </p>
                )}
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
                    {...register('email')}
                />
                {errors.email && (
                    <p className="text-destructive text-[11px]">
                        {errors.email.message}
                    </p>
                )}
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
                    {...register('password')}
                />
                {errors.password && (
                    <p className="text-destructive text-[11px]">
                        {errors.password.message}
                    </p>
                )}
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
                            onClick={() => {
                                setSelectedColor(color);
                                setValue('color', color);
                            }}
                            style={{
                                backgroundColor: color,
                                boxShadow:
                                    selectedColor === color
                                        ? '0 0 0 2px oklch(0.12 0.012 50), 0 0 0 4px oklch(0.93 0.008 75)'
                                        : undefined,
                            }}
                            className={cn(
                                'aspect-square w-full transition-all duration-150',
                                selectedColor !== color &&
                                    'opacity-50 hover:opacity-80',
                            )}
                            aria-label={color}
                            aria-pressed={selectedColor === color}
                        />
                    ))}
                </div>
            </div>

            {serverError && (
                <p className="text-destructive text-md text-center">
                    {serverError}
                </p>
            )}

            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 font-black text-sm tracking-[0.22em] uppercase mt-1"
            >
                {isPending ? 'Registruji...' : 'Zaregistrovat se'}
            </Button>
        </form>
    );
};

export default RegisterForm;
