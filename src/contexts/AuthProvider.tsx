import { type ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user.types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = localStorage.getItem('id');
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const name = localStorage.getItem('name');
        if (token && email && id && role) {
            setUser({
                id,
                email,
                token,
                role,
                name: name ?? undefined
            });
        }
        setLoading(false);
    }, []);

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem('token', user.token ?? '');
        localStorage.setItem('email', user.email ?? '');
        localStorage.setItem('id', user.id ?? '');
        localStorage.setItem('role', user.role ?? '');
        localStorage.setItem('name', user.name ?? '');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};