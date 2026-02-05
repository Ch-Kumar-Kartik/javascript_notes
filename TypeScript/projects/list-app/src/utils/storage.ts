// LocalStorage utility functions
// TODO: Implement save and load functions for persisting list items

import type { listItems } from "../types"

export function saveItems(items: listItems[]): void {
    localStorage.setItem("list-app-items", JSON.stringify(items))
}

export function loadItems(key: string): listItems[] {
    const Item = localStorage.getItem(key)
    if (typeof Item === 'string') {
        return JSON.parse(Item)
    } else {
        return []
    }
}

