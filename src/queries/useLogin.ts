import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { getServerErrorMessage } from '@/lib/errors';
import { login } from '@/api/auth';
import type { paths } from '@/types/api';

type LoginBody =
    paths['/api/auth/login']['post']['requestBody']['content']['application/json'];

export const useLogin = () => {
    const navigate = useNavigate();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: LoginBody) => login(data),
        onSuccess: () => navigate('/leagues'),
    });

    const serverError = getServerErrorMessage(error);

    return { mutate, isPending, serverError };
};
