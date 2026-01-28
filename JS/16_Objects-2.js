// Object Singleton and Constructor

const tinderuser = new Object() // singleton object
// const tinderuser = {} // non singleton object
// both are of the same type

tinderuser.id = "123abc" // defining the attributes
tinderuser.name = "Sam"
tinderuser.isLoggedIN = false

/*
SINGLETON-
Singleton object is one that is instantiated only 
once in the program, and any attempt to create 
another instance returns the same 
object (because the constructor enforces it)

commonly achieved using:

- Object Literals (Simplest Approach)
- Immediately Invoked Function Expressions (IIFE)
- ES6 Classes with Static Instance

CONSTRUCTOR-
A constructor in JavaScript is a special function 
or method used to create and initialize objects. 
Constructors are invoked with the 'new' keyword or 
defined within ES6 classes.
*/

// combining the objects

const obj1 = {1: "a", 2: "b"}
const obj2 = {3: "c", 4: "d"}

console.log({obj1, obj2}); // say this obj3, then obj3 = { obj1: { '1': 'a', '2': 'b' }, obj2: { '3': 'c', '4': 'd' } }, comprising of two obj
const obj3 = Object.assign(obj1, obj2)
console.log(obj3) // {'1': 'a', '2': 'b', '3': 'c', '4': 'd'}
// .assign() copies

/* Object.assign() here inside assign(target, source)
so .assign(obj1, obj2), here obj1 is target and obj2 
is source so obj2 is added to obj1 and obj1 i.e target 
is returned, better practice is to : .assign({}, obj1, obj2),
so {} is the target (returned obj), and obj1, obj2 are sources 
which get appended to {} */

console.log(Object.assign({}, obj1, obj2))

const objthree = {...obj1, ...obj2} // spread operator (best way)
console.log(objthree) // { '1': 'a', '2': 'b', '3': 'c', '4': 'd' }

// converting keys/values to arrays
console.log(Object.keys(tinderuser)); // [ 'id', 'name', 'isLoggedIN' ]
console.log(Object.values(tinderuser)); // [ '123abc', 'Sam', false ]

// converting key-value pairs to array of arrays
console.log(Object.entries(tinderuser)) // [ [ 'id', '123abc' ], [ 'name', 'Sam' ], [ 'isLoggedIN', false ] ]

// checking if an object consist of an attribute or not 
console.log(tinderuser.hasOwnProperty('isLoogedIn')); // returns boolean value 

 
