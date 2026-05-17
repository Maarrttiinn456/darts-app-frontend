import { createContext, useContext, useEffect, useState } from 'react';
import type { components } from '@/types/api';
import { getMe } from '@/api/auth';
import { setAccessToken } from '@/lib/api';

type User = components['schemas']['User'];

interface AuthContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = () => {
        setAccessToken(null);
        setUser(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getMe();
                setUser(user);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
