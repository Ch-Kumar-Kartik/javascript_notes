console.table([2+2, 2*2, 2-2, 2/3, 2%3, 2**3]) // various opoerations 
let str1 = "hello"
let str2 = " kirat"
console.log(str1+str2) // string concatenation

console.log("1"+2); // or console.log(1+"2") will yield 12
console.log("1"+2+2); // were expecting 14 but output will be 122
console.log(1+2+"2"); // output will 32 

/*
if string comes first then after concatenate operator
rest of the data will be treated as a string as seen in the 2nd
example but if number comes first then arithmetic operation 
takes place first then string concatenation as seen in 3rd eg
*/

// assignment operator 
let d = b = c = 10; // not a good practice
// good ways 
let [e, f, g] = [10, 10, 10];
const h = 10, j = 10, k = 10;

// increment operators

    // postfix (x++) : increment operator increments and returns the value before incrementing.
    // The current value of x is used in the expression.
    // Then, x is incremented by 1.
let x = 5; 
const y = x++; // y gets the current value of x (5), then x is incremented to 6
console.log(x, y);
// x is 6; y is 5

let x2 = 3n;
const y2 = x2++;
// x2 is 4n; y2 is 3n

    // prefix (++x) : increment operator increments and returns the value after incrementing.
    // x is incremented by 1 first.
    // The new value of x is used in the expression.

let a = 5;
const b = ++x; // // a is incremented to 6, then b gets the new value (6)
// x is 6; y is 6

let x3 = 3n;
const y3 = ++x3;
// x3 is 4n; y3 is 4n

// decrement operator

    // postfix (x--) : Decrements the variable's value by 1 after returning its current value for use in the expression
let X = 5;
let Y = x--; // y gets the current value of x (5), then x is decremented to 4
console.log(Y); // 5
console.log(X); // 4  

    // prefix (--x) : Decrements the variable's value by 1 before returning the new value for use in the expression.
let A = 5;
let B = --x; // x is decremented to 4, then y gets the new value (4)
console.log(B); // 4
console.log(A); // 4

// comparison 
// while compairing make sure the datatype is same 

console.log("2">1); // output will be true as JS will convert str to int
console.log("02">1); // same as above, leading zeros will be removed

console.log(null > 0); // false
console.log(null == 0); // false
console.log(null >= 0); // true

// in case of undefined , result will be false in every case 

/*
The reason is that an equality check == and comparisons > < >= <= 
work differently. Comparisons convert null to a number, treating it as 0
That's why in 3rd example gives true output and first example i.e
null > 0 is false
*/ 

// In JavaScript, the strict equality operator (===) compares two values for equality without performing type coercion