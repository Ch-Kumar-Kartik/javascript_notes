// object declaration

// let tea: {
//     name: string;
//     price: number;
//     isHot: boolean;
// }
// tea = {
//     name: "Masala Chai",
//     price: 20,
//     isHot: true
// }

// type alias
type Tea = {
    name: string;
    price: number;
    ingredients: string[];
}

const adrakChai: Tea = {
    name: "Adrak Chai",
    price: 20,
    ingredients: ["ginger", "water", "masala"]
}

// structural typing (a form of duck typing)
type Cup = { size: string }
let smallCup: Cup = { size: "200ml" }
let bigCup = { size: "500ml", material: "porcelain" } // no errors due to bare minimum properties meeting
let anotherCup: Cup = bigCup // no errors
//let bigCup: Cup = {size: "500ml", material: "porcelain"} // error 
//let bigCup: Cup & {material: string} = {size: "500ml", material: "porcelain"} // fix for above error
// bigCup = smallCup // error

// splitting out datatypes (breaking down complex types into smaller, reusable pieces)
type Item = { name: string, quantity: number }
type Address = { street: string, pin: number } // a nested object matching the Address type

type Order = {
    id: string;
    items: Item[];
    address: Address
}

// defining data one way then using it other way (partial and required keyword)
type Chai = {
    name: string;
    price: number;
    isHot: boolean;
}

const updateChai = (updates: Partial<Chai>) => {
    console.log(updates);
}

updateChai({ price: 25 })
updateChai({ isHot: true })
updateChai({})

type ChaiOrder = {
    name?: string;
    quantity?: number;
}

const placeOrder = (order: Required<ChaiOrder>) => {
    console.log(order);
}

// placeOrder({}) // error
placeOrder({ name: "Masala Chai", quantity: 2 })

// pick keyword (used rarely)
/*
Pick<T, K> takes two arguments:

T — the source type (Chai1)
K — a union of property names to pick ("name" | "price")
*/
type Chai1 = {
    name: string;
    price: number;
    isHot: boolean;
    ingredients: string[]
}

type BasicChaiInfo = Pick<Chai1, "name" | "price">

const chaiInfo: BasicChaiInfo = {
    name: "Lemon Tea",
    price: 30
}

// omit keyword
type ChaiNew = {
    name: string;
    price: number;
    isHot: boolean;
    secretIngredients: string;
};

type PublicChaiInfo = Omit<ChaiNew, "secretIngredients">

