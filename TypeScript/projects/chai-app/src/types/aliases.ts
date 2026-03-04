// Concepts: Literal Types, Type Aliases, Intersection Types, Object Types, Partial, Required, Pick, Omit, Generic Interfaces
import { ChaiOrder, OrderSummary } from "./interfaces"

export type ChaiName = "Masala Chai" | "Ginger Tea" | "Lemon Tea" | "Elaichi Chai" | "Adrak Chai"

export type Price = number

export type ChaiMenuItem = {
    name: string,
    price: number,
    isHot: boolean,
    ingredients: string[]
}

export type CreateOrderInput = Omit<ChaiOrder, "orderId" | "status" | "timestamp">

export type UpdateOrderInput = Partial<ChaiOrder>

export type OrderDisplay = Pick<OrderSummary, "orderId" | "status" | "totalPrice">

export type InventoryItem = { itemName: string } & { stock: number } & { threshold: number }

export type ApiResponse<T> = { status: number; data: T; error?: string }
