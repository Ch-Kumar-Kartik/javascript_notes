// Concepts: typeof, Truthiness, Equality, in Operator Narrowing, Discriminated Unions, Custom Type Guards, Exhaustiveness
import { ChaiOrder, Customer } from "../types/interfaces";
import { OrderStatus, PaymentMethod } from "../types/enums";

export function isChaiOrder(value: unknown): value is ChaiOrder {
    if (typeof value !== "object" || value === null) return false;
    const obj = value as Record<string, unknown>;
    return (
        typeof obj.orderId === "string" &&
        Array.isArray(obj.items) &&
        typeof obj.customer === "object" &&
        typeof obj.status === "string"
    )
}

export function isValidCustomer(value: unknown): value is Customer {
    if (typeof value !== "object" || value === null) return false;
    const obj = value as Record<string, unknown>;
    return (
        typeof obj.id === "number" &&
        typeof obj.name === "string"
    )
}

export function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === "string")
}

export function narrowOrderStatus(status: string | OrderStatus): string {
    if (typeof status === "string") {
        switch (status) {
            case OrderStatus.PENDING:
                return "Order is pending"
            case OrderStatus.PREPARING:
                return "Order is being prepared"
            case OrderStatus.SERVED:
                return "Order has been served"
            case OrderStatus.CANCELLED:
                return "Order was cancelled"
            default:
                return `Unknown status: ${status}`
        }
    }
    return `Status: ${status}`
}

export function processPayment(method: { type: PaymentMethod; amount: number } | string): string {
    if (typeof method === "string") {
        return `Processing payment via: ${method}`
    }
    if ("type" in method && "amount" in method) {
        return `Processing ${method.amount} via payment type ${method.type}`
    }
    return "Invalid payment method"
}

export type ChaiEvent =
    | { type: "order_placed"; orderId: string; customer: Customer }
    | { type: "order_prepared"; orderId: string; timeInMinutes: number }
    | { type: "order_cancelled"; orderId: string; reason: string }

export function handleChaiEvent(event: ChaiEvent): string {
    switch (event.type) {
        case "order_placed":
            return `Order ${event.orderId} placed by ${event.customer.name}`
        case "order_prepared":
            return `Order ${event.orderId} prepared in ${event.timeInMinutes} minutes`
        case "order_cancelled":
            return `Order ${event.orderId} cancelled: ${event.reason}`
        default:
            const _exhaustive: never = event
            return _exhaustive
    }
}
