/* SYNTAX OF For Loop
for (let iterating_variable = starting_value; some_condition; increment/decrement_of_iterating_variable){
    .
    .
    .
}
*/

/*
for (let i = 0; i < 5; i++) {
    console.log(i);
}

Post-increment (i++): The current value of i is 
used in the loop body (e.g., for console.log(i)), 
and then i is incremented by 1 before the next 
iteration. For example, when i is 0, the body 
prints 0, and then i++ sets i to 1.

Pre-increment (++i): The value of i is 
incremented by 1 first, and then the new value 
of i is used in the loop body 
(e.g., for console.log(i)). 
However, in a standard for loop, since the 
increment occurs after the loop body executes, 
the current value of i is used in the body, and 
the pre-increment affects only the next 
iteration. For example, when i is 0, the body 
prints 0, and then ++i sets i to 1 before the 
next iteration.

If we replace i++ with ++i (pre-increment), the loop behaves the same in this case because the increment happens after the loop body executes, and the condition uses the updated value in the next iteration.
*/

// single for loop
for (let i = 0; i <= 10; i++){
    console.log(i);
}

// nested for loop
for (let i = 0; i <= 10; i++){
    console.log(i);
    for (let j = 0; j <= 10; j++){
        console.log(j);
    }
}

// if for loop is applied on an array and if 
// it goes out of bounds then undefined is 
// shown in terminal

// break and continue
/*
The break statement terminates the entire loop 
immediately when encountered, exiting the loop 
and moving to the code after it.
*/
let fruits = ["apple", "banana", "orange", "grape"];
for (let i = 0; i < fruits.length; i++) {
    if (fruits[i] === "orange") {
        break; // Stop the loop when "orange" is found
    }
    console.log(fruits[i]);
}

/*
apple
banana
*/

/*
The continue statement skips the rest of the 
current iteration and moves to the next 
iteration of the loop. It does not exit the 
loop entirely; it just bypasses the remaining 
code in the current iteration.
*/
let fruits1 = ["apple", "banana", "orange", "grape"];
for (let i = 0; i < fruits1.length; i++) {
    if (fruits1[i] === "orange") {
        continue; // Skip printing "orange" and move back to line 79
    }
    console.log(fruits1[i]);
}

/*
apple
banana
grape
*/

