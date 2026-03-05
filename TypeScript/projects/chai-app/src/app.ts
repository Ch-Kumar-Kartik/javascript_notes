// Concepts: Annotations, Inference, Union Types, Exhaustiveness, Default Params, Void, Complex Object Params
import { ChaiCategory, ChaiSize, OrderStatus, PaymentMethod } from "./types/enums"
import { Customer, Ingredient, ChaiRecipe, ChaiOrder } from "./types/interfaces"
import { ChaiMenuItem } from "./types/aliases"
import { Chai } from "./models/Chai"
import { CustomerRepository, OrderRepository } from "./models/Repository"
import { PriceCalculator, OrderValidator, OrderManager } from "./models/OrderManager"
import { DataService } from "./services/DataService"
import { MenuService } from "./services/MenuService"
import { handleChaiEvent, ChaiEvent, isChaiOrder } from "./utils/typeGuards"

const customerRepo = new CustomerRepository()
const orderRepo = new OrderRepository()
const priceCalculator = new PriceCalculator()
const validator = new OrderValidator()
const orderManager = new OrderManager(priceCalculator, validator)
const dataService = new DataService()

const menuItems: ChaiMenuItem[] = [
    { name: "Masala Chai", price: 50, isHot: true, ingredients: ["tea", "milk", "spices"] },
    { name: "Ginger Tea", price: 40, isHot: true, ingredients: ["tea", "ginger"] },
    { name: "Lemon Tea", price: 35, isHot: false, ingredients: ["tea", "lemon", "honey"] },
]
const menuService = new MenuService(menuItems)

const customer1: Customer = { id: 1, name: "Aman", phone: "9876543210" }
const customer2: Customer = { id: 2, name: "Priya" }  // no phone — optional!
const customer3: Customer = { id: 3, name: "Hitesh" }

customerRepo.add(customer1)
customerRepo.add(customer2)
customerRepo.add(customer3)

const masalaChai = new Chai({
    id: "chai-001",
    name: "Masala Chai",
    category: ChaiCategory.MASALA,
    ingredients: [
        { name: "Tea leaves", quantity: 10, unit: "grams" },
        { name: "Milk", quantity: 200, unit: "ml" },
        { name: "Cardamom", quantity: 3, unit: "pieces" },
    ],
    prepTimeMinutes: 8,
    secretIngredient: "a pinch of love"
})
const gingerTea = new Chai({
    id: "chai-002",
    name: "Ginger Tea",
    category: ChaiCategory.GINGER,
    ingredients: [
        { name: "Tea leaves", quantity: 10, unit: "grams" },
        { name: "Ginger", quantity: 5, unit: "grams" },
    ],
    prepTimeMinutes: 6,
})
const lemonTea = new Chai({
    id: "chai-003",
    name: "Lemon Tea",
    category: ChaiCategory.LEMON,
    ingredients: [
        { name: "Tea leaves", quantity: 10, unit: "grams" },
        { name: "Lemon", quantity: 10, unit: "ml" },
        { name: "Honey", quantity: 10, unit: "ml" },
    ],
    prepTimeMinutes: 6,
})

const order1 = orderManager.createOrder({
    items: [ChaiCategory.MASALA, ChaiSize.MEDIUM, 2],
    customer: customer1,
    paymentMethod: PaymentMethod.UPI,
})
console.log("Order created:", order1.orderId, "Total:", order1.totalPrice)

const order2 = orderManager.createOrder({
    items: [ChaiCategory.LEMON, ChaiSize.MEDIUM, 2],
    customer: customer2,
    paymentMethod: PaymentMethod.UPI,
})
console.log("Order created:", order2.orderId, "Total:", order2.totalPrice)

const order3 = orderManager.createOrder({
    items: [ChaiCategory.LEMON, ChaiSize.MEDIUM, 2],
    customer: customer3,
    paymentMethod: PaymentMethod.UPI,
})
console.log("Order created:", order3.orderId, "Total:", order3.totalPrice)

async function loadMenu() {
    const menu = await dataService.fetchChaiMenu()
    console.log("Menu loaded:", menu)

    const saved = await dataService.saveOrder(order1)
    console.log("Order saved:", saved.status, saved.data)
}
loadMenu()

const event1: ChaiEvent = { type: "order_placed", orderId: order1.orderId, customer: customer1 }
const event2: ChaiEvent = { type: "order_prepared", orderId: order1.orderId, timeInMinutes: 8 }
const event3: ChaiEvent = { type: "order_cancelled", orderId: "xyz", reason: "Out of stock" }
console.log(handleChaiEvent(event1))
console.log(handleChaiEvent(event2))
console.log(handleChaiEvent(event3))

function printOrder(order: ChaiOrder | string): void {
    if (typeof order === "string") {
        console.log("Order ID:", order)
    } else if (isChaiOrder(order)) {
        console.log("Order:", order.orderId, "| Status:", order.status, "| Customer:", order.customer.name)
    } else {
        console.log("Invalid order data")
    }
}

printOrder(order1)
printOrder(order1.orderId)

console.log("Welcome to ChaiCode Cafe!");
console.log("Starting Chai Shop Management System...");


