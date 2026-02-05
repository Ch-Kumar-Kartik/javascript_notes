// Task 3: Create Type Aliases & Utility Types
// Concepts: Literal Types, Type Aliases, Intersection Types, Object Types, Partial, Required, Pick, Omit, Generic Interfaces

// TODO: Create these type aliases:

// 1. ChaiName - literal union type of chai names ("Masala Chai" | "Ginger Tea" | "Lemon Tea" | "Elaichi Chai" | "Adrak Chai")

// 2. Price - type alias for number

// 3. ChaiMenuItem - object type with name, price, isHot (boolean), and ingredients (string[])

// 4. CreateOrderInput - use Omit<> to create a type from ChaiOrder without 'orderId', 'status', and 'timestamp'

// 5. UpdateOrderInput - use Partial<> on ChaiOrder

// 6. OrderDisplay - use Pick<> to select only 'orderId', 'status', 'totalPrice' from OrderSummary

// 7. InventoryItem - intersection type combining { itemName: string } & { stock: number } & { threshold: number }

// 8. ApiResponse<T> - generic type with status: number, data: T, error?: string

