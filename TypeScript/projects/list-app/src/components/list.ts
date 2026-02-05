// List component and operations
// TODO: Implement add, delete, toggle, and clear functions
import { loadItems } from "../utils/storage";
import { saveItems } from "../utils/storage";
import type { listItems } from "../types";

export function addItem(text: string): void {
    const items: listItems = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        task: text,
        checked: false,
        createdAt: new Date()
    }

    let Items: listItems[] = loadItems("list-app-items")
    Items.push(items)
    saveItems(Items)
    renderList()
}

export function deleteItem(id: string): void {

    let Items: listItems[] = loadItems("list-app-items")
    const ListAfterDelete = Items.filter((ToDelete) => { return ToDelete.id !== id })
    saveItems(ListAfterDelete)
    renderList()
}

export function toggleItem(id: string): void {

    let Items: listItems[] = loadItems('list-app-items')
    const ListAfterToggle = Items.map((item) => {
        if (item.id === id) {
            return { ...item, checked: !item.checked }
        }
        return item
    })
    saveItems(ListAfterToggle)
    renderList()
}

export function clearAll(): void {

    saveItems([])
    renderList()

}

export function renderList(): void {
    let items = loadItems('list-app-items')
    const container: HTMLElement | null = document.getElementById('list-container')
    const emptyState: HTMLElement | null = document.getElementById('empty-state')
    const totalCount = document.getElementById('total-count')
    const checkedCount = document.getElementById('checked-count')
    const uncheckedCount = document.getElementById('unchecked-count')

    if (container) {
        container.innerHTML = ''
    }

    items.forEach(item => {
        if (container) {
            const li = document.createElement('li')
            li.className = 'list-item'
            if (item.checked) {
                li.classList.add('checked')
            }
            const textSpan = document.createElement('span');
            textSpan.className = 'item-text';
            textSpan.textContent = item.task;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'item-checkbox';
            checkbox.checked = item.checked;
            checkbox.addEventListener('change', () => toggleItem(item.id))  // 👈 Add here

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteItem(item.id))

            li.appendChild(checkbox)
            li.appendChild(textSpan)
            li.appendChild(deleteBtn)
            container.appendChild(li)
        }
    })


    const checked = items.filter((i) => {
        return i.checked
    }).length

    const unchecked = items.length - checked

    if (totalCount) {
        totalCount.textContent = items.length.toString()
    }
    if (checkedCount) {
        checkedCount.textContent = checked.toString()
    }
    if (uncheckedCount) {
        uncheckedCount.textContent = unchecked.toString()
    }

    if (items.length === 0) {
        if (container) container.style.display = 'none'
        if (emptyState) emptyState.classList.add('visible')
    } else {
        if (container) container.style.display = 'flex'
        if (emptyState) emptyState.classList.remove('visible')
    }
}