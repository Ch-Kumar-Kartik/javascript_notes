// Auth State Store
// Manages current auth state, session persistence, and state change notifications.
// Concepts: Classes, Generics, Callbacks, Readonly, Private members

// TODO: Import AuthState, User, AuthError from ./auth.types
// TODO: Import getStoredTokens, clearTokens from ./token.utils

// TODO: Create a type alias for AuthStateListener:
//   - (state: AuthState) => void

// TODO: Implement class AuthStore:
//
//   Private members:
//   - state: AuthState (initialized with default empty state)
//   - listeners: Set<AuthStateListener>
//
//   Constructor:
//   - Initialize default state: { currentUser: null, isAuthenticated: false, isLoading: false, error: null }
//   - Initialize empty listeners set
//   - Optionally attempt to restore session from stored tokens
//
//   TODO: getState(): Readonly<AuthState>
//   - Return the current auth state as readonly
//
//   TODO: subscribe(listener: AuthStateListener): () => void
//   - Add a listener to the set
//   - Return an unsubscribe function that removes the listener
//
//   TODO: setUser(user: User): void
//   - Update state with the user, set isAuthenticated to true
//   - Notify all listeners
//
//   TODO: setError(error: AuthError): void
//   - Update state with the error
//   - Notify all listeners
//
//   TODO: setLoading(isLoading: boolean): void
//   - Update the loading state
//   - Notify all listeners
//
//   TODO: clearAuth(): void
//   - Reset state to default (no user, not authenticated)
//   - Clear stored tokens
//   - Notify all listeners
//
//   Private:
//   TODO: notifyListeners(): void
//   - Iterate over all listeners and call them with current state
