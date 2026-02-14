// Token Utility Functions
// Handles JWT-like token creation, verification, and localStorage persistence.
// Concepts: Generic Functions, Type Assertions, Error Handling, JSON Parsing
const JWT_SECRET = "my-secret-key"
import { AuthToken, TokenPayload } from "./auth.types"
import { STORAGE_KEYS, TOKEN_CONFIG } from "./auth.constants"

export function generateToken(payload: TokenPayload): AuthToken {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    const body = btoa(JSON.stringify(payload))
    const signature = btoa(JWT_SECRET + body)
    const accessToken = `${header}.${body}.${signature}`
    const refreshSignature = btoa(JWT_SECRET + "refresh" + body);
    const refreshToken = `${header}.${body}.${refreshSignature}`;
    const expiresAt = Date.now() + TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY
    return {
        accessToken,
        refreshToken,
        expiresAt
    }
}

export function decodeToken(token: string): TokenPayload | null {
    try {
        const parts = token.split('.')
        if (parts.length !== 3) return null

        const payload = JSON.parse(atob(parts[1]))
        return payload as TokenPayload
    } catch {
        return null
    }
}

export function isTokenExpired(token: AuthToken): boolean {
    if (token.expiresAt) {
        return Date.now() > token.expiresAt;
    } else {
        return false
    }
}

export function verifyToken(token: string): TokenPayload | null {
    const decodedToken: TokenPayload | null = decodeToken(token);
    if (!decodedToken) { return null }
    if (decodedToken.exp && Date.now() > decodedToken.exp) { return null }
    return decodedToken
}

export function saveTokens(token: AuthToken): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token.accessToken)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token.refreshToken)
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, token.expiresAt.toString())
}

export function getStoredTokens(): AuthToken | null {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    const tokenExpiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY)
    if (!accessToken || !refreshToken || !tokenExpiry) return null
    return {
        accessToken,
        refreshToken,
        expiresAt: Number(tokenExpiry)
    }
}

export function clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY)
}

