export interface User {
    username: string,
    password: string
}

export interface JwtPayload {
    username: string
}

export interface LoginCredentials {
    username: string,
    password: string
}

export interface AuthResponse {
    success: boolean,
    token?: string,
    message?: string
}