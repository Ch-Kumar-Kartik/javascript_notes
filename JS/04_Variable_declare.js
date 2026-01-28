const a_ID = 123
let a_email = "gk@gmail.com"
var a_pswd = "1234" // no longer used
a_city = "jaipur" // not a good practice

// { } this is called scope

let a_state; // when printing this value, it will show undefined in the the console
console.log(a_state)

/*
prefer not use var as causes issue in block scope and 
functional scope
*/

console.log(a_ID); // semicolon not a necessity 
console.table([a_ID, a_email, a_pswd, a_city]) // to print multiple variables together 

/*
## Why var is not used ?

- var is either globally scoped or function-scoped, 
not block-scoped. This means variables declared with 
var inside a block (e.g., {} in a loop or if statement) 
are accessible outside that block, which can lead to
unexpected behavior.

- var allows re-declaring the same variable in the 
same scope, which can overwrite values unintentionally.
*/