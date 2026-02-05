// Task 2: Define Core Interfaces
// Concepts: Interfaces, Optional Properties, Readonly, Index Signatures, Interface Extension, Tuples

// TODO: Create interfaces with the following requirements:

// 1. Ingredient interface with:
//    - name: string
//    - quantity: number
//    - unit: string (grams, ml, pieces)

// 2. ChaiRecipe interface with:
//    - readonly id: string
//    - name: string
//    - category: ChaiCategory (from enums)
//    - ingredients: Ingredient[]
//    - prepTimeMinutes: number
//    - secretIngredient?: string (optional)

// 3. Customer interface with:
//    - id: number (readonly)
//    - name: string
//    - phone?: string (optional)
//    - [key: string]: unknown (index signature for extra data)

// 4. ChaiOrder interface with:
//    - orderId: string
//    - items: tuple of [ChaiCategory, ChaiSize, number (quantity)]
//    - customer: Customer
//    - status: OrderStatus
//    - paymentMethod: PaymentMethod
//    - timestamp: Date
//    - specialInstructions?: string

// 5. Create an interface OrderSummary that extends ChaiOrder
//    - Add: totalPrice: number, preparationTime: number

