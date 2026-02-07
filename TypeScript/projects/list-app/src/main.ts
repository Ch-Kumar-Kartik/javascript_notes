import './style.css'
import { addItem, clearAll, renderList } from './components/list'
import { initAuth } from './auth/authLogin'

const itemInput = document.getElementById('item-input') as HTMLInputElement
const addBtn = document.getElementById('add-btn')
const clearAllBtn = document.getElementById('clear-all-btn')

function handleAddClick(): void {
    const text = itemInput.value
    if (text?.trim()) {
        addItem(text)
    }
    itemInput.value = ''
    itemInput.focus()
}

function handleInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
        event.preventDefault()
        handleAddClick()
    }
}

function handleClearAll(): void {
    clearAll()
}

function initApp(): void {
    // Attach event listeners directly
    addBtn?.addEventListener('click', handleAddClick)
    itemInput?.addEventListener('keydown', handleInputKeydown)
    clearAllBtn?.addEventListener('click', handleClearAll)

    // Render initial list
    renderList()

    // Focus input
    itemInput?.focus()
}

// Initialize authentication (will show app if already logged in)
initAuth()
initApp()
