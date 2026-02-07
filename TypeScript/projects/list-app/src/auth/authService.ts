// JWT Token Management
import type { JwtPayload } from "../types/auth"
const TOKEN_KEY = 'list-app-token'

export function saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
}
export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}
export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
}
export function decodeToken(token: string): JwtPayload | null {
    try {

        const parts = token.split('.')
        if (parts.length !== 3) return null

        const payload = JSON.parse(atob(parts[1]))
        return payload as JwtPayload
    } catch {
        return null
    }
}
export function getCurrentUser(): JwtPayload | null {
    const token = getToken()
    if (!token) return null
    return decodeToken(token)
}