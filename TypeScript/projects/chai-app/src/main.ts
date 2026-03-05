import './style.css'
import { AuthService, AuthStore, SignupCredentials } from "./auth"
import { CustomerRepository } from "./models/Repository"
import { PriceCalculator, OrderValidator, OrderManager } from "./models/OrderManager"
import { DataService } from "./services/DataService"
import { ChaiCategory, ChaiSize, PaymentMethod, OrderStatus } from "./types/enums"
import { Customer, OrderSummary } from "./types/interfaces"
import { ChaiMenuItem, InventoryItem } from "./types/aliases"

const authStore = new AuthStore()
const authService = new AuthService(authStore)
const customerRepo = new CustomerRepository()
const priceCalculator = new PriceCalculator()
const orderValidator = new OrderValidator()
const orderManager = new OrderManager(priceCalculator, orderValidator)
const dataService = new DataService()

let menuItems: ChaiMenuItem[] = []
let orders: OrderSummary[] = []
let nextCustomerId = 1

const inventory: InventoryItem[] = [
    { itemName: "Tea Leaves", stock: 500, threshold: 100 },
    { itemName: "Milk", stock: 200, threshold: 50 },
    { itemName: "Ginger", stock: 80, threshold: 20 },
    { itemName: "Cardamom", stock: 30, threshold: 10 },
    { itemName: "Lemon", stock: 45, threshold: 15 },
    { itemName: "Honey", stock: 25, threshold: 10 },
    { itemName: "Sugar", stock: 300, threshold: 50 },
    { itemName: "Spices Mix", stock: 15, threshold: 20 },
]

const paymentMap: Record<string, PaymentMethod> = {
    cash: PaymentMethod.CASH,
    card: PaymentMethod.CARD,
    upi: PaymentMethod.UPI,
}

const categoryMap: Record<string, ChaiCategory> = {
    masala: ChaiCategory.MASALA,
    ginger: ChaiCategory.GINGER,
    lemon: ChaiCategory.LEMON,
    elaichi: ChaiCategory.ELAICHI,
    adrak: ChaiCategory.ADRAK,
}


// DOM helper
const $ = (id: string): HTMLElement => document.getElementById(id)!

// ── Toast Notifications ──
function showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
    const container = $('toast-container')
    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    const icons: Record<string, string> = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }
    toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-message">${message}</span>`
    container.appendChild(toast)
    requestAnimationFrame(() => toast.classList.add('show'))
    setTimeout(() => {
        toast.classList.remove('show')
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}

// ── Modal System ──
let modalConfirmHandler: (() => void) | null = null

function openModal(title: string, bodyHTML: string, onConfirm?: () => void): void {
    $('modal-title').textContent = title
    $('modal-body').innerHTML = bodyHTML
    if (onConfirm) {
        $('modal-footer').classList.remove('hidden')
        modalConfirmHandler = onConfirm
    } else {
        $('modal-footer').classList.add('hidden')
        modalConfirmHandler = null
    }
    $('modal-overlay').classList.remove('hidden')
}

function closeModal(): void {
    $('modal-overlay').classList.add('hidden')
    $('modal-body').innerHTML = ''
    modalConfirmHandler = null
}

$('modal-close').addEventListener('click', closeModal)
$('modal-cancel').addEventListener('click', closeModal)
$('modal-confirm').addEventListener('click', () => {
    if (modalConfirmHandler) modalConfirmHandler()
    closeModal()
})
$('modal-overlay').addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'modal-overlay') closeModal()
})

function showApp(userName: string): void {
    $('auth-page').classList.add('hidden')
    $('app').classList.remove('hidden')
    $('user-greeting').textContent = `Hello, ${userName}!`
    initPages()
}

function showAuth(): void {
    $('app').classList.add('hidden')
    $('auth-page').classList.remove('hidden')
}

function checkAuth(): void {
    const state = authStore.getState()
    if (state.isAuthenticated && state.currentUser) {
        showApp(state.currentUser.name)
    }
}

