/*
unknown can be used instead of any 
(just a possible alternative)
*/

function isStringArray(arr: unknown): arr is string[] {
    return Array.isArray(arr) && arr.every(item => typeof item === 'string')
}

/*
Type narrowing in TypeScript is the process of 
reducing a broad type (like a union) to a more 
specific type based on runtime checks, so you can 
safely use type-specific operations.
A good practice

Different methods :
- typeof narrowing
- Equality narrowing
- Truthiness narrowing
- in operator narrowing
- instanceof narrowing
- Discriminated unions
- Custom type guards (is keyword)
- Narrowing with never (exhaustiveness check)
*/

function getChai(kind: string | number) {
    if (typeof kind === 'string') { // performing checks (type narrowing)
        return `Making ${kind} chai`
    }
    return `Chai order ${kind}`
}

/*
due to type narrowing now we can see suggested
methods for kind. (like .toUpperCase()) or 
(like .toFixed()) depending on the datatype of kind
on the basis of its occurence
*/

// truthiness narrowing 
function serveChai(msg?: string) {
    if (msg) {
        return `Serving ${msg}` // here if msg not passed then no need to use the argument in the message
    }
    return `Serving default masala chai`
}

// exhaustive checking
function orderChai(size: "small" | "medium" | "large" | number) {
    if (size === "small") {
        return `small cutting chai...`
    }
    if (size === "medium" || size === "large") {
        return `make extra chai`
    }
    return `chai order #${size}`
}

class KulhadChai {
    serve() {
        return `Serving Kulhad Chai`
    }
}
class Cutting {
    serve() {
        return `Serving cutting Chai`
    }
}
function serve(chai: KulhadChai | Cutting) {
    if (chai instanceof KulhadChai) {
        return chai.serve()
    }
}

// Guard Checking and custom type
type ChaiOrder = {
    type: string
    sugar: number
}

// checking if the obj passed as an argument is of type ChaiOrder or not
/*
Return type: Instead of returning boolean, this function returns obj is ChaiOrder — a special type predicate
Effect: When the function returns true, TypeScript narrows the type of obj to 
ChaiOrder in the calling scope

Without the is keyword (if you just returned boolean), TypeScript wouldn't narrow the type inside the if block — you'd still have ChaiOrder | string and would get errors accessing .type and .sugar.
The obj is ChaiOrder return type tells TypeScript: "Trust me — if this function returns true, the parameter is definitely a 
ChaiOrder." This enables powerful runtime type checking with compile-time type safety.
*/
function isChaiOrder(obj: any): obj is ChaiOrder {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.type === 'string' &&
        typeof obj.sugar === 'number'
    )
}

function serveOrder(item: ChaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar} sugar`
    }
    return `serving custom chai : ${item}`
}

type MasalaChai = { type: "masala", spicelevel: number };
/*
You are defining a structural type:

{
  type: "masala";
  spicelevel: number;
}

Meaning:
“Any object that looks like this is a MasalaChai.”

-----
type MasalaChai = { type: "masala", spicelevel: number };
- Compile-time only
- No constructor
- No instanceof
- Zero JS output

class MasalaChai {
  type = "masala";
  constructor(public spicelevel: number) {}
}

- Exists at runtime
- Has constructor
- Can use instanceof
- Generates JS code
*/
type GingerChai = { type: "ginger", amount: number };
type ElaichiChai = { type: "elaichi", aroma: number };

type Chai = MasalaChai | GingerChai | ElaichiChai;

function MakeChai(order: Chai) {
    switch (order.type) {
        case "masala":
            return `Making masala chai with ${order.spicelevel} spices`
        case "ginger":
            return `Making ginger chai with ${order.amount} ginger`
        case "elaichi":
            return `Making elaichi chai with ${order.aroma} aroma`
        default:
            return `Unknown chai type`
    }
}

function brew(order: MasalaChai | GingerChai) {
    if ("spicelevel" in order) {
        // do something
    }
}