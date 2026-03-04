// Concepts: Classes, Protected, Readonly, Getters/Setters, Static, Abstract
import { ChaiSize } from "../types/enums"

export abstract class Beverage {
    protected _name: string
    protected _basePrice: number
    protected _temperature: "hot" | "cold"

    static readonly SHOP_NAME = "ChaiCode Cafe"

    constructor(name: string, basePrice: number) {
        this._name = name
        this._basePrice = basePrice
        this._temperature = "hot"
    }

    abstract make(): string
    abstract calculatePrice(size: ChaiSize): number

    describe(): string {
        return `${this._name} — a ${this._temperature} beverage from ${Beverage.SHOP_NAME} (₹${this._basePrice})`
    }

    get name(): string {
        return this._name
    }

    get basePrice(): number {
        return this._basePrice
    }

    get temperature(): "hot" | "cold" {
        return this._temperature
    }
}
