// Task 8: Implement Generic Repository
// Concepts: Generic Functions, Multiple Type Params, Generic Interfaces, Generic Return Types

// TODO: Create a generic Repository class:

// 1. Generic interface Identifiable<T>:
//    - id: T

// 2. Generic class Repository<T extends Identifiable<string | number>>:
//    - Private items: T[] array
//    
//    - Methods:
//      - add(item: T): T
//      - getById(id: T['id']): T | undefined
//      - getAll(): readonly T[]
//      - update(id: T['id'], updates: Partial<T>): T | undefined
//      - delete(id: T['id']): boolean
//      - find(predicate: (item: T) => boolean): T[]

// 3. Create specialized repositories:
//    - CustomerRepository extends Repository<Customer>
//    - OrderRepository with custom OrderSummary handling

// 4. Generic function:
//    - wrapInResponse<T>(data: T, status: number): ApiResponse<T>

