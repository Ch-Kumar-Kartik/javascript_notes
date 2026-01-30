// forceful type assertion
let response: any = "42"
// (response as string) is forcefull type assertion
let numericLength: number = (response as string).length

type Book = {
    name: string
}

let bookString = '{"name": "who moved my cheese"}';
let bookObject = JSON.parse(bookString) as Book

console.log(bookObject);

const inputElement = document.getElementById("username") as HTMLInputElement

// any vs unknown
/*
unknown is a type-safe alternative to any. When a 
variable is typed as unknown, 
TypeScript won't let you use it directly without 
first narrowing or asserting its type.

let value: any
value = "chai"
value = [1, 2, 3]
value = 2.5
value.toUpperCase() // no error will be shown here in IDE but will be in terminal

let newValue: unknown
newValue = "chai"
newValue = [1, 2, 3]
newValue = 2.5
newValue.toUpperCase() // error will be shown here in IDE

// using guards
if (typeof newValue === "string") {
    newValue.toUpperCase()
}
*/

// try-catch blog with guards
try {
    // do something
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
    console.log("Error", error);
}

const data: unknown = "chai aur code"
const strData: string = data as string

type Role = "admin" | "user"

function redirectBasedOnRole(role: Role): void {
    if (role === "admin") {
        console.log("redirecting to admin dashboard")
        return
    }
    if (role === "user") {
        console.log("redirecting to user dashboard")
        return
    }
    role; // on hovering the data type will be never
    /*
    This is useful: if you later add "moderator" to 
    the Role type but forget to handle it here, 
    TypeScript will show role as "moderator" instead 
    of never, alerting you to the unhandled case.
    */
}

function neverReturn(): never {
    while (true) { } // like servers, infinite loop serving requests
}

