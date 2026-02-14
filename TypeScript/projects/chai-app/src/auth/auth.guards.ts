// Auth Guards & Validators
// Type guards and validation functions for authentication data.
// Concepts: Type Guards, Type Predicates, Narrowing, Assertion Functions

// TODO: Import relevant types from ./auth.types
// TODO: Import PASSWORD_RULES from ./auth.constants

// TODO: Implement isUser(value: unknown): value is User
//   - Type guard that checks if a value is a valid User object
//   - Verify all required properties exist and have correct types

// TODO: Implement isValidEmail(email: string): boolean
//   - Basic email format validation using a regex pattern

// TODO: Implement isValidPassword(password: string): boolean
//   - Check against PASSWORD_RULES (min length, uppercase, number, special char)

// TODO: Implement isValidCredentials(value: unknown): value is AuthCredentials
//   - Type guard for AuthCredentials
//   - Check that email and password are present and valid strings

// TODO: Implement isValidSignupData(value: unknown): value is SignupCredentials
//   - Type guard for SignupCredentials
//   - Verify name, email, password, confirmPassword all exist
//   - Check that password === confirmPassword

// TODO: Implement isAuthenticated(state: AuthState): boolean
//   - Check if state has a currentUser and isAuthenticated is true

// TODO: Implement isTokenPayload(value: unknown): value is TokenPayload
//   - Type guard for decoded token payloads
//   - Ensure sub, email, role, iat, exp are present and correct types

// TODO: Implement assertAuthenticated(state: AuthState): asserts state is AuthState & { currentUser: User }
//   - Assertion function that throws if not authenticated
//   - Narrows the type to guarantee currentUser is not null
