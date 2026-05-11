import { api } from '@/lib/api';
import type { components, paths } from '@/types/api';

type RegisterBody = paths['/api/auth/register']['post']['requestBody']['content']['application/json'];
type LoginBody = paths['/api/auth/login']['post']['requestBody']['content']['application/json'];
type AuthResponse = { token?: string; user?: components['schemas']['User'] };

export const register = async (body: RegisterBody): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/api/auth/register', body);
    return res.data;
};

export const login = async (body: LoginBody): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/api/auth/login', body);
    return res.data;
};

export const getMe = async (): Promise<components['schemas']['User']> => {
    const res = await api.get<components['schemas']['User']>('/api/auth/me');
    return res.data;
};
