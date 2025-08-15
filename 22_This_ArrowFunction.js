const user = {
    username: "hitesh",
    price: 999,
// this used to access variables confined here
    welcomemsg: function(){
        console.log(`${this.username}, welcome to the website`)
        console.log(this) // { username: 'hitesh', price: 999, welcomemsg: [Function: welcomemsg] }
    }
}
user.welcomemsg() // hitesh, welcome to the website
user.username = "sam" // username attribute will get overide
user.welcomemsg() // sam, welcome to the website

console.log(this); // {} why ? 
/*
value of this depends on the context used 
here it is used in global context and depends on the environment
i.e node here in this case

In Node.js, the global this in a module 
(outside any function) is not the global object 
(global in Node.js). Instead, it is an empty 
object ({}) because Node.js wraps module code in 
a function, and each module has its own scope.

==> In Node.js, when you write console.log(this) 
at the top level of a module, this refers to 
module.exports, which is initially an 
empty object {}.

In a browser, this in the global scope 
(in non-strict mode) refers to the window object, 
which is the global object. So, console.log(this) 
would output the window object, which contains 
many properties and methods
*/

// using 'this' in a function instead of an object

function chai(){
    console.log(this)
}

chai() // large object with many properties and methods.

/*
function chai(){
    let username = "hitesh"
    console.log(this)
}

chai() // in both the cases, we get same output
*/

function chai1(){
    let username = "kartik"
    console.log(this.username)
}

chai1() // undefined
/*
statement console.log(this.username) attempts to
access the username property of this (i.e., 
global.username in Node.js).
In Node.js, the global object does not have a 
username property by default
*/

//------------------Arrow function------------------

const chai2 = () => {
    let username = "hitesh"
    console.log(this); // { } & if it was this.name then it would have been undefined
}

chai2()

// basic syntax of arrow function
// const addTwo = (num1, num2) => {
//     return num1 + num2
// }
// console.log(addTwo(3, 4)) // 7

// implicit return 
const addTwo = (num1, num2) => (num1 + num2)
console.log(addTwo) // 7

/*
if we use { } then we may need to use return 
statement but if we want to avoid that then 
wrap { } in ()
*/

// how to return an object in arrow function
const takeName = (uname) => ({username: uname})
console.log(takeName("kartik")) //  {username: 'kartik' }

/*
Differences between function and arrow function :

Regular Function :
-arguments available
-can be used with constructor
-has prototype
-requires return 

Arrow Function :
-argumnets not available
-can't be used with constructor
-prototype not available
-implicit for single expression
*/