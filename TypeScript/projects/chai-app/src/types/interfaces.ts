// Concepts: Interfaces, Optional Properties, Readonly, Index Signatures, Interface Extension, Tuples
import { ChaiCategory, ChaiSize, OrderStatus, PaymentMethod } from "./enums";

export interface Ingredient {
    name: string,
    quantity: number,
    unit: string
}

export interface ChaiRecipe {
    readonly id: string
    name: string
    category: ChaiCategory
    ingredients: Ingredient[]
    prepTimeMinutes: number
    secretIngredient?: string
}

export interface Customer {
    readonly id: number
    name: string
    phone?: string
    [key: string]: unknown
}

export interface ChaiOrder {
    orderId: string,
    items: [ChaiCategory, ChaiSize, number],
    customer: Customer,
    status: OrderStatus,
    paymentMethod: PaymentMethod,
    timestamp: Date,
    specialInstructions?: string
}

export interface OrderSummary extends ChaiOrder {
    totalPrice: number,
    preparationTime: number
}

