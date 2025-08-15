// objects can be declared as : singleton, literal, constructor 

// object literals
const mySym = Symbol("key1")

const JsUser = {
    name: "Hitesh",
    "full-name" : "Ch_Kumar_Kartik",
    // mySym : "mykey1",
    [mySym] : "myKey1",
    age: 18,
    location : "jaipur",
    email: "hitesh@google.com",
    isloggedIn : false,
    lastLoginDays: ["Monday", "Saturday"]
}

console.log(JsUser.email)
console.log(JsUser["email"])
// above are two ways of accessing the attributes of object but second one is better

console.log(JsUser["full-name"]) // JsUSer."full-name" is wrong and this is the only way to access this value
// console.log(typeof JsUser.mySym) // string
console.log(JsUser[mySym]) // this will be the only way to access and this time its type will be symbol

// freeze method
//JsUser.email = "kartik@google.com"
//Object.freeze(JsUser)
// no more changes can be made after line 28
//JsUser.email = "kartik@microsoft.com"
//console.log(JsUser) // email will be that on line 27

JsUser.greeting = function(){
    console.log("Hello JS user");
}

console.log(JsUser.greeting) // [Function (anonymous)], reference was returned
console.log(JsUser.greeting())

/*
JsUser.greeting (without parentheses) gives the function 
object itself, hence [Function (anonymous)].
JsUser.greeting() (with parentheses) calls the function, 
executing its code and returning its result.

The greeting function does not have a return statement. 
In JavaScript, any function that does not explicitly return 
a value implicitly returns undefined.
*/

// glance at 'this'
JsUser.greetingTwo = function(){
    console.log(`Hello JS user, ${this.name}`); // string interpolation along with 'this'
}

// this is used if want to reference the object itself (similar to self in python)
