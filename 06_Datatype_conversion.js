let score = "33"
console.log(typeof score); // to check the datatype

// converting from string to a number
let valueIntNumber = Number(score) // Number with 'N'
console.log(typeof valueIntNumber);
console.log(valueIntNumber);

let score2 = "33abc"
let valueIntNumber2 = Number(score2);
console.log(typeof valueIntNumber2); //output will be number 
console.log(valueIntNumber2); // output will be Nan as its not a valid number 

let score3 = null
let valueIntNumber3 = Number(score3);
console.log(typeof valueIntNumber3); //output will be number 
console.log(valueIntNumber3); // output will be 0

let score4 = undefined 
let valueIntNumber4 = Number(score4);
console.log(typeof valueIntNumber4); //output will be number 
console.log(valueIntNumber4); // output will be Nan

// in case of boolean conversion it will be 0 or 1 and vice versa
// converting an empty string to boolean gives false and non empty string gives true