// Sign In
$('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = ($('signin-email') as HTMLInputElement).value
    const password = ($('signin-password') as HTMLInputElement).value
    const errorEl = $('signin-error')

    const result = await authService.signin({ email, password })
    if (result.success) {
        errorEl.textContent = ''
        showApp(result.user.name)
        showToast(`Welcome back, ${result.user.name}!`, 'success')
    } else {
        errorEl.textContent = result.error.message
        showToast(result.error.message, 'error')
    }
})

// Sign Up
$('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = ($('signup-name') as HTMLInputElement).value
    const email = ($('signup-email') as HTMLInputElement).value
    const password = ($('signup-password') as HTMLInputElement).value
    const confirmPassword = ($('signup-confirm') as HTMLInputElement).value
    const errorEl = $('signup-error')

    if (password !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match'
        return
    }

    // Include confirmPassword for the auth guard validation
    const credentials = { name, email, password, confirmPassword }
    const result = await authService.signup(credentials as SignupCredentials)
    if (result.success) {
        errorEl.textContent = ''
        showApp(result.user.name)
        showToast(`Welcome, ${result.user.name}!`, 'success')
    } else {
        errorEl.textContent = result.error.message
        showToast(result.error.message, 'error')
    }
})

// Logout
$('logout-btn').addEventListener('click', async () => {
    await authService.signout()
    showAuth()
    showToast('Signed out successfully', 'info')
})

// React to auth state changes
authStore.subscribe((state) => {
    if (!state.isAuthenticated) showAuth()
})

async function initPages(): Promise<void> {
    await loadMenu()
    renderOrders()
    renderCustomers()
    renderInventory()
}

async function loadMenu(): Promise<void> {
    menuItems = await dataService.fetchChaiMenu()
    renderMenu()
}

function renderMenu(filter?: string): void {
    const grid = $('menu-grid')
    const empty = $('menu-empty')

    const filtered = filter && filter !== 'all'
        ? menuItems.filter(item => item.name.toLowerCase().includes(filter))
        : menuItems

    if (filtered.length === 0) {
        grid.innerHTML = ''
        empty.classList.remove('hidden')
    } else {
        empty.classList.add('hidden')
        grid.innerHTML = filtered.map(item => `
            <div class="chai-card" data-category="${item.name.split(' ')[0].toLowerCase()}">
                <div class="chai-card-header">
                    <span class="chai-emoji">${item.isHot ? '🔥' : '🧊'}</span>
                    <span class="badge badge-category">${item.isHot ? 'Hot' : 'Cold'}</span>
                </div>
                <h3 class="chai-card-title">${item.name}</h3>
                <p class="chai-card-ingredients">${item.ingredients.join(', ')}</p>
                <div class="chai-card-footer">
                    <span class="chai-card-price">₹${item.price}</span>
                </div>
            </div>
        `).join('')
    }

    // Update stats
    $('menu-total-items').textContent = menuItems.length.toString()
    $('menu-hot-count').textContent = menuItems.filter(i => i.isHot).length.toString()
}

// Menu filter chips
document.querySelectorAll('#page-menu .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('#page-menu .filter-chip').forEach(c => c.classList.remove('active'))
        chip.classList.add('active')
        renderMenu(chip.getAttribute('data-filter') ?? 'all')
    })
})

// Add Chai
$('add-chai-btn').addEventListener('click', () => {
    openModal('Add New Chai', `
        <form id="add-chai-form">
            <div class="form-group">
                <label for="new-chai-name">Name</label>
                <input type="text" id="new-chai-name" class="form-input" placeholder="e.g. Tulsi Chai" required />
            </div>
            <div class="form-group">
                <label for="new-chai-price">Price (₹)</label>
                <input type="number" id="new-chai-price" class="form-input" placeholder="50" min="1" required />
            </div>
            <div class="form-group">
                <label>Type</label>
                <select id="new-chai-hot" class="form-select">
                    <option value="true">Hot</option>
                    <option value="false">Cold</option>
                </select>
            </div>
            <div class="form-group">
                <label for="new-chai-ingredients">Ingredients (comma-separated)</label>
                <input type="text" id="new-chai-ingredients" class="form-input" placeholder="tea, milk, spices" required />
            </div>
        </form>
    `, () => {
        const name = ($('new-chai-name') as HTMLInputElement).value
        const price = Number(($('new-chai-price') as HTMLInputElement).value)
        const isHot = ($('new-chai-hot') as HTMLSelectElement).value === 'true'
        const ingredients = ($('new-chai-ingredients') as HTMLInputElement).value.split(',').map(s => s.trim())
        if (name && price > 0) {
            menuItems.push({ name, price, isHot, ingredients })
            renderMenu()
            showToast(`${name} added to menu!`, 'success')
        }
    })
})

