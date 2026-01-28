// var c = 300
let a = 300

if (true) { // everything inside this is block scope
    let a = 10
    const b = 20
    var c = 30 // or c = 30
} // everything outside this is global scope

// console.log(a) // will give an error 
// console.log(b) // will give an error
// console.log(c) // 30

if (true){
    let a = 10
    const b = 20
    console.log("INNER: ", a);
}
console.log(a)
// Inner: 10
// 300

/*
Types of Scope:
Global Scope: Variables defined outside any function or block, accessible everywhere.
Function Scope: Variables declared with var inside a function, accessible only within that function.
Block Scope: Variables declared with let or const inside a block ({}), accessible only within that block (introduced in ES6).
Module Scope: Variables defined in a module, not globally accessible unless explicitly exported (more relevant in Node.js).
*/

// browser scope and node.js scope are two different things

