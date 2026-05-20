import { useNavigate } from 'react-router';
import { getServerErrorMessage } from '@/lib/errors';
import { setAccessToken } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useLoginUser } from '@/api/generated/auth/auth';
import type { LoginUserBody } from '@/api/generated/dartsAppAPI.schemas';

export const useLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const { mutate: loginMutate, isPending, error } = useLoginUser({
        mutation: {
            onSuccess: (data) => {
                if (data.accessToken) setAccessToken(data.accessToken);
                if (data.user) setUser(data.user);
                navigate('/leagues');
            },
        },
    });

    const mutate = (body: LoginUserBody) => loginMutate({ data: body });
    const serverError = getServerErrorMessage(error);

    return { mutate, isPending, serverError };
};
