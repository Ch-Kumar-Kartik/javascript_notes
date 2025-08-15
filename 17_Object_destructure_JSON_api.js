// de-structuring is done for objects and arrays
/*
Array destructuring example :
const array = [1, 2, 3];
const [a, b, c] = array;
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
The array [1, 2, 3] is destructured, 
assigning 1 to a, 2 to b, and 3 to c.
*/ 

const course = {
    coursename: "js in hindi",
    price: "999",
    courseInstructor: "chaiaurcode"
}

// course.courseInstructor (traditional way)

const {courseInstructor} = course // {} indicate object destructuring
console.log(courseInstructor); // chaiaurcode

/* destructuring creates a variable named 
courseInstructor and assigns it the value of 
course.courseInstructor (i.e., "chaiaurcode") */

// const {courseInstructor: instructor} = course
// here instructor is alias for courseInstructor


//------------------API-------------------

// JSON is basically an object withou any name
// JSON is the data format for API

/*
{
    "name": "hitesh", // sample json format
    "coursename": "js in hindi",
    "price": free
}
*/

// sometimes it can be in array format

/*
[
    {
    "name": "hitesh", // sample json format
    "coursename": "js in hindi",
    "price": free
    }
    {
    "name": "hitesh", 
    "coursename": "js in hindi",
    "price": free
    }
]
*/

