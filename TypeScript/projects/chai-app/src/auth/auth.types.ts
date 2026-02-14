// Auth Types & Interfaces
// All authentication-related types 

export const enum UserRole {
    User = "USER",
    Admin = "ADMIN"
}

export interface AuthCredentials {
    email: string,
    password: string
}

export interface SignupCredentials extends AuthCredentials {
    name: string,
    password: string
}

export interface User {
    readonly id: string,
    name: string,
    email: string,
    role: UserRole,
    createdAt: Date,
    avatarUrl?: string
}

export interface AuthToken {
    accessToken: string,
    refreshToken: string,
    expiresAt: number
}

export type AuthResponse = { success: true; user: User; token: AuthToken } | { success: false; error: AuthError }

export interface AuthError {
    code: string
    message: string
    field?: string
}

export interface AuthState {
    currentUser: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: AuthError | null
}

export interface TokenPayload {
    sub: string,
    email: string,
    role: UserRole,
    iat: number,
    exp: number
}
