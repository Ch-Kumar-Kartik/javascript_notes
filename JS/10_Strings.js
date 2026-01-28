let var1 = "name"
let var2 = 50

console.log(`Hello my name is ${var1} and my repo count is ${var2}`); // known as string interpolation

// above method is better than console.log(var1 + var2 + " value")

const gameName = new String('kartik')

// similar to java new is used to create an instance of object 'String'
// object created with new String() will be stored in heap with additional memthods like length, toUpperCase() etc)

console.log(gameName)// [String: 'kartik']
console.log(typeof gameName) // obj
console.log(gameName[0]); // k
console.log(gameName.__proto__); // {}

console.table([gameName.length, gameName.toUpperCase(), gameName.charAt(2)])
console.table([gameName.indexOf('t'), gameName.substring(0,4), gameName.slice(-5)])

let newstr = " jfk "
console.log(newstr.trim())

const url = "https://hitesh.com/hitesh%20choudhary"
console.log(url.replace('%20', '-')) // https://hitesh.com/hitesh-choudhary
console.log(url.includes('hitesh')) // output will be boolean

const idkwhattonamethis = new String('kartik-kk-com')
console.log(idkwhattonamethis.split('-')); // [ 'kartik', 'kk', 'com' ]






