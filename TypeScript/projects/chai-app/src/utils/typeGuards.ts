// Task 4: Implement Type Guards
// Concepts: typeof, Truthiness, Equality, in Operator Narrowing, Discriminated Unions, Custom Type Guards, Exhaustiveness

// TODO: Implement these type guard functions:

// 1. isChaiOrder - custom type guard using `is` keyword to check if unknown value is ChaiOrder
//    - Check for orderId (string), items (array), customer (object), status (OrderStatus value)

// 2. isValidCustomer - custom type guard checking for valid Customer shape

// 3. isStringArray - checks if unknown value is string[]

// 4. narrowOrderStatus - function that takes status: string | OrderStatus
//    - Use typeof narrowing to handle the cases

// 5. processPayment - function with PaymentMethod | string parameter
//    - Use in operator to narrow the type

// 6. Create a discriminated union type:
//    type ChaiEvent = 
//      | { type: "order_placed"; orderId: string; customer: Customer }
//      | { type: "order_prepared"; orderId: string; timeInMinutes: number }
//      | { type: "order_cancelled"; orderId: string; reason: string }
//    
//    Then create handleChaiEvent function with exhaustive switch statement