// Empty state "Add First Chai" button
document.querySelector('#menu-empty [data-trigger="add-chai-btn"]')?.addEventListener('click', () => {
    $('add-chai-btn').click()
})

function getStatusBadge(status: OrderStatus): string {
    const map: Record<string, string> = {
        pending: 'badge-pending',
        preparing: 'badge-preparing',
        served: 'badge-served',
        cancelled: 'badge-cancelled',
    }
    return map[status] ?? 'badge-pending'
}

function renderOrders(filter?: string): void {
    const list = $('order-list')
    const empty = $('orders-empty')

    const filtered = filter && filter !== 'all'
        ? orders.filter(o => o.status === filter)
        : orders

    if (filtered.length === 0) {
        list.innerHTML = ''
        empty.classList.remove('hidden')
    } else {
        empty.classList.add('hidden')
        list.innerHTML = filtered.map(order => {
            const sizeLabel = order.items[1] === ChaiSize.SMALL ? 'S' : order.items[1] === ChaiSize.MEDIUM ? 'M' : 'L'
            return `
            <div class="order-card" data-status="${order.status}">
                <div class="order-card-header">
                    <span class="order-id">#${order.orderId.slice(0, 8)}</span>
                    <span class="badge ${getStatusBadge(order.status)}">${order.status}</span>
                </div>
                <div class="order-card-body">
                    <p><strong>Customer:</strong> ${order.customer.name}</p>
                    <p><strong>Items:</strong> ${order.items[0]} × ${order.items[2]} (${sizeLabel})</p>
                    <p><strong>Total:</strong> ₹${order.totalPrice}</p>
                </div>
                <div class="order-card-actions">
                    ${order.status === OrderStatus.PENDING ? `
                        <button class="btn btn-small btn-primary order-action" data-id="${order.orderId}" data-action="preparing">Start Preparing</button>
                        <button class="btn btn-small btn-danger order-action" data-id="${order.orderId}" data-action="cancel">Cancel</button>
                    ` : ''}
                    ${order.status === OrderStatus.PREPARING ? `
                        <button class="btn btn-small btn-primary order-action" data-id="${order.orderId}" data-action="served">Mark Served</button>
                    ` : ''}
                </div>
            </div>`
        }).join('')

        // Wire action buttons
        list.querySelectorAll('.order-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const orderId = btn.getAttribute('data-id')!
                const action = btn.getAttribute('data-action')!
                handleOrderAction(orderId, action)
            })
        })
    }

    // Update stats
    $('orders-total').textContent = orders.length.toString()
    $('orders-pending').textContent = orders.filter(o => o.status === OrderStatus.PENDING).length.toString()
    $('orders-preparing').textContent = orders.filter(o => o.status === OrderStatus.PREPARING).length.toString()
    $('orders-served').textContent = orders.filter(o => o.status === OrderStatus.SERVED).length.toString()
}

function handleOrderAction(orderId: string, action: string): void {
    const order = orders.find(o => o.orderId === orderId)
    if (!order) return

    if (action === 'cancel') {
        orderManager.cancelOrder(orderId, 'Cancelled by operator')
        order.status = OrderStatus.CANCELLED
        showToast('Order cancelled', 'warning')
    } else if (action === 'preparing') {
        orderManager.updateOrder(orderId, { status: OrderStatus.PREPARING })
        order.status = OrderStatus.PREPARING
        showToast('Order is being prepared ☕', 'info')
    } else if (action === 'served') {
        orderManager.updateOrder(orderId, { status: OrderStatus.SERVED })
        order.status = OrderStatus.SERVED
        showToast('Order served! 🎉', 'success')
    }
    renderOrders()
}

// Create Order
$('create-order-btn').addEventListener('click', () => {
    const template = $('order-form-template') as HTMLTemplateElement
    const content = template.content.cloneNode(true) as DocumentFragment

    // Populate customer select
    const customerSelect = content.querySelector('#order-customer') as HTMLSelectElement
    const customers = customerRepo.getAll()
    customers.forEach(c => {
        const option = document.createElement('option')
        option.value = c.id.toString()
        option.textContent = c.name
        customerSelect.appendChild(option)
    })

    $('modal-title').textContent = 'New Order'
    $('modal-body').innerHTML = ''
    $('modal-body').appendChild(content)
    $('modal-footer').classList.add('hidden')
    $('modal-overlay').classList.remove('hidden')

    const form = $('modal-body').querySelector('#order-form') as HTMLFormElement
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const customerId = Number((form.querySelector('#order-customer') as HTMLSelectElement).value)
        const customer = customerRepo.getById(customerId)
        if (!customer) { showToast('Please select a customer', 'error'); return }

        const chaiVal = (form.querySelector('.order-chai-select') as HTMLSelectElement).value
        const sizeVal = Number((form.querySelector('.order-size-select') as HTMLSelectElement).value)
        const qty = Number((form.querySelector('.order-qty-input') as HTMLInputElement).value)
        const payVal = (form.querySelector('#order-payment') as HTMLSelectElement).value
        const instructions = (form.querySelector('#order-instructions') as HTMLTextAreaElement).value

        const category = categoryMap[chaiVal]
        const payment = paymentMap[payVal]
        if (category === undefined || !sizeVal || !qty || payment === undefined) {
            showToast('Please fill all required fields', 'error')
            return
        }

        const order = orderManager.createOrder({
            items: [category, sizeVal as ChaiSize, qty],
            customer,
            paymentMethod: payment,
            ...(instructions ? { specialInstructions: instructions } : {}),
        })
        orders.push(order)
        closeModal()
        renderOrders()
        showToast(`Order #${order.orderId.slice(0, 8)} created!`, 'success')
    })

    form.querySelector('[data-action="cancel"]')?.addEventListener('click', closeModal)
})

// Order status filter
document.querySelectorAll('#order-status-filter .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('#order-status-filter .filter-chip').forEach(c => c.classList.remove('active'))
        chip.classList.add('active')
        renderOrders(chip.getAttribute('data-filter') ?? 'all')
    })
})

function renderCustomers(search?: string): void {
    const list = $('customer-list')
    const empty = $('customers-empty')

    const allCustomers = [...customerRepo.getAll()] as Customer[]
    const filtered = search
        ? allCustomers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        : allCustomers

    if (filtered.length === 0) {
        list.innerHTML = ''
        empty.classList.remove('hidden')
    } else {
        empty.classList.add('hidden')
        list.innerHTML = filtered.map(c => `
            <div class="customer-card">
                <div class="customer-avatar">${c.name.charAt(0).toUpperCase()}</div>
                <div class="customer-info">
                    <h4 class="customer-name">${c.name}</h4>
                    <p class="customer-phone">${c.phone ?? 'No phone'}</p>
                </div>
                <div class="customer-actions">
                    <button class="btn btn-small btn-ghost delete-customer" data-id="${c.id}">🗑️</button>
                </div>
            </div>
        `).join('')

        list.querySelectorAll('.delete-customer').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-id'))
                customerRepo.delete(id)
                renderCustomers()
                showToast('Customer removed', 'warning')
            })
        })
    }

    // Update stats
    $('customers-total').textContent = allCustomers.length.toString()
    $('customers-regulars').textContent = Math.min(allCustomers.length, 2).toString()
    $('customers-new-today').textContent = Math.min(allCustomers.length, 1).toString()
}

// Toggle Add Customer form
$('add-customer-btn').addEventListener('click', () => {
    $('add-customer-form').classList.toggle('hidden')
})
$('cancel-customer-btn').addEventListener('click', () => {
    $('add-customer-form').classList.add('hidden');
    ($('customer-form') as HTMLFormElement).reset()
})

