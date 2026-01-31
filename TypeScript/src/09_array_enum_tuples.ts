// array of different things
const chaiFlavours: string[] = ["masala", "adrak"]
const chaiPrice: number[] = [10, 20, 30]
const rating: Array<number> = [4.5, 5.0]
// array of objects
type chai = {
    name: string;
    price: number
}
const menu: chai[] = [
    { name: "Masala Chai", price: 20 },
    { name: "Adrak Chai", price: 25 }
]
// read only array 
const cities: readonly string[] = ["Delhi", "Mumbai", "Jaipur"]
// cities.push("pune") // error as read only

const table: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

// tuples (kind of array)
let chaiTuple: [string, number];
chaiTuple = ["Masala Chai", 20]
// chaiTuple = [20, "Masala Chai"] // error

let userInfo: [string, number, boolean?]
userInfo = ["kartik", 100, true]
userInfo = ["kartik", 100]
// user = [25, "Kartik"] // error

// read only tuples
const location: readonly [number, number] = [10, 20]
// location[0] = 30 // error
// location.push(30) // error

const chaiItems: [name: string, price: number] = ["Masala Chai", 25]

// enums 
enum CupSize {
    SMALL,
    MEDIUM,
    LARGE
}

const size = CupSize.LARGE
console.log(size)

// auto increment in enum 
enum Status {
    PENDING = 100,
    SERVED, // 101
    CANCELLED // 102
} // either assign values to all or none

enum ChaiType {
    Masala = "Masala",
    Adrak = "Adrak",
    Lemon = "Lemon"
}

function makeChai(type: ChaiType) {
    console.log(`Making ${type}`)
}

makeChai(ChaiType.Masala)
// makeChai("masala") // error 

// enums are usually heterogenous but can be homogeneous
enum RandomEnum {
    ID = 1,
    NAME = "chai",
} // not a good practice

const enum Sugars {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}

const s = Sugars.HIGH

let t: [string, number] = ["chai", 10]
t.push("extra")
