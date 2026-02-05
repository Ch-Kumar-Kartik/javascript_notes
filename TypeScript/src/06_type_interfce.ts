/*
 * ============================================================
 *                  WHY USE INTERFACES IN TYPESCRIPT?
 * ============================================================
 * 
 * 1. DEFINE OBJECT SHAPES (Contracts)
 *    - Interfaces describe the structure an object must have
 *    - Enforce that objects have specific properties with specific types
 *    - Example: interface User { name: string; age: number; }
 * 
 * 2. CLASS IMPLEMENTATION
 *    - Classes can "implement" interfaces using the `implements` keyword
 *    - Ensures the class follows a specific structure/contract
 *    - Multiple classes can implement the same interface (polymorphism)
 * 
 * 3. DECLARATION MERGING (Unique to Interfaces!)
 *    - Unlike `type`, interfaces with the same name automatically merge
 *    - Useful for extending third-party library types
 *    - Example:
 *        interface Window { myCustomProp: string; }  // Extends built-in Window
 * 
 * 4. EXTENDS OTHER INTERFACES
 *    - interface Dog extends Animal { breed: string; }
 *    - Promotes code reusability and hierarchical design
 * 
 * 5. FUNCTION TYPE DEFINITIONS
 *    - interface MathOp { (a: number, b: number): number; }
 * 
 * KEY BENEFITS:
 *    Type Safety      - Catch errors at compile time
 *    IntelliSense     - Better IDE autocomplete & suggestions
 *    Documentation    - Self-documenting code structure
 *    Consistency      - Enforce consistent object shapes across codebase
 * 
 * WHEN TO USE `interface` vs `type`:
 *    - Use `interface` for object shapes and class contracts
 *    - Use `type` for unions, primitives, tuples, and complex type operations
 *    - Interfaces are generally preferred for defining object structures
 * 
 * ============================================================
 */
type TeaRecipe = {
    water: number;
    milk: number;
}

class MasalaChai implements TeaRecipe {
    water = 100;
    milk = 200;
}

// type CupSize = "small" | "large"

// class Chai implements CupSize { } // gives an error
// why ?
/*
CupSize is a union of string literals ("small" | "large"), not an object type
The implements keyword requires an object type (like an interface or object type alias) that has properties/methods
A class cannot "implement" a primitive type or a union of primitives — there's nothing to implement!
*/

// interface TeaRecipe {
//     water: number;
//     milk: number;
// }

// class MasalaChai implements TeaRecipe {
//     water = 100;
//     milk = 200;
// }

interface CupSize {
    size: "small" | "large"
}

class Chai implements CupSize {
    size: "small" | "large" = "large" // in this case need to use a variable in contrast to TeaRecipe example
}

/*
type Response = { ok: true } | { ok: false }
class myRes implements Response {
    ok: boolean = true;
}
also an issue, so use interfaces
*/

type TeaType = "masala" | "ginger" | "lemon" // this is known as literal types

function orderChai(t: TeaType) {
    console.log(t);
}

// intersection
type BaseChai = { teaLeaves: number }
type Extrq = { masala: number }

type MaasalaChai = BaseChai & Extrq

const cup: MaasalaChai = { teaLeaves: 1, masala: 2 }

// optional values/properties
type User = {
    username: string;
    bio?: string;
}

type Config = {
    readonly appName: string;
    version: number;
}

const cfg: Config = {
    appName: "Masterji",
    version: 1
}

// cfg.appName = "ChaiaurCode" // gives an error