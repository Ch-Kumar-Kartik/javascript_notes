// Concepts: Implements, Public, Private, Private Fields (#), Getters/Setters, Inheritance
import { Beverage } from "./Beverage"
import { ChaiCategory, ChaiSize } from "../types/enums"
import { ChaiRecipe, Ingredient } from "../types/interfaces"

export class Chai extends Beverage implements ChaiRecipe {
    // Private field using # syntax (true runtime private)
    #secretIngredient: string

    // Private with getter/setter for validation
    private _sugar: number = 2
    private _ingredients: Ingredient[]

    // Public properties
    readonly id: string
    category: ChaiCategory
    prepTimeMinutes: number

    constructor(recipe: ChaiRecipe) {
        super(recipe.name, 40) // call Beverage constructor with name and basePrice
        this.id = recipe.id
        this.category = recipe.category
        this._ingredients = recipe.ingredients
        this.prepTimeMinutes = recipe.prepTimeMinutes
        this.#secretIngredient = recipe.secretIngredient ?? "love"
    }

    // Getter/Setter with validation (max 5 sugar)
    get sugar(): number {
        return this._sugar
    }

    set sugar(value: number) {
        if (value < 0 || value > 5) {
            throw new Error("Sugar must be between 0 and 5")
        }
        this._sugar = value
    }

    // Satisfy ChaiRecipe interface
    get ingredients(): Ingredient[] {
        return this._ingredients
    }

    // Implement abstract method from Beverage
    make(): string {
        return `Brewing ${this._name} with ${this._ingredients.length} ingredients and ${this._sugar} spoons of sugar...`
    }

    // Implement abstract method from Beverage
    calculatePrice(size: ChaiSize): number {
        return this._basePrice * size
    }

    // Additional methods
    addIngredient(ingredient: Ingredient): void {
        this._ingredients.push(ingredient)
    }

    getSecretIngredient(): string {
        return this.#secretIngredient
    }
}
