// if 
if (condition){ } else { }

// To evaluate conditions, conditional operators will be used
// <, >, <=, >=, ==, !=, ===, !==
// Logical Operators : && (and), || (or), ! (not), ?? (Nullish Coalescing Operator), ?. (Optional Chaining Operator)


// if-else if
if (condition){

} else if (condition1){

} else { }

// switch 
/*
switch (key) {
    case value: 
        break;
        
    default: 
        break;
}
*/

const month = 3

switch (month){
    case 1:
        console.log("January");
        break;
    case 2:
        console.log("January");
        break;
    case 3:
        console.log("January");
        break;
    case 4:
        console.log("January");
        break;
    case 5:
        console.log("January");
        break;
    default:
        console.log("default case match");
        break;
}

// calculate the amount of an electricity bill for the following criteria.Units and charge per unit (Rs.) : First, 1-100 up to 0; Next, 101-200 up to 1.5; Next, 201-400 up to 2.5; 401 onwards 3.5
let units = 450;
let billAmount;

switch (true) {
  case (units <= 100):
    billAmount = units * 0; // First 100 units free
    break;
  case (units <= 200):
    billAmount = 100 * 0 + (units - 100) * 1.5; // First 100 free, next at 1.5/unit
    break;
  case (units <= 400):
    billAmount = 100 * 0 + 100 * 1.5 + (units - 200) * 2.5; // First 100 free, next 100 at 1.5, next at 2.5/unit
    break;
  default:
    billAmount = 100 * 0 + 100 * 1.5 + 200 * 2.5 + (units - 400) * 3.5; // First 100 free, next 100 at 1.5, next 200 at 2.5, rest at 3.5/unit
}

console.log(`Electricity Bill for ${units} units: ₹${billAmount.toFixed(2)}`);

/*
- Falsy Values 
false, 0, -0, BigInt 0n, "", null, undefined, NaN

- Truthy Values
"0", 'false', " ", [], {}, function(){}
*/

// correct way of checking if array is empty 
let ar = [] // this will be true
if (ar.length === 0){
    console.log(`array is empty`);
} // use .length property

// correct way of checking if object is empty
const emptyObj = {}
if (Object.keys(emptyObj).length === 0){
    console.log(`empty object`);
}

// Nullish Coalescing Operator (??): null undefined
let val1;
// val1 = 5 ?? 10 // 5
// val1 = null ?? 10 // 10
// val1 = undefined ?? 15 // 15
val1 = null ?? 10 ?? 20 // 10
console.log(val1);

// Terniary Operator
// condition ? true : false
const iceTeaPrice = 100
iceTeaPrice <= 80 ? console.log("less than 80") : console.log("more than 80")
// more than 80


