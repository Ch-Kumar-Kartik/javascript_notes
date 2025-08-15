// Stack => Primitive, LIFO => call by value
// Heap => Non Primitive => call by reference

let myYoutubename = "Harkiratsinghdotcom"

let anothername = myYoutubename
anothername = "chaiaurcode"

console.log(myYoutubename); // harkiratsinghdotcom
console.log(anothername); // chaiaurcode

/*
The variable myYoutubename is declared using let, which 
creates a slot in the stack memory for the current execution 
context (global scope in this case).

The string "Harkiratsinghdotcom" is a primitive value and is
stored directly in the stack, associated with myYoutubename.

Stack:
| myYoutubename: "Harkiratsinghdotcom" |

The variable anothername is declared, creating another slot
in the stack.

The value of myYoutubename (the string "Harkiratsinghdotcom")
is copied to anothername. Since strings are primitives, this 
is a call by value operation, meaning a copy of the string 
value is stored in the stack for anothername.

Both variables now reference the same string value, but 
they are independent copies in the stack.

Stack:
| myYoutubename: "Harkiratsinghdotcom" |
| anothername:   "Harkiratsinghdotcom" |

The variable anothername is reassigned a new string value, 
"chaiaurcode".

In the stack, the memory slot for anothername is updated to 
store the new string "chaiaurcode". This does not affect 
myYoutubename, as it holds a separate copy of its value in the
stack.

The original string "Harkiratsinghdotcom" associated with 
anothername is no longer referenced by it. JavaScript’s 
garbage collector may eventually handle any cleanup, 
though strings are often interned (reused) in memory for 
efficiency.

Stack:
| myYoutubename: "Harkiratsinghdotcom" |
| anothername:   "chaiaurcode"         |
*/

let userOne = {
    email: "user@google.com",
    ui: "user@ybl"
}

let userTwo = userOne

userTwo.email = "hitesh@google.com"

console.log(userOne.email); // hitesh@google.com 
console.log(userTwo.email); // hitesh@google.com

/*
The stack memory stores references to these heap-allocated 
objects.

The variable userOne is declared using let, creating a slot in
the stack memory for the global scope.

The object { email: "user@google.com", ui: "user@ybl" } is 
created and stored in the heap memory because it’s a 
non-primitive type with dynamic size (it can have varying 
properties).

The stack slot for userOne holds a reference (a memory address)
pointing to the object’s location in the heap.

Stack: | userOne: [reference to heap address] |
Heap:  [Address: { email: "user@google.com", ui: "user@ybl" }]

The variable userTwo is declared, creating another slot in 
the stack.

The value of userOne (the reference to the object in the heap) 
is copied to userTwo. This is call by sharing: the reference is 
copied, not the object itself.

Both userOne and userTwo now point to the same object in the 
heap. No new object is created in the heap.

Stack: | userOne: [reference to heap address] |
       | userTwo: [reference to same heap address] |
Heap:  [Address: { email: "user@google.com", ui: "user@ybl" }]

The statement userTwo.email = "hitesh@google.com" accesses the
object in the heap via the reference stored in userTwo.

It modifies the email property of the object in the heap, 
changing it from "user@google.com" to "hitesh@google.com".

Since userOne and userTwo reference the same object in the 
heap, this change affects the object for both variables.

Stack: | userOne: [reference to heap address] |
       | userTwo: [reference to same heap address] |
Heap:  [Address: { email: "hitesh@google.com", ui: "user@ybl" }]
*/



