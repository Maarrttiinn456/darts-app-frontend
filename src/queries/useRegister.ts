import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { getServerErrorMessage } from '@/lib/errors';
import { register as registerUser } from '@/api/auth';
import type { paths } from '@/types/api';

type RegisterBody =
    paths['/api/auth/register']['post']['requestBody']['content']['application/json'];

export const useRegister = () => {
    const navigate = useNavigate();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: RegisterBody) => registerUser(data),
        onSuccess: () => navigate('/leagues'),
    });

    const serverError = getServerErrorMessage(error);

    return { mutate, isPending, serverError };
};
