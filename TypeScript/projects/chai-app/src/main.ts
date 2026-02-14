import './style.css'

// ═══════════════════════════════════════════════════════
// ChaiCode Cafe — Main Entry Point
// ═══════════════════════════════════════════════════════
//
// This file is YOUR playground. Write all your DOM logic,
// event listeners, and TypeScript code here.
//
// The HTML structure in index.html provides:
//
// ── AUTH PAGE (visible by default, hide after JWT validation) ──
//   #auth-page          → Auth page wrapper (toggle .hidden)
//   #signin-tab         → "Sign In" tab button
//   #signup-tab         → "Sign Up" tab button
//   #signin-form        → Sign In <form> (email + password)
//   #signin-email       → Sign In email input
//   #signin-password    → Sign In password input
//   #signin-error       → Sign In error message container
//   #signin-btn         → Sign In submit button
//   #signup-form        → Sign Up <form> (name + email + password + confirm)
//   #signup-name        → Sign Up name input
//   #signup-email       → Sign Up email input
//   #signup-password    → Sign Up password input
//   #signup-confirm     → Sign Up confirm password input
//   #signup-error       → Sign Up error message container
//   #signup-btn         → Sign Up submit button
//
// ── MAIN APP (hidden by default, show after JWT validation) ──
//   #app                → Main app layout wrapper (toggle .hidden)
//
// ── USER MENU / LOGOUT ──
//   #user-greeting      → "Hello, User!" text (update with username)
//   #logout-btn         → Logout button (clear JWT, show auth page)
//
// ── SIDEBAR NAVIGATION ──
//   #sidebar            → Sidebar container
//   #nav-menu           → Menu nav button     (data-page="page-menu")
//   #nav-orders         → Orders nav button   (data-page="page-orders")
//   #nav-customers      → Customers nav button(data-page="page-customers")
//   #nav-inventory      → Inventory nav button(data-page="page-inventory")
//
// ── PAGES (toggle .hidden class) ──
//   #page-menu          → Menu page
//   #page-orders        → Orders page
//   #page-customers     → Customers page
//   #page-inventory     → Inventory page
//
// ── MENU PAGE ──
//   #menu-grid          → Container for chai cards
//   #add-chai-btn       → "Add Chai" button
//   #menu-empty         → Empty state (hide when items exist)
//   Filter chips:       → .filter-chip[data-filter="..."]
//
// ── ORDERS PAGE ──
//   #order-list         → Container for order cards
//   #create-order-btn   → "New Order" button
//   #order-status-filter→ Filter chip group
//   #orders-empty       → Empty state
//   #order-form-template→ <template> for order creation form
//
// ── CUSTOMERS PAGE ──
//   #customer-list      → Container for customer cards
//   #add-customer-btn   → "Add Customer" button
//   #add-customer-form  → Hidden form card
//   #customer-form      → The <form> element
//   #customers-empty    → Empty state
//
// ── INVENTORY PAGE ──
//   #inventory-table    → <table> element
//   #inventory-tbody    → <tbody> for dynamic rows
//   #stock-alert        → Warning banner (toggle .hidden)
//   #inventory-empty    → Empty state
//
// ── MODAL ──
//   #modal-overlay      → Full-screen overlay (toggle .hidden)
//   #modal-content      → Modal card
//   #modal-title        → Modal heading
//   #modal-body         → Modal body (inject content here)
//   #modal-footer       → Modal action buttons (toggle .hidden)
//   #modal-close        → Close button
//
// ── TOAST ──
//   #toast-container    → Fixed container for toast notifications
//
// ── GLOBAL ──
//   #global-search      → Search input
//   #page-title         → Page title in top bar
//   #sidebar-toggle     → Mobile hamburger button
//
// CSS classes you can use when rendering elements:
//   .chai-card, .order-card, .customer-card  → Card components
//   .badge-pending, .badge-preparing, .badge-served, .badge-cancelled
//   .badge-low-stock, .badge-in-stock, .badge-category
//   .toast, .toast-success, .toast-error, .toast-warning, .toast-info
//   .hidden  → Hide any element
//
// Happy coding! 🍵

// ═══════════════════════════════════════════════════════
// UI Wiring (presentational only — not app logic)
// ═══════════════════════════════════════════════════════

// ── Auth Tab Switching ──
const signinTab = document.getElementById('signin-tab')!;
const signupTab = document.getElementById('signup-tab')!;
const signinForm = document.getElementById('signin-form')!;
const signupForm = document.getElementById('signup-form')!;

signinTab.addEventListener('click', () => {
    signinTab.classList.add('active');
    signupTab.classList.remove('active');
    signinForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    signinTab.classList.remove('active');
    signupForm.classList.remove('hidden');
    signinForm.classList.add('hidden');
});

// ── Sidebar Nav Page Switching ──
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title')!;

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const targetPage = item.getAttribute('data-page');
        if (!targetPage) return;

        // Update active nav
        navItems.forEach((n) => n.classList.remove('active'));
        item.classList.add('active');

        // Show target page, hide others
        pages.forEach((p) => {
            p.classList.toggle('hidden', p.id !== targetPage);
            if (p.id === targetPage) p.classList.add('active');
            else p.classList.remove('active');
        });

        // Update page title
        const label = item.querySelector('.nav-label');
        if (label) pageTitle.textContent = label.textContent;
    });
});

// ── Mobile Sidebar Toggle ──
const sidebarToggle = document.getElementById('sidebar-toggle')!;
const sidebar = document.getElementById('sidebar')!;

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});
