// for of loop

/*
Syntax :
for (iterating_variable_name of iterable) {
    // Code block to execute
}

- iterable can be array, string, Map, Set, or any object with a [Symbol.iterator] method.

    What is [Symbol.iterator] ?
        It’s a property (a method) that an object must define to be considered iterable.  
        Built-in types are already iterable:
            - Arrays: [1, 2, 3][Symbol.iterator]()
            - Strings: "abc"[Symbol.iterator]()
            - Maps & Sets
            - DOM collections (e.g., NodeList)

- No Index by Default: Unlike a for loop, for...of directly accesses values, not indices. To get indices with an array, use .entries():

for (const [index, value] of fruits.entries()) {
    console.log(`${index}: ${value}`);
}

OUTPUT :
0: apple
1: banana
2: orange

- Not for objects

- Supports break and continue
*/

const arr  = [1, 2, 3, 4, 5] // array
for (const num of arr){
    console.log(num)
}
// 1 2 3 4 5 (note that it gives the value directly)

const greetings = "hello world" // string
for (const greet of greetings){
    console.log(`each char is ${greet}`)
}

/*
each char is h
each char is e
each char is l
each char is l
each char is o
each char is  
each char is w
each char is o
each char is r
each char is l
each char is d
*/

/*
What are maps ?
Map is a built-in object that stores key-value 
pairs, where both keys and values can be of any 
data type (unlike plain JavaScript objects, 
which use strings or symbols as keys)

- Maps preserve the order in which entries were 
added, making iteration predictable.

- Unlike objects, Maps don’t inherit properties 
from Object.prototype, avoiding conflicts with 
key names.

- Duplicate entries are not allowed

SYNTAX :
let map = new Map(); // Create an empty Map
let mapWithInitial = new Map([
    [key1, value1],
    [key2, value2],
    // ...
]); // Create a Map with initial key-value pairs

Map vs. Object
    
    - Keys:
        Map: Any data type (strings, numbers, objects, etc.).
        Object: Only strings or symbols.

    - Order:
        Map: Maintains insertion order for iteration.
        Object: Order of properties is not guaranteed (though modern JavaScript engines maintain property order).

    - Size:
        Map: Use map.size to get the number of entries.
        Object: Need to use Object.keys(obj).length or similar.

    - Performance:
        Map: Optimized for frequent additions/removals of key-value pairs.
        Object: Better for static data or when prototype properties are needed.
*/

const map = new Map()
map.set('IN', "India")
map.set('USA', "United States of America")
map.set('FR', "France")

for (const key of map){
    console.log(key);
}

/*
[ 'IN', 'India' ]
[ 'USA', 'United States of America' ]
[ 'FR', 'France' ]
*/

/*
typeof map is an object then why does for of work ?

typeof new Map() returns "object", which confirms
that a Map is a type of object. However, unlike 
plain JavaScript objects ({}), a Map is 
specifically designed to be iterable. This means
it implements the [Symbol.iterator] method, 
which allows it to work with for...of loops.
*/

for (const [key, value] of map){ // de-structuring the array
    console.log(key, ':-', value);
}

/*
IN :- India
USA :- United States of America
FR :- France
*/

// How to iterate over objects ? will use for in loop (can be used on arrays but best suited for objects)

// Syntax :
// for (variable in object) {
//     // Code block to execute
// }
const myObject = {
    js : "javascript",
    py : "python",
    cpp : "C++"
}
for (const key in myObject) {
    console.log(key); // console.log(myObject[key]) for value
}

// js
// py
// cpp

// if we apply for in loop on arrays then we get index/key instead of values
// won't work on maps

// for each loop

const coding = ["js", "ruby", "java", "python", "cpp"]
coding.forEach(function (val){ // this function here is callback function and doesn't have a name, val is the element of the array being processed
    console.log(val); 
})

// js
// ruby
// java
// python
// cpp

/*
callback function can also be an arrow function 
coding.forEach( (val) => { 
    console.log(val); 
})
*/

// we can declare a function seprately, then use it in for each loop
function printMe(item){
    console.log(item);
}
coding.forEach(printMe)

// can also access element, index, array simultaneously
coding.forEach((item, index, arr)=>{
    console.log(item, index, arr);
})

// js 0 [ 'js', 'ruby', 'java', 'python', 'cpp' ]
// ruby 1 [ 'js', 'ruby', 'java', 'python', 'cpp' ]
// java 2 [ 'js', 'ruby', 'java', 'python', 'cpp' ]
// python 3 [ 'js', 'ruby', 'java', 'python', 'cpp' ]
// cpp 4 [ 'js', 'ruby', 'java', 'python', 'cpp' ]

// how to iterate over an array of objects
const myCoding = [
    {
    lang : "javascript",
    filename : "js"
    },
    {
    lang : "python",
    filename : "py"
    },
    {
    lang : "java",
    filename : "java"
    }
]

myCoding.forEach((item) => {
    console.log(item.filename);
})

// js
// py
// java