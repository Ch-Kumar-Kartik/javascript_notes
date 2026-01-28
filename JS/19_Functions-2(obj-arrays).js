// functions with objects and arrays

function calculateCartPrice(...num1){
    return num1
}
// ...num1, which collects all arguments passed to the function into an array named num1
console.log(calculateCartPrice(200, 400, 500, 2000))
// [ 200, 400, 500, 2000 ]

function calculateCartPrice1(val1, val2, ...num1){
    return num1
}
console.log(calculateCartPrice(200, 400, 500, 2000))
// here val1 = 200, val2 = 400, rest goes into num1
// [500, 2000] , remaining arguments (500, 2000) are collected into the array num1 using the rest parameter.

const customer = {
    username: "hitesh",
    prices: 199
}

function handleObjects(anyobject){
    console.log(`Username is ${anyobject.username} and price
        is ${anyobject.price}`)        
}

handleObjects(customer)
// Username is hitesh and price is undefined
// say a typo was made from price to prices, how to handle ?
// to solve this would have to check whether argument is a object or not, ts could be better here but can be done in js also with few extra lines

// can pass default object as an argument to deal with undefined value
 