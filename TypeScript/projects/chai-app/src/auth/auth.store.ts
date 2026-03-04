// Auth State Store
// Manages current auth state, session persistence, and state change notifications.
// Concepts: Classes, Generics, Callbacks, Readonly, Private members
import { User, AuthState, AuthError } from "./auth.types"
import { getStoredTokens, clearTokens, decodeToken, isTokenExpired } from "./token.utils"

type AuthStateListener = (state: AuthState) => void;

export class AuthStore {
    private state: AuthState
    private listeners: Set<AuthStateListener>;

    constructor() {
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
        }
        this.listeners = new Set()
        const storedTokens = getStoredTokens()
        if (storedTokens) {
            const payload = decodeToken(storedTokens.accessToken)
            if (payload && !isTokenExpired(storedTokens)) {
                this.state = {
                    currentUser: {
                        id: payload.sub,
                        name: payload.email.split("@")[0],
                        email: payload.email,
                        role: payload.role,
                        createdAt: new Date(payload.iat)
                    },
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                }
            } else {
                clearTokens()
            }
        }
    }

    getState(): Readonly<AuthState> {
        return this.state
    }

    subscribe(listener: AuthStateListener): () => void {
        this.listeners.add(listener)

        return () => {
            this.listeners.delete(listener);
        }
    }

    setUser(user: User): void {
        this.state = {
            currentUser: user,
            isAuthenticated: true,
            isLoading: false,
            error: null
        }
        this.notifyListeners()
    }

    private notifyListeners(): void {
        this.listeners.forEach((listener) => {
            return listener(this.state)
        })
    }

    setError(error: AuthError): void {
        this.state = { ...this.state, error: error, isLoading: false }
        this.notifyListeners();
    }

    setLoading(load: boolean): void {
        this.state = { ...this.state, isLoading: load }
        this.notifyListeners()
    }

    clearAuth(): void {
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
        }
        clearTokens()
        this.notifyListeners()
    }
}