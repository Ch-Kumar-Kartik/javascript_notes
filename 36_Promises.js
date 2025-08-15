// there are two things to consider promise creation and promise consumption

/*
The new Promise constructor takes a function 
(called the executor) as an argument. This executor 
function receives two parameters: resolve and reject, 
which are functions provided by the JavaScript 
engine.
- resolve(value): Called to mark the promise as 
fulfilled, optionally passing a value to the 
consumer.
- reject(error): Called to mark the promise as 
rejected, passing an error to the consumer.
*/

// creating the promise
const promise1 = new Promise(function(resolve, reject){
    /*
    Promise constructor takes a function 
    (called the executor) with two parameters: 
    resolve and reject. These are functions provided 
    by JavaScript to control the promise’s state
    */
    // do an async task
    // DB calls, cryptography, network
    setTimeout(function(){ // executor function and runs immediately when the promise created here it schedules a callback to run after a specified delay
        console.log('async task is complete')
        resolve()
    }, 1000)
})

/*
When const promise1 = new Promise(...) runs, the executor function is 
executed synchronously (immediately).
Inside the executor, setTimeout schedules its callback to run after 
1 second. This callback is placed in the macrotask queue 
(part of JavaScript’s event loop).
At this point, promise1 is in the pending state, waiting for the 
setTimeout callback to run and call resolve()
*/

// promise consumption
promise1.then(function(){  // The .then() method registers a callback to be executed when promise1 resolves (i.e., when resolve() is called)
    console.log('promise consumed')
})

/*
When the promise transitions to the fulfilled state 
(after resolve() is called), this callback is added to the 
microtask queue (another part of the event loop, discussed below)
The callback logs 'promise consumed' to the console

.then() callback does not execute immediately. It waits for the promise 
to resolve.
Since the promise only resolves after the setTimeout callback runs 
(after 1 second), the .then() callback is guaranteed to run after the 
'async task is complete' log

-> output of the above code snippet is :

sync task is complete
promise consumed

note that promis consumed will never be printed before async task is complete
*/

// promise creation and consumption all in a single step
new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log("async task 2");
        resolve()
    }, 1000)

}).then(function(){
    console.log("async 2 resolved");
})

/*
async task 2
async 2 resolved
*/

const promise3 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve({username : "chai", email : "chai@exmaple.com"})
   }, 1000)     
})

promise3.then(function(user){
    console.log(user);
})

const promise4 = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = true
        if (!error){
            resolve({username : "kartik", password : "123"})
        } else {
            reject('error : something went wrong')
        }
    }, 1000)
})

// const username = promise4.then((user) => {
//     console.log(user);
//     return user.username
// })

// console.log(username)

// output : Promise { <pending> }

/*
What is happening here ?

If error is false (!error is true), it calls 
resolve({username: "kartik", password: "123"}), fulfilling the promise 
with a user object.

If error is true (as it is here), it calls reject('error: something went 
wrong'), rejecting the promise with an error message.
Since error is true, the promise will reject after 1 second, and resolve 
will not be called.

Key Points:

The promise starts in the pending state when created.
The setTimeout schedules the callback to run after 1000 milliseconds, 
adding it to the macrotask queue in the event loop.
The error variable determines whether the promise resolves or rejects. 
Here, it rejects due to error = true.

The .then() method attaches a callback to handle the fulfilled state 
of Promise4.
The callback expects a user parameter (the resolved value) and does two 
things:
- Logs the user object to the console.
- Returns user.username.
However, since Promise4 will reject (because error = true), this 
.then() callback will not execute.
Importantly, .then() returns a new promise that resolves to the value 
returned by its callback (or rejects if an error occurs). Here, 
username is assigned this new promise.

Since the original promise (Promise4) rejects, the new 
promise (username) will also reject with the same error 
message ('error: something went wrong'), and the .then() 
callback won’t run.

The username variable is a new promise returned by .then(), not the 
user.username value directly.
If Promise4 had resolved, username would be a promise that resolves to 
"kartik" (the value returned by user.username)

Since username is the promise returned by .then(), and this code runs 
synchronously (before the 1-second setTimeout delay), username is still 
in the pending state when logged.
*/

// will use chaining and catch now for promise4

promise4.then((user) => {
    console.log(user);
    return user.username
}).then((username) => {
    console.log(username);
}).catch(function(error){
    console.log(error);
}).finally(() => console.log("the promise is either resolved or rejected"))

// output : error: something went wrong

