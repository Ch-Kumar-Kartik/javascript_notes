// why need interface ?
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