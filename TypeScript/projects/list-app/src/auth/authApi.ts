// Simulated Backend for JWT Authentication
import type { AuthResponse, JwtPayload, LoginCredentials, User } from "../types/auth.ts";

const users: User[] = [];
const JWT_SECRET = "my-secret-key";

export function generateToken(payload: JwtPayload): string {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    const body = btoa(JSON.stringify(payload))
    const signature = btoa(JWT_SECRET + body)
    return `${header}.${body}.${signature}`
}

export function signup(credentials: LoginCredentials): AuthResponse {
    const { username, password } = credentials

    const existingUser: User | undefined = users.find(user => user.username === username);

    if (existingUser) {
        console.log('username already exist')
        return {
            success: false,
            message: "Username already there"
        };
    }

    users.push({
        username,
        password
    })

    const token = generateToken({ username })

    return {
        success: true,
        token: token,
        message: 'Signup successful'
    };
}

export function signin(credentials: LoginCredentials): AuthResponse {
    const { username, password } = credentials
    const matchedUser = users.find(user => user.username === username && password === password)

    if (matchedUser) {
        const token = generateToken({ username })
        return {
            success: true,
            token: token,
            message: "User found and signed in"
        }
    } else {
        return {
            success: false,
            message: "User not found, unable to sign in"
        }
    }
}