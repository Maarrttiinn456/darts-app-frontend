import { api } from '@/lib/api';
import type { components } from '@/types/api';

export const getUsers = async (): Promise<components['schemas']['User'][]> => {
    const res = await api.get<components['schemas']['User'][]>('/api/users');
    return res.data;
};
