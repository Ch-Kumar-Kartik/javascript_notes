const score = 400 
console.log(score);

const balance = new Number(100)
console.log(balance); // this here will be an object

console.log(balance.toString().length)
console.log(balance.toFixed(2)) // 100.00

const otherNumber = 123.89596
console.log(otherNumber.toPrecision(4)); // 123.9

const hundreds = 1000000
console.log(hundreds.toLocaleString('en-IN')); // 10,00,000

// can also use methods like MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, MAX_VALUE, MIN_VALUE

console.log(Math); // with 'M', is itself an object
console.log(Maths.abs(-4));
console.log(Math.round(4.3))
console.log(Math.ceil(4.2))
console.log(Math.floor(4.9))
console.log(Math.min(4,3,6,8));
console.log(Math.max(4,3,6,8));
console.log(Math.random()); // value lies between 0 and 1
console.log((Math.random()*10) + 1); // in general can say (Math.floor(Math.random()*(max-min+1))))
// adding 1 in case we want at least one 


