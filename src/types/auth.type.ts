export interface AuthResponse {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    token?: string;
    message?: string;
}

export interface AuthError {
    message?: string;
    status?: number;
    response?: {
        data?: string;
    };
}
