// Task 7: Create Order Manager with Composition
// Concepts: Nullable Returns, Readonly Arrays, Composition

// TODO: Create supporting classes and main OrderManager:

// 1. PriceCalculator class:
//    - method: calculate(items: ChaiOrder['items']): number

// 2. OrderValidator class:
//    - method: validate(order: unknown): order is ChaiOrder

// 3. OrderManager class (uses composition):
//    - Private properties:
//      - orders: ChaiOrder[] (readonly array)
//      - priceCalculator: PriceCalculator
//      - validator: OrderValidator
//    
//    - Constructor receives calculator and validator (dependency injection)
//    
//    - Methods:
//      - createOrder(input: CreateOrderInput): OrderSummary
//      - updateOrder(orderId: string, updates: UpdateOrderInput): ChaiOrder | null
//      - getOrder(orderId: string): ChaiOrder | undefined
//      - getOrdersByStatus(status: OrderStatus): readonly ChaiOrder[]
//      - cancelOrder(orderId: string, reason: string): boolean