/*
What Happened in this case ?

The new Promise constructor (from Promise4 definition) runs immediately,
scheduling the setTimeout callback in the macrotask queue to run after 1 
second.
Promise4 is in the pending state.
The .then().then().catch() chain is set up, registering callbacks but not 
executing them (since Promise4 is pending).
Synchronous code execution finishes.

After 1 Second :
The setTimeout callback is dequeued from the macrotask queue and runs.
It checks error, which is true, so it calls reject('error: something went wrong').
This transitions Promise4 to the rejected state with the reason 'error: something went wrong'.
The rejection propagates through the chain:
The first .then() callback is skipped because Promise4 rejected.
The second .then() callback is skipped because the first .then()’s promise also rejects (propagating the error).
The .catch() callback is triggered, receiving the rejection reason ('error: something went wrong') as error.

When Promise4 rejects, the .catch() callback is added to the microtask queue.
After the setTimeout callback (a macrotask) completes, the event loop 
processes the microtask queue, executing the .catch() callback.
This ensures the error is logged shortly after the 1-second delay.
*/

// but what if error is false

/*
After 1 second, the setTimeout callback calls resolve
({username: "kartik", password: "123"}).

Promise4 transitions to fulfilled with the value 
{username: "kartik", password: "123"}.

The first .then() callback runs:
Logs {username: "kartik", password: "123"}.

Returns user.username ("kartik").

The promise returned by the first .then() resolves to "kartik".

The second .then() callback runs:
Receives "kartik" as username and logs it.

The .catch() callback is skipped because there’s no rejection.

-> output in this case : 
{ username: 'kartik', password: '123' }
kartik
*/

const promise5 = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = true
        if (!error){
            resolve({username : "javascript", password : "123"})
        } else {
            reject('error : js went wrong')
        }
    }, 1000)        
    })

async function consumePromise5(){   // some difficulties in handling errors directly
    const response = await promise5
    console.log(response)
}

consumePromise5() 

/*
the promise is either resolved or rejected
node:internal/process/promises:288
           triggerUncaughtException(err, true /* fromPromise) ;
           ^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "error : js went wrong".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
*/

// since error = true we will be getting errors so will try to resolve it using try catch

async function consumePromisefive() {
    try {
        const response = await promise5
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

consumePromisefive()

// error : js went wrong

/*
The async keyword declares a function that returns a promise.
The await keyword pauses execution inside the async function until the 
promise resolves or rejects, making the code read like sequential logic.
Errors are handled using a try/catch block, similar to synchronous error 
handling.
*/

// fetch

async function getAllUsers(){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users') // returns a promise (which is an object)
        const data = response.json() // converting to json as it comes in string (Without await, response.json() returns a promise (in the pending state), not the parsed data.)
        console.log(data) // console.log(data) logs the promise object (e.g., Promise { <pending> }) because the JSON parsing hasn’t completed yet.
    } catch (error) {
        console.log("E: ", error)
    }
}

getAllUsers()

// but when we run this code, there will be error
// After the promise resolves (asynchronously), the data isn’t logged because the console.log(data) runs synchronously before the parsing completes.
/* The code doesn’t throw an error because response.json() is a valid operation that returns a promise. The issue is that the code doesn’t wait for the promise to resolve, so it logs the promise itself instead of the parsed data.
If the fetch fails (e.g., network error) or response.json() fails (e.g., invalid JSON), an error would be thrown, caught by the catch block, and logged as "E: [error message]". */ 

async function getAllUsers(){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users') // returns a promise (which is an object)
        const data = await response.json() // By adding await, const data = await response.json() pauses the async function until the promise resolves, assigning the actual parsed data (an array of user objects) to data. For the API https://jsonplaceholder.typicode.com/users, the resolved data is an array of objects
        console.log(data)
    } catch (error) {
        console.log("E: ", error)
    }
}

/*
Why Was await Needed for response.json()?

The fetch API’s Response object provides .json(), which reads the response body and parses it as JSON. This is an asynchronous operation because parsing the response stream takes time, so .json() returns a promise.
Without await, you get the promise itself, not the resolved value, leading to the incorrect output in the first version (Promise { <pending> }).
*/

// writing the above code with .then() and .catch()

 fetch('https://api.github.com/users/ch-kumar-kartik')
 .then((response) => {
    return response.json()
 })
 .then((data) => {
    console.log(data)
 })
 .catch((error) => console.log(error))

 // here in the output our github data comes first then rest of the above code's output

 