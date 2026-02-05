// Task 9: Create Menu System with Arrays & Tuples
// Concepts: Typed Arrays, Object Arrays, Readonly Arrays, 2D Arrays, Tuples, Named Tuples, Readonly Tuples, Index Signatures

// TODO: Implement MenuService with:

// 1. Define types:
//    - MenuItemTuple: [name: string, price: number, available: boolean]
//    - PriceMatrix: number[][] (2D array for size x category pricing)

// 2. Class MenuService:
//    Private properties:
//      - menuItems: readonly ChaiMenuItem[]
//      - priceMatrix: PriceMatrix
//      - ratings: { [chaiName: string]: number[] } (index signature for ratings)
//    
//    Methods:
//      - getMenuItem(name: ChaiName): ChaiMenuItem | undefined
//      - addRating(chai: ChaiName, rating: number): void
//      - getAverageRating(chai: ChaiName): number
//      - getMenuAsTuples(): readonly MenuItemTuple[]
//      - getPriceByMatrixPosition(sizeIndex: number, categoryIndex: number): number

// 3. Use tuple destructuring in methods where appropriate

