const coding = ["js", "ruby", "java", "python", "cpp"]

const values = coding.forEach( (item) => {
    console.log(item);
    // return item // will never return, for each loop doesn't return  
})

console.log(values); // undefined

// filter function which does return
const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const newNums = myNums.filter((num) => (num > 4)) // returns
console.log(newNums)

// recall arrow function with {} and ()
/*
const newNums = myNums.filter((nums)=>{
    num > 4
})
console.log(newNums);
// here this will be empty to fix this follow the two methods below

// method-1 add () to wrap around {}
const newNums = myNums.filter((nums)=>({
    num > 4
}))
console.log(newNums); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// method-2 because whenever we use {} it starts a scope and
need return statement
const newNums = myNums.filter((nums)=>{
    return num > 4 // added the return keyword
})
console.log(newNums); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*/

// what if i want to use forEach loop instead of filter 
const newNums1 = []

myNums.forEach((nums)=>{
    if (nums > 4){
        newNums1.push(nums)
    }
})
console.log(newNums1)

// filter function on an array of object
const books = [
  { title: "To Kill a Mockingbird", genre: "Fiction", publishYear: 1960 },
  { title: "1984", genre: "Dystopian", publishYear: 1949 },
  { title: "The Great Gatsby", genre: "Fiction", publishYear: 1925 },
  { title: "Dune", genre: "Science Fiction", publishYear: 1965 },
  { title: "Pride and Prejudice", genre: "Romance", publishYear: 1813 },
  { title: "Hitler's Blue Ball", genre: "History", publishYear: 1914 }
];

let userBook = books.filter((bk)=> (bk.genre === 'History'))
console.log(userBook)
// [
//   { title: "Hitler's Blue Ball", genre: 'History', publishYear: 1914 }
// ]

// userBook = books.filter((bk) => {return bk.publishYear >= 1950})
// console.log(userBook)

// talking about .map() function
const myNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let myN = myNum.map((num)=>{return num + 10})
console.log(myN)
// [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

/*
"Method/Loop"   "Purpose",                              "Returns",      "Mutates Original",             "Best Used For",                                            "Works With"

"map",          "Transform each element",               "New array",    "No",                           "Creating a new array with transformed values",             "Arrays"
"filter",       "Select elements based on condition",   "New array",    "No",                           "Creating a new array with filtered values",                "Arrays"
"forEach",      "Execute a function for each element",  "undefined",    "Can (if callback mutates)",    "Side effects (e.g., logging, updating external state)",    "Arrays"
"for...in",     "Iterate over object properties",       "Nothing",      "Can (if loop modifies)",       "Object properties",                                        "Objects (not recommended for arrays)"
"for...of",     "Iterate over values of iterables",     "Nothing",      "Can (if loop modifies)",       "Iterating over array/string values",                       "Iterables (arrays, strings, maps, sets)"
*/

// concept of chaining (using multiple functions)

myN = myNum
        .map((num) => num * 10) // num here is the element of the array (say 1)
        .map((num) => num + 1) // num here is the value generated in the first map which has been multiplied by 10 (say num = 1 in previous map then num = 10)
        .filter((num) => num >= 40)

// reduce fucntion
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, currentValue) => (accumulator + currentValue), 0); // where 0 is the intial value
console.log(sum); // 10
/*
Start with accumulator = 0 (initial value).
For currentValue = 1: 0 + 1 = 1 (new accumulator).
For currentValue = 2: 1 + 2 = 3.
For currentValue = 3: 3 + 3 = 6.
For currentValue = 4: 6 + 4 = 10.
Return 10 as the final value.
*/

const cart = [
  { course_name: "JavaScript Basics", price: 50 },
  { course_name: "Advanced Python", price: 80 },
  { course_name: "Web Development", price: 120 },
  { course_name: "Data Science Intro", price: 100 }
];
// say we also have a tax = 100 on the total of this cart
const total = cart.reduce((accumulator, current_val) => (accumulator + current_val.price), 100)
console.log(total) // 450


