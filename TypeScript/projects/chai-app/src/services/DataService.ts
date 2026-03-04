import { ChaiMenuItem, ApiResponse } from "../types/aliases"
import { ChaiOrder } from "../types/interfaces"
// Concepts: Unknown, Never, Type Assertions, Async/Await Types, HTTP Response Types, Error Handling

export interface ChaiApiResponse {
    id: string
    name: string
    category: string
    price: number
    isAvailable: boolean
}

// Custom error types
export class DataServiceError extends Error {
    constructor(public code: "NETWORK" | "PARSE" | "NOT_FOUND", message: string) {
        super(message)
        this.name = "DataServiceError"
    }
}

export class DataService {
    async fetchChaiMenu(): Promise<ChaiMenuItem[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const rawData: unknown = JSON.parse(JSON.stringify([
                    { name: "Masala Chai", price: 50, isHot: true, ingredients: ["tea", "milk", "spices"] },
                    { name: "Ginger Tea", price: 40, isHot: true, ingredients: ["tea", "ginger"] },
                    { name: "Lemon Tea", price: 35, isHot: false, ingredients: ["tea", "lemon", "honey"] },
                    { name: "Elaichi Chai", price: 55, isHot: true, ingredients: ["tea", "milk", "cardamom"] },
                    { name: "Adrak Chai", price: 45, isHot: true, ingredients: ["tea", "milk", "ginger"] },
                ]))
                const menuItems = rawData as ChaiMenuItem[]
                resolve(menuItems)
            }, 1000)
        })
    }
    async fetchOrderById(id: string): Promise<ChaiOrder | null> {
        try {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (!id) {
                        reject(new DataServiceError("NOT_FOUND", `Order ${id} not found`))
                        return
                    }
                    // Simulated: no real data, return null
                    resolve(null)
                }, 500)
            })
        } catch (error: unknown) {
            if (error instanceof DataServiceError) {
                console.error(`[${error.code}] ${error.message}`)
            }
            return null
        }
    }

    // Return proper generic response
    async saveOrder(order: ChaiOrder): Promise<ApiResponse<{ orderId: string }>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 201,
                    data: { orderId: order.orderId }
                })
            }, 500)
        })
    }

    // Use type guards to safely parse unknown data, `as` only after validation
    parseUnknownResponse(data: unknown): ChaiMenuItem | null {
        if (typeof data !== "object" || data === null) return null
        const obj = data as Record<string, unknown>
        if (
            typeof obj.name === "string" &&
            typeof obj.price === "number" &&
            typeof obj.isHot === "boolean" &&
            Array.isArray(obj.ingredients)
        ) {
            return obj as ChaiMenuItem
        }
        return null
    }
}
