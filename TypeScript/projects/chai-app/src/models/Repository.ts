// Concepts: Generic Functions, Multiple Type Params, Generic Interfaces, Generic Return Types
import { Customer, ChaiOrder } from "../types/interfaces"
import { ApiResponse } from "../types/aliases"

export interface Identifiable<T> {
    id: T
}

export class Repository<T extends Identifiable<string | number>> {
    private items: T[] = []

    add(item: T): T {
        this.items.push(item)
        return item
    }

    getById(id: T["id"]): T | undefined {
        return this.items.find(item => item.id === id)
    }

    getAll(): readonly T[] {
        return this.items
    }

    update(id: T["id"], updates: Partial<T>): T | undefined {
        const index = this.items.findIndex(item => item.id === id)
        if (index === -1) return undefined
        this.items[index] = { ...this.items[index], ...updates }
        return this.items[index]
    }

    delete(id: T["id"]): boolean {
        const index = this.items.findIndex(item => item.id === id)
        if (index === -1) return false
        this.items.splice(index, 1)
        return true
    }

    find(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate)
    }
}

export class CustomerRepository extends Repository<Customer> { }

export class OrderRepository {
    private orders: ChaiOrder[] = []

    add(order: ChaiOrder): ChaiOrder {
        this.orders.push(order)
        return order
    }

    getById(orderId: string): ChaiOrder | undefined {
        return this.orders.find(o => o.orderId === orderId)
    }

    getAll(): readonly ChaiOrder[] {
        return this.orders
    }

    findByCustomerId(customerId: number): ChaiOrder[] {
        return this.orders.filter(o => o.customer.id === customerId)
    }
}

export function wrapInResponse<T>(data: T, status: number): ApiResponse<T> {
    return { status, data }
}
