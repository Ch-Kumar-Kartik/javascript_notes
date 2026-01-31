function serveTheChai(teaName: string, quantity: number): string {
    return `Serving ${quantity} cups of ${teaName}`
}

serveTheChai("Masala Chai", 2)

function makeOrder(order: string): string | null {
    if (!order) return null
    return order
}

// logger function 
function logChai(): void {
    console.log("chai is ready")
}

// default and optional parameters in a function
function orderChai(category: string = "Masala", quantity?: number) {
    console.log(category, quantity)
}

// complex input parameters

function createChai(order: {
    type: string;
    sugar: number;
    size: "small" | "large"
}): number {
    return 404
}