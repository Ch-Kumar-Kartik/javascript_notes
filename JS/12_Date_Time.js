let myDate = new Date() // type of myDate will be object
console.log(myDate) // 2025-05-19T12:18:00.731Z
console.log(myDate.toString()) // Mon May 19 2025 17:48:00 GMT+0530 (India Standard Time)
console.log(myDate.toLocaleString()) // 19/5/2025, 5:56:49 pm

let myCreatedDate = new Date(2023, 0, 23) // months in js start with 0
console.log(myCreatedDate.toDateString()); // Mon Jan 23 2023
console.log(myCreatedDate.toLocaleString()) // 23/1/2023, 12:00:00 am

let myCreatedDate2 = new Date("2023-01-14")
console.log(myCreatedDate2.toLocaleString()); // 14/1/2023, 5:30:00 am

// timestamps
let myTimeStamp = Date.now()
console.log(myTimeStamp); // 1747658438384 in ms
console.log(myCreatedDate.getTime()); // 1674412200000 in ms
// console.log(Math.floor(Date.now()/1000)); // time in sec

// extracting particular data
console.log(myCreatedDate.getMonth() + 1); // 1
console.log(myCreatedDate.getDay()); // 1

// .toLocaleString() in detail
myCreatedDate.toLocaleString('default', {
    weekday: "long",
    timeZone: null // just search on google, couldn't recall
})

