import { api } from '@/lib/api';
import type { AxiosRequestConfig } from 'axios';

export const orvalMutator = <T>(config: AxiosRequestConfig): Promise<T> => {
    return api(config).then(({ data }) => data);
};
