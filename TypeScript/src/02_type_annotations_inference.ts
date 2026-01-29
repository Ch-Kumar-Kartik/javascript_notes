/* 
Type inferencing in TypeScript is basically 
TypeScript being smart enough to figure out types on 
its own, so you don’t always have to write them 
explicitly.
*/

let drink = "chai";
let cups = Math.random() > 0.5 ? 10 : '5';

// can automatically detect the type of cups while hovering

/*
Type annotations in TypeScript are the explicit 
types you write yourself to tell the compiler 
exactly what type something should have.

If type inference is TypeScript guessing,
type annotations are you declaring.
*/

let chaiFlavour: string = "masala chai"
chaiFlavour = "Ginger tea"