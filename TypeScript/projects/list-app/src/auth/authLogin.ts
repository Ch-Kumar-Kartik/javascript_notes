// Auth Login Handler - UI Event Handlers for Login Page
import { signup, signin } from './authApi'
import { saveToken } from './authService'
import { checkAuth, showApp, logout } from './authGuard'
import { renderList } from '../components/list'

// DOM Elements
let signinTab: HTMLElement | null
let signupTab: HTMLElement | null
let signinForm: HTMLFormElement | null
let signupForm: HTMLFormElement | null
let signinError: HTMLElement | null
let signupError: HTMLElement | null
let logoutBtn: HTMLElement | null

function switchToSignin(): void {
    signinTab?.classList.add('active')
    signupTab?.classList.remove('active')
    signinForm?.classList.remove('hidden')
    signupForm?.classList.add('hidden')
    clearErrors()
}

function switchToSignup(): void {
    signupTab?.classList.add('active')
    signinTab?.classList.remove('active')
    signupForm?.classList.remove('hidden')
    signinForm?.classList.add('hidden')
    clearErrors()
}

function handleSignin(event: Event): void {
    event.preventDefault()

    const usernameInput = document.getElementById('signin-username') as HTMLInputElement
    const passwordInput = document.getElementById('signin-password') as HTMLInputElement

    const username = usernameInput?.value.trim()
    const password = passwordInput?.value

    if (!username || !password) {
        showError(signinError, 'Please fill in all fields')
        return
    }

    const response = signin({ username, password })

    if (response.success && response.token) {
        saveToken(response.token)
        showApp()
        renderList()  // Render the todo list after login
    } else {
        showError(signinError, response.message || 'Sign in failed')
    }
}

function handleSignup(event: Event): void {
    event.preventDefault()

    const usernameInput = document.getElementById('signup-username') as HTMLInputElement
    const passwordInput = document.getElementById('signup-password') as HTMLInputElement
    const confirmInput = document.getElementById('signup-confirm') as HTMLInputElement

    const username = usernameInput?.value.trim()
    const password = passwordInput?.value
    const confirm = confirmInput?.value

    if (!username || !password || !confirm) {
        showError(signupError, 'Please fill in all fields')
        return
    }

    if (password !== confirm) {
        showError(signupError, 'Passwords do not match')
        return
    }

    if (username.length < 3) {
        showError(signupError, 'Username must be at least 3 characters')
        return
    }

    const response = signup({ username, password })

    if (response.success && response.token) {
        saveToken(response.token)
        showApp()
        renderList()
    } else {
        showError(signupError, response.message || 'Sign up failed')
    }
}

// Helper: Show error message
function showError(element: HTMLElement | null, message: string): void {
    if (element) {
        element.textContent = message
    }
}

// Helper: Clear all error messages
function clearErrors(): void {
    if (signinError) signinError.textContent = ''
    if (signupError) signupError.textContent = ''
}

export function initAuth(): void {
    // Get DOM elements
    signinTab = document.getElementById('signin-tab')
    signupTab = document.getElementById('signup-tab')
    signinForm = document.getElementById('signin-form') as HTMLFormElement
    signupForm = document.getElementById('signup-form') as HTMLFormElement
    signinError = document.getElementById('signin-error')
    signupError = document.getElementById('signup-error')
    logoutBtn = document.getElementById('logout-btn')

    // Add tab listeners
    signinTab?.addEventListener('click', switchToSignin)
    signupTab?.addEventListener('click', switchToSignup)

    // Add form submit listeners
    signinForm?.addEventListener('submit', handleSignin)
    signupForm?.addEventListener('submit', handleSignup)

    // Add logout listener
    logoutBtn?.addEventListener('click', logout)

    // Check if already authenticated
    if (checkAuth()) {
        showApp()
        renderList()
    } else {
        // Show login page (it's visible by default, app is hidden)
    }
}
