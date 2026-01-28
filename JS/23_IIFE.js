// Immediately Invoked Function Expression (IIFE)

// Why are iife used :
/*
1 Avoid Polluting Global Scope:
Variables declared inside an IIFE are not accessible outside, preventing conflicts with other scripts.
(function() {
    var localVar = "I'm private";
    console.log(localVar); // I'm private
})();
console.log(typeof localVar); // undefined (not in global scope)

2 Data Privacy:
IIFEs create a private scope, mimicking block-level scoping before let and const were introduced in ES6.
(function() {
    var secret = "Hidden data";
    console.log(secret); // Hidden data
})();
// secret is not accessible here

3 Initialization Code:
IIFEs are useful for one-time setup or initialization tasks, like setting up event listeners or configuring an app.
(function() {
    console.log("App initialized!");
    // Setup code here
})();

4 Module Pattern:
Before ES6 modules, IIFEs were used to create modular code by returning an object with controlled access to internal variables (closure).
var myModule = (function() {
    var privateVar = "I'm private";
    return {
        getVar: function() {
            return privateVar;
        }
    };
})();
console.log(myModule.getVar()); // I'm private
console.log(myModule.privateVar); // undefined

The parentheses around the function (function() {...}) ensure JavaScript treats it as an expression, not a declaration.
The trailing () invokes the function immediately.
Any variables declared with var, let, or const inside the IIFE are scoped to the function and don’t leak to the global object (e.g., window in browsers).

// Arrow Function IIFE:
Using arrow function syntax for brevity.
(() => console.log("Arrow IIFE"))(); // Arrow IIFE

// with global objects
(function(global) {
    global.myVar = "Set globally";
})(window);
console.log(window.myVar); // Set globally
*/

(function chai(){ // this here is named iife as its name is chai
    console.log(`DB CONNECTED`)
})(); // syntax is (some function)()

// arrow function iife

(()=>{
    console.log(`DB CONNECTED THREE`)
})(); // DB CONNECTED THREE

// always remember that after an iife, a ';' is a must
// (function chai(){
//     console.log(`DB CONNECTED`)
// })() // note that semicolon is missing
// // an error will occur now
// (function aurcode() {
//     console.log(`DB CONNECTED TWO`)
// })()

// arrow function with parameter and iife
((name)=>{ // unamed iife
    console.log(`DB HAS BEEN CONNECTED MR. ${name}`)
})("kartik"); // DB HAS BEEN CONNECTED MR. kartik

