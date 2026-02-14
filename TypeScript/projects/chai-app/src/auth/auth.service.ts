// Auth Service
// Core authentication logic — signup, signin, signout, token refresh.
// Concepts: Async/Await, Error Handling, Discriminated Unions, Classes

// TODO: Import types from ./auth.types
// TODO: Import token utilities from ./token.utils
// TODO: Import guards from ./auth.guards
// TODO: Import AuthStore from ./auth.store
// TODO: Import constants from ./auth.constants

// TODO: Implement class AuthService:
//
//   Private members:
//   - store: AuthStore
//   - users: Map<string, User & { passwordHash: string }>  (simulated user database)
//
//   Constructor:
//   - Accept an AuthStore instance (dependency injection)
//   - Initialize empty users Map
//
//   TODO: async signup(credentials: SignupCredentials): Promise<AuthResponse>
//   - Validate credentials using guards (isValidSignupData)
//   - Check password === confirmPassword
//   - Check if email is already in use
//   - Create a new User object
//   - Generate tokens
//   - Save tokens and update store
//   - Return success AuthResponse or error AuthResponse
//
//   TODO: async signin(credentials: AuthCredentials): Promise<AuthResponse>
//   - Validate credentials using guards (isValidCredentials)
//   - Look up user by email
//   - Verify password (simulated hash comparison)
//   - Generate tokens
//   - Save tokens and update store
//   - Return success or error AuthResponse
//
//   TODO: async signout(): Promise<void>
//   - Clear tokens from storage
//   - Clear auth state in store
//
//   TODO: async refreshToken(): Promise<AuthResponse>
//   - Get stored refresh token
//   - Verify it's still valid
//   - Generate new access token
//   - Return success or error AuthResponse
//
//   TODO: async getCurrentUser(): Promise<User | null>
//   - Check for stored tokens
//   - Verify the access token
//   - Return the user from decoded token payload, or null
//
//   Private helper:
//   TODO: hashPassword(password: string): string
//   - Simple simulated hash (e.g. btoa or a basic transform)
//   - NOT for production! Just for learning TypeScript concepts
//
//   Private helper:
//   TODO: verifyPassword(password: string, hash: string): boolean
//   - Compare the password against the stored hash
