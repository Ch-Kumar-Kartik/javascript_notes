interface Chai {
    flavour: string
    price: number
    milk?: boolean
}

const masala: Chai = {
    flavour: "Masala",
    price: 20
}

interface Shop {
    readonly id: number
    name: string
}

const s: Shop = { id: 1, name: "chai code cafe" }
// s.id = 2 // error

// interfaces with methods
interface DiscountCalculator {
    (price: number): number
}

const apply50: DiscountCalculator = (p) => p * 0.5

interface TeaMachine {
    start(): void;
    stop(): void;
}

const machine: TeaMachine = {
    start() {
        console.log("start")
    },
    stop() { console.log("stop") }
}

interface chaiRatings {
    [flavour: string]: number
}

const ratings: chaiRatings = {
    masala: 4.5,
    ginger: 4.5,
}

interface User {
    age: number
}

interface User {
    name: string
}

const u: User = {
    name: "kartik",
    age: 20
}

// extending interfaces
interface A { a: string }
interface B { b: string }

interface C extends A, B { }

const c: C = {
    a: "a",
    b: "b"
}