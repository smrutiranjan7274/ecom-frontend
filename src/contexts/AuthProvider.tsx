import { type ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user.types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const id = localStorage.getItem('id');
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token && email && id && role) {
            setUser({
                id,
                email,
                token,
                role
            });
        }
    }, []);

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem('token', user.token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('id', user.id);
        localStorage.setItem('role', user.role);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};