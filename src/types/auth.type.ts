export interface AuthResponse {
    username?: string;
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
