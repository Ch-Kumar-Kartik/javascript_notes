const myArr = [0,1, 2, 3, 4, 5, true, 'kartik'] // array in js hetrogenous

const myArr2 = new Array(1, 2, 3, 4); // other way to define

/*
- arrays are dynamic or resizable
- array copy operations create shallow copies

What are shallow copies ?
a copy whose properties share the same references as those of the 
source object from which the copy was made

What are deep copies ?
a copy whose properties do not share the same reference (point to teh underlying values)
as those of the same source object from which the copy was made.
*/

// Array methods

myArr.push(6) // appends 6
myArr.pop() // removes the last element

myArr.unshift(9) // not the best way, as if there are 10k elements then it will be time consuming to shift each element
// will add/prepend 9 to the array

myArr.shift() // Removes the first element

/*
Mutable Objects-
-Can be modified in place (e.g., changing elements, 
adding/removing items).
-Operations on mutable objects directly affect the original 
data.
Examples in JavaScript: Arrays, Objects.

Immutable Objects-
-Cannot be changed after creation.
-Operations return a new copy with the desired changes, 
leaving the original unchanged.
Examples in JavaScript: Strings, Numbers, 
Booleans (primitives are immutable by default).

Mutable array methods : 
.push() - Adds one or more elements to the end.
.pop() - Removes the last element.
.shift() - Removes the first element.
.unshift() - Adds one or more elements to the beginning.
.splice() - Adds, removes, or replaces elements at a 
specific index.
.sort() - Sorts the array in place.
.reverse() - Reverses the array's order.
.fill() - Fills all or part of the array with a static value.
.copyWithin() - Copies part of the array to another location 
within the same array.

Non-mutable array methods :
.concat() - Merges two or more arrays, returning a new array.
.slice() - Returns a shallow copy of a portion of the array.
.map() - Creates a new array with the results of calling a function on each element.
.filter() - Creates a new array with elements that pass a test.
.reduce() - Reduces the array to a single value (doesn’t modify the array).
.reduceRight() - Same as reduce, but from right to left.
.forEach() - Executes a function for each element (no return value, no mutation unless the callback modifies the array).
.every() - Tests if all elements pass a condition, returns a boolean.
.some() - Tests if at least one element passes a condition, returns a boolean.
.includes() - Checks if an element exists, returns a boolean.
.indexOf() - Returns the first index of an element or -1.
.lastIndexOf() - Returns the last index of an element or -1.
.join() - Joins all elements into a string.
.toString() - Returns a string representation of the array.
.flat() - Creates a new array with flattened sub-arrays.
.flatMap() - Maps each element and flattens the result into a new array.
*/

console.log(myArr.includes(7)) // checks whether this element exit or not
console.log(myArr.indexOf(3)); // returns the index of element

const  newArr = myArr.join() // it binds and converts to a string

console.log(myArr) // [ 0, 1, 2, 3, 4, 5, true, 'kartik' ]
console.log(newArr); // 0,1,2,3,4,5,true,kartik => string

// splice and slice 

console.log("A => original array: ", myArr)

const myn1 = myArr.slice(1, 3)

console.log("sliced array ", myn1)

console.log("B => original array: ", myArr)

const myn2 = myArr.splice(1, 3)
console.log("C => original array after splicing: ", myArr)
console.log("spliced array: ", myn2)

/*
.slice() [array.slice(start, end)]
Purpose: Extracts a portion of an array and returns it as a 
new array without modifying the original array.
Mutability: Non-mutating (does not change the original array)
Returns: A new array containing the extracted elements

(basically copies)

.splice() [array.splice(start, deleteCount, item1, item2, ...)]
Purpose: Modifies an array by adding, removing, or replacing
elements at a specific index.
Mutability: Mutating (changes the original array).
Returns: An array containing the removed elements 
(empty array if none removed)

(modifies an array)
*/