// Submit new customer
$('customer-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = ($('customer-name') as HTMLInputElement).value
    const phone = ($('customer-phone') as HTMLInputElement).value

    const customer: Customer = { id: nextCustomerId++, name, ...(phone ? { phone } : {}) }
    customerRepo.add(customer)

    $('add-customer-form').classList.add('hidden');
    ($('customer-form') as HTMLFormElement).reset()
    renderCustomers()
    showToast(`${name} added!`, 'success')
})

// Customer search
$('customer-search').addEventListener('input', (e) => {
    renderCustomers((e.target as HTMLInputElement).value || undefined)
})

function renderInventory(): void {
    const tbody = $('inventory-tbody')
    const empty = $('inventory-empty')
    const alert = $('stock-alert')

    if (inventory.length === 0) {
        tbody.innerHTML = ''
        empty.classList.remove('hidden')
        alert.classList.add('hidden')
        return
    }

    empty.classList.add('hidden')
    const lowStockItems = inventory.filter(i => i.stock <= i.threshold)
    alert.classList.toggle('hidden', lowStockItems.length === 0)

    tbody.innerHTML = inventory.map((item, index) => {
        const isLow = item.stock <= item.threshold
        return `
            <tr>
                <td>${item.itemName}</td>
                <td>${item.stock}</td>
                <td>units</td>
                <td>${item.threshold}</td>
                <td><span class="badge ${isLow ? 'badge-low-stock' : 'badge-in-stock'}">${isLow ? 'Low Stock' : 'In Stock'}</span></td>
                <td><button class="btn btn-small btn-primary restock-btn" data-index="${index}">Restock</button></td>
            </tr>`
    }).join('')

    tbody.querySelectorAll('.restock-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-index'))
            inventory[idx].stock += 50
            renderInventory()
            showToast(`${inventory[idx].itemName} restocked!`, 'success')
        })
    })

    // Update stats
    $('inventory-total').textContent = inventory.length.toString()
    $('inventory-low').textContent = lowStockItems.length.toString()
    $('inventory-ok').textContent = inventory.filter(i => i.stock > i.threshold).length.toString()
}

// Dismiss stock alert
$('dismiss-alert').addEventListener('click', () => {
    $('stock-alert').classList.add('hidden')
})

// ── Auth Tab Switching ──
const signinTab = $('signin-tab')
const signupTab = $('signup-tab')
const signinFormEl = $('signin-form')
const signupFormEl = $('signup-form')

signinTab.addEventListener('click', () => {
    signinTab.classList.add('active')
    signupTab.classList.remove('active')
    signinFormEl.classList.remove('hidden')
    signupFormEl.classList.add('hidden')
})

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active')
    signinTab.classList.remove('active')
    signupFormEl.classList.remove('hidden')
    signinFormEl.classList.add('hidden')
})

// ── Sidebar Nav Page Switching ──
const navItems = document.querySelectorAll('.nav-item')
const pages = document.querySelectorAll('.page')
const pageTitle = $('page-title')

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const targetPage = item.getAttribute('data-page')
        if (!targetPage) return

        navItems.forEach((n) => n.classList.remove('active'))
        item.classList.add('active')

        pages.forEach((p) => {
            p.classList.toggle('hidden', p.id !== targetPage)
            if (p.id === targetPage) p.classList.add('active')
            else p.classList.remove('active')
        })

        const label = item.querySelector('.nav-label')
        if (label) pageTitle.textContent = label.textContent
    })
})

// ── Mobile Sidebar Toggle ──
const sidebarToggle = $('sidebar-toggle')
const sidebar = $('sidebar')

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open')
})

// ── Theme Toggle ──
const themeToggle = $('theme-toggle')

if (localStorage.getItem('chai-theme') === 'dark') {
    document.body.classList.add('dark')
    themeToggle.textContent = '☀️'
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    const isDark = document.body.classList.contains('dark')
    themeToggle.textContent = isDark ? '☀️' : '🌙'
    localStorage.setItem('chai-theme', isDark ? 'dark' : 'light')
})


$('global-search').addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase()
    const activePage = document.querySelector('.page.active')

    if (activePage?.id === 'page-menu') renderMenu(query || undefined)
    else if (activePage?.id === 'page-customers') renderCustomers(query || undefined)
})

checkAuth()
