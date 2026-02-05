// Task 10: Async Data Service with Type Assertions
// Concepts: Unknown, Never, Type Assertions, Async/Await Types, HTTP Response Types, Error Handling

// TODO: Create DataService for simulated API calls:

// 1. Define response interfaces:
//    interface ChaiApiResponse {
//      id: string;
//      name: string;
//      category: string;
//      // ... other fields
//    }

// 2. Class DataService:
//    Methods:
//      - async fetchChaiMenu(): Promise<ChaiMenuItem[]>
//        - Simulate API call with setTimeout
//        - Use type assertion on parsed JSON
//        - Handle unknown response data
//      
//      - async fetchOrderById(id: string): Promise<ChaiOrder | null>
//        - Use type assertions carefully
//        - Implement proper error handling with typed catch
//      
//      - async saveOrder(order: ChaiOrder): Promise<ApiResponse<{orderId: string}>>
//        - Return proper generic response
//      
//      - parseUnknownResponse(data: unknown): ChaiMenuItem | null
//        - Use type guards to safely parse unknown data
//        - Use `as` assertion only after validation

// 3. Error handling:
//    - Create custom error types
//    - Use try-catch with proper type narrowing on error
//    - Demonstrate never type for exhaustive error handling

