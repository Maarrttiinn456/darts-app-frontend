import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { getServerErrorMessage } from '@/lib/errors';
import { login } from '@/api/auth';
import { setAccessToken } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import type { paths } from '@/types/api';

type LoginBody =
    paths['/api/auth/login']['post']['requestBody']['content']['application/json'];

export const useLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: LoginBody) => login(data),
        onSuccess: (data) => {
            if (data.accessToken) setAccessToken(data.accessToken);
            if (data.user) setUser(data.user);
            navigate('/leagues');
        },
    });

    const serverError = getServerErrorMessage(error);

    return { mutate, isPending, serverError };
};
