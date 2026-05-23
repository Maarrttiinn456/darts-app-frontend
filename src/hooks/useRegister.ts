import { useNavigate } from 'react-router';
import { getServerErrorMessage } from '@/lib/errors';
import { useRegisterUser } from '@/api/generated/auth/auth';
import type { RegisterUserBody } from '@/api/generated/dartsAppAPI.schemas';

export const useRegister = () => {
    const navigate = useNavigate();

    const { mutate: registerMutate, isPending, error } = useRegisterUser({
        mutation: {
            onSuccess: () => navigate('/leagues'),
        },
    });

    const mutate = (body: RegisterUserBody) => registerMutate({ data: body });
    const serverError = getServerErrorMessage(error);

    return { mutate, isPending, serverError };
};
