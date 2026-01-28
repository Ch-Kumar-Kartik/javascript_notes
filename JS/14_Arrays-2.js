const marvel = ["thor", "ironman", "spidey"]
const dc = ["superman", "flash", "batman"]

marvel.push(dc);
console.log(marvel);

// [ 'thor', 'ironman', 'spidey', [ 'superman', 'flash', 'batman' ] ]
// consist of four elements: thor, ironamn, spidey, ["superman", "flash", "batman"]
// treating dc as an element

let ex = marvel.concat(dc) // will be an object 
console.log(typeof ex) // ["thor", "ironman", "spidey", "superman", "flash", "batman"]

const all_new_heroes = [...marvel, ...dc]
console.log(all_new_heroes); // ["thor", "ironman", "spidey", "superman", "flash", "batman"]

const another_array = [1, 2, 3, [4, 5, 6], 7, [6, 7, [4, 5]]]
const real_another_array = another_array.flat(Infinity) // depth is given as a parameter
console.log(real_another_array); 
/* [
  1, 2, 3, 4, 5,
  6, 7, 6, 7, 4,
  5
] */

// array conversion 
console.log(Array.isArray("kartik"))
console.log(Array.from("kartik")) // [ 'k', 'a', 'r', 't', 'i', 'k' ]
// object can't be converted to array and will return empty array an dneed to mention if the keys need to be made into array or values into array

let score1 = 100
let score2 = 200
let score3 = 300

console.log(Array.of(score1, score2, score3)) // [100, 200, 300]


