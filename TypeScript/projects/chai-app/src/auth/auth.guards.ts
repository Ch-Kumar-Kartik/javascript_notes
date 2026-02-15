// Auth Guards & Validators
// Type guards and validation functions for authentication data.
// Concepts: Type Guards, Type Predicates, Narrowing, Assertion Functions
import { PASSWORD_RULES } from "./auth.constants";
import { User, AuthCredentials, SignupCredentials, AuthState, TokenPayload } from "./auth.types";

export function isUser(value: unknown): value is User {
    if (typeof value != "object" || value === null) return false;
    const obj = value as Record<string, unknown>

    return (
        typeof obj.id === "string" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        typeof obj.role === "string" &&
        obj.createdAt instanceof Date &&

        (obj.avatarUrl === undefined || typeof obj.avatarUrl === "string"))
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
    if (password.length < PASSWORD_RULES.MIN_LENGTH) return false;
    if (PASSWORD_RULES.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) return false;
    if (PASSWORD_RULES.REQUIRE_NUMBER && !/[0-9]/.test(password)) return false;
    if (PASSWORD_RULES.REQUIRE_SPECIAL_CHAR && !/[!@#$%^&*()_+\-={}|;':",./<>?]/.test(password)) return false;
    return true;
}

export function isValidCredentials(value: unknown): value is AuthCredentials {
    if (typeof value !== "object" || value === null) return false;
    const obj = value as Record<string, unknown>;
    return (
        typeof obj.email === "string" &&
        typeof obj.password === "string" &&
        isValidEmail(obj.email)
    );
}

export function isValidSignupData(value: unknown): value is SignupCredentials {
    if (typeof value !== "object" || value === null) return false;
    const obj = value as Record<string, unknown>;
    return (
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        typeof obj.password === "string" &&
        typeof obj.confirmPassword === "string" &&
        isValidEmail(obj.email) &&
        obj.password === obj.confirmPassword
    );
}

export function isAuthenticated(state: AuthState): boolean {
    return state.isAuthenticated && state.currentUser !== null;
}

export function isTokenPayload(value: unknown): value is TokenPayload {
    if (typeof value !== "object" || value === null) return false;
    const obj = value as Record<string, unknown>;
    return (
        typeof obj.sub === "string" &&
        typeof obj.email === "string" &&
        typeof obj.role === "string" &&
        typeof obj.iat === "number" &&
        typeof obj.exp === "number"
    );
}

export function assertAuthenticated(state: AuthState): asserts state is AuthState & { currentUser: User } {
    if (!state.isAuthenticated || state.currentUser === null) {
        throw new Error("User is not authenticated");
    }
}
