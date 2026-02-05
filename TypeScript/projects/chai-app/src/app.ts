// Task 11: Build the Main Application
// Concepts: Annotations, Inference, Union Types, Exhaustiveness, Default Params, Void, Complex Object Params

// This is the entry point that ties everything together

// TODO: Create the main application that ties everything together:

// 1. Initialize all services and repositories

// 2. Create sample data using all your types

// 3. Demonstrate each concept through practical usage:
//    - Create customers with optional properties
//    - Create chai items using type inference
//    - Process orders through the OrderManager
//    - Use the generic repository
//    - Make async calls to DataService
//    - Handle various order events (discriminated union)

// 4. Create a processCommand function:
//    - Takes command: "order" | "cancel" | "status" | "menu" | "exit"
//    - Uses switch with exhaustiveness check
//    - Returns appropriate messages

// 5. Implement printOrder function:
//    - Takes order: ChaiOrder | string (union)
//    - Use type narrowing to handle both cases
//    - Call your custom type guard

// 6. Run the application with console output showing the type safety in action

console.log("🍵 Welcome to ChaiCode Cafe!");
console.log("Starting Chai Shop Management System...");

// Your implementation starts here...

