import axios from 'axios';

export const getServerErrorMessage = (error: unknown): string | undefined => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.error ?? error.message;
    }
    if (error instanceof Error) return error.message;
    return undefined;
};
