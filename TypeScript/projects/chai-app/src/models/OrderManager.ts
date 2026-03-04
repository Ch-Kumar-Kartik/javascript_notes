// Concepts: Nullable Returns, Readonly Arrays, Composition
import { ChaiOrder, OrderSummary } from "../types/interfaces";
import { ChaiSize, OrderStatus } from "../types/enums";
import { CreateOrderInput, UpdateOrderInput } from "../types/aliases";
import { isChaiOrder } from "../utils/typeGuards";

export class PriceCalculator {
    private basePrices: Record<ChaiSize, number> = {
        [ChaiSize.SMALL]: 30,
        [ChaiSize.MEDIUM]: 50,
        [ChaiSize.LARGE]: 70,
    }

    calculate(items: ChaiOrder["items"]): number {
        const [_category, size, quantity] = items
        const basePrice = this.basePrices[size] ?? 50
        return basePrice * quantity
    }
}

export class OrderValidator {
    validate(order: unknown): order is ChaiOrder {
        return isChaiOrder(order)
    }
}

export class OrderManager {
    private orders: ChaiOrder[]
    private priceCalculator: PriceCalculator
    private validator: OrderValidator

    constructor(priceCalculator: PriceCalculator, validator: OrderValidator) {
        this.priceCalculator = priceCalculator
        this.validator = validator
        this.orders = []
    }

    createOrder(input: CreateOrderInput): OrderSummary {
        const order: ChaiOrder = {
            orderId: crypto.randomUUID(),
            status: OrderStatus.PENDING,
            timestamp: new Date(),
            ...input
        }
        this.orders.push(order)
        return {
            ...order,
            totalPrice: this.priceCalculator.calculate(order.items),
            preparationTime: order.items[2] * 5 // 5 min per quantity
        }
    }

    updateOrder(orderId: string, updates: UpdateOrderInput): ChaiOrder | null {
        const index = this.orders.findIndex(o => o.orderId === orderId)
        if (index === -1) return null
        this.orders[index] = { ...this.orders[index], ...updates }
        return this.orders[index]
    }

    getOrder(orderId: string): ChaiOrder | undefined {
        return this.orders.find(o => o.orderId === orderId)
    }

    getOrdersByStatus(status: OrderStatus): readonly ChaiOrder[] {
        return this.orders.filter(o => o.status === status)
    }

    cancelOrder(orderId: string, reason: string): boolean {
        const order = this.getOrder(orderId)
        if (!order || order.status === OrderStatus.CANCELLED) return false
        order.status = OrderStatus.CANCELLED
        order.specialInstructions = reason
        return true
    }
}
