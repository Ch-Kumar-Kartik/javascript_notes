/*
unknown can be used instead of any 
(just a possible alternative)

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