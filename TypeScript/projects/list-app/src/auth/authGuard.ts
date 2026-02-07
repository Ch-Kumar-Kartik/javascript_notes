// Auth Guard - Route Protection
import { getToken, removeToken, getCurrentUser } from './authService'

export function checkAuth(): boolean {
    const token = getToken()
    if (!token) return false

    const user = getCurrentUser()
    return user !== null
}

export function showApp(): void {
    const authPage = document.getElementById('auth-page')
    const app = document.getElementById('app')
    const userGreeting = document.getElementById('user-greeting')

    // Get current user to display greeting
    const user = getCurrentUser()

    if (authPage) authPage.classList.add('hidden')
    if (app) app.classList.remove('hidden')
    if (userGreeting && user) {
        userGreeting.textContent = `Hello, ${user.username}!`
    }
}

export function showLogin(): void {
    const authPage = document.getElementById('auth-page')
    const app = document.getElementById('app')

    if (app) app.classList.add('hidden')
    if (authPage) authPage.classList.remove('hidden')
}

export function logout(): void {
    removeToken()
    showLogin()
}
