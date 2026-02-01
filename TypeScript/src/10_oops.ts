// simple class and object example
/*
class Chai {
    flavour: string;
    price: number

    constructor(flavour: string, price: number) {
        this.flavour = flavour
        this.price = price
    }
}

const masalaChai = new Chai("ginger", 25)
masalaChai.flavour = "masala"
*/

// access modifiers
class chai {
    public flavour: string = "Masala"
    private secretIngredients: string = "Cardamom"

    reveal() {
        return this.secretIngredients // method to show 
    }
}

class Shop {
    protected shopName = "Chai corner"
}

class Branch extends Shop {
    getName() {
        return this.shopName
    }
}

class Wallet {
    #balance = 100 // private variable

    getBalance() {
        return this.#balance
    }
}

const w = new Wallet()
w.getBalance()

class Cup {
    readonly capacity: number = 250

    constructor(capacity: number) {
        this.capacity = capacity
    }
}

// control gates (get and set)
class ModernChai {
    private _sugar = 2

    get sugar() {
        return this._sugar
    }

    set sugar(value: number) {
        if (value > 5) throw new Error("Too much sugar")
        this._sugar = value
    }
}

const c = new ModernChai()
c.sugar = 10

// static members
class EkChai {
    static shopName = "Chaicode cafe"

    constructor(public flavour: string) {

    }
}

console.log(EkChai.shopName)

// abstract classes 
abstract class Drink {
    abstract make(): void
}

class MyChai extends Drink {
    make() {
        console.log("brewing chai")
    }
}

// composition (alternative to inheritance)
class Heater {
    heat() { }
}

class ChaiMaker {
    constructor(private heater: Heater) { }

    make() {
        this.heater.heat()
    }
}

// go through other concepts like polymorphism