// Auth Constants & Configuration
// All auth-related magic strings, keys, and config values
// Concepts: Const Assertions, Enums, as const, Readonly objects

export const STORAGE_KEYS = {
    ACCESS_TOKEN: "chai_access_token",
    REFRESH_TOKEN: "chai_refresh_token",
    TOKEN_EXPIRY: "chai_token_expiry",
    USER: "chai_user",
} as const;

export const TOKEN_CONFIG = {
    ACCESS_TOKEN_EXPIRY: 15 * 60 * 1000,        // 15 minutes
    REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
    TOKEN_SECRET: "chai-secret-key-dev",
} as const;

export const AUTH_ERRORS = {
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_IN_USE: "An account with this email already exists",
    TOKEN_EXPIRED: "Your session has expired. Please sign in again.",
    WEAK_PASSWORD: "Password must be at least 8 characters",
    PASSWORDS_MISMATCH: "Passwords do not match",
    NETWORK_ERR: "Unable to connect. Please check your connection.",
} as const;

export const AUTH_ENDPOINTS = {
    SIGNIN: "/api/auth/signin",
    SIGNUP: "/api/auth/signup",
    SIGNOUT: "/api/auth/signout",
    REFRESH: "/api/auth/refresh",
    ME: "/api/auth/me",
} as const;

export const PASSWORD_RULES = {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
} as const;
