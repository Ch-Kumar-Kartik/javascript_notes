// Auth Service
// Core authentication logic — signup, signin, signout, token refresh.
// Concepts: Async/Await, Error Handling, Discriminated Unions, Classes
import { User, AuthCredentials, SignupCredentials, AuthResponse, AuthToken, TokenPayload, UserRole } from "./auth.types";
import { AuthStore } from "./auth.store";
import { generateToken, saveTokens, clearTokens, getStoredTokens, verifyToken, isTokenExpired, decodeToken } from "./token.utils";
import { isValidCredentials, isValidSignupData } from "./auth.guards";
import { AUTH_ERRORS } from "./auth.constants";

export class AuthService {
    private store: AuthStore
    private users: Map<string, User & { passwordHash: string }>

    constructor(store: AuthStore) {
        this.store = store
        this.users = new Map()
    }

    async signup(credentials: SignupCredentials): Promise<AuthResponse> {
        if (!isValidSignupData(credentials)) {
            return { success: false, error: { code: "INVALID_INPUT", message: AUTH_ERRORS.WEAK_PASSWORD } }
        }

        if (this.users.has(credentials.email)) {
            return { success: false, error: { code: "EMAIL_IN_USE", message: AUTH_ERRORS.EMAIL_IN_USE } }
        }

        const user: User = {
            id: crypto.randomUUID(),
            name: credentials.name,
            email: credentials.email,
            role: UserRole.User,
            createdAt: new Date()
        }

        this.users.set(user.email, { ...user, passwordHash: this.hashPassword(credentials.password) })

        const payload: TokenPayload = { sub: user.id, email: user.email, role: user.role, iat: Date.now(), exp: Date.now() + 900000 };
        const token = generateToken(payload);
        saveTokens(token);

        this.store.setUser(user);

        return { success: true, user, token };
    }

    async signin(credentials: AuthCredentials): Promise<AuthResponse> {
        if (!isValidCredentials(credentials)) {
            return { success: false, error: { code: "INVALID_INPUT", message: AUTH_ERRORS.INVALID_CREDENTIALS } }
        }

        const foundUser = this.users.get(credentials.email)
        if (!foundUser) {
            return { success: false, error: { code: "INVALID_CREDENTIALS", message: AUTH_ERRORS.INVALID_CREDENTIALS } };
        }
        if (foundUser.passwordHash === this.hashPassword(credentials.password)) {
            const payload: TokenPayload = { sub: foundUser.id, email: foundUser.email, role: foundUser.role, iat: Date.now(), exp: Date.now() + 900000 };
            const token = generateToken(payload);
            saveTokens(token);

            this.store.setUser(foundUser)

            return { success: true, user: foundUser, token }
        }

        return { success: false, error: { code: "INVALID_CREDENTIALS", message: AUTH_ERRORS.INVALID_CREDENTIALS } };
    }

    async signout(): Promise<void> {
        clearTokens()
        this.store.clearAuth()
    }

    async refreshToken(): Promise<AuthResponse> {
        const tokens = getStoredTokens()
        if (!tokens) {
            return { success: false, error: { code: "TOKEN_EXPIRED", message: AUTH_ERRORS.TOKEN_EXPIRED } };
        }
        if (tokens.accessToken && isTokenExpired(tokens)) { // token exists but is expired
            const payload = decodeToken(tokens.accessToken)
            if (payload) {
                const token = generateToken(payload)
                saveTokens(token)

                const user = this.users.get(payload.email)
                if (user) {
                    return { success: true, user, token }
                } else {
                    return { success: false, error: { code: "INVALID_CREDENTIALS", message: AUTH_ERRORS.INVALID_CREDENTIALS } }
                }
            }
        }
        return { success: false, error: { code: "TOKEN_EXPIRED", message: AUTH_ERRORS.TOKEN_EXPIRED } }
    }


    async getCurrentUSer(): Promise<User | null> {
        const tokens = getStoredTokens()
        if (!tokens) return null
        const payload = verifyToken(tokens.accessToken)
        if (!payload) return null
        const user = this.users.get(payload.email)
        return user ?? null
    }

    private hashPassword(password: string): string {
        return btoa(`salted_${password}_hashed`)
    }

    private verifyPassword(password: string, hash: string): boolean {
        return this.hashPassword(password) === hash
    }

}
