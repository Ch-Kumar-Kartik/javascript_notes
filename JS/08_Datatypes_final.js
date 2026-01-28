// way the data is stored and access has two type : call by value and call by refernce
/*
Data are divided into two categories : primitive and non primitive

There are 7 primitve types : String, Number, Boolean, null,
undefined, symbol, BigInt

They are call by value. When a function is called, a copy of the argument's value is passed to the function. Changes to the parameter inside the function 
do not affect the original value outside the function.

# How it works ?
- The function receives a copy of the primitive value.
- Any modifications to the parameter inside the function are made to the copy, not the original.

Reference (Non-primitve) : Array, objects, Functions
*/

// Simple symbol application
const id = Symbol('123')
const anotherID = Symbol('123')

console.log(id === anotherID);


