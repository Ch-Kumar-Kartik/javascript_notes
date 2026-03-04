// Concepts: Typed Arrays, Object Arrays, Readonly Arrays, 2D Arrays, Tuples, Named Tuples, Readonly Tuples, Index Signatures
import { ChaiMenuItem, ChaiName } from "../types/aliases"

export type MenuItemTuple = [name: string, price: number, available: boolean]
export type PriceMatrix = number[][]

export class MenuService {
    private menuItems: readonly ChaiMenuItem[]
    private priceMatrix: PriceMatrix
    private ratings: { [chaiName: string]: number[] }

    constructor(menuItems: ChaiMenuItem[]) {
        this.menuItems = menuItems
        this.ratings = {}
        this.priceMatrix = [
            [30, 25, 20, 35, 28],  // Small
            [50, 40, 35, 55, 45],  // Medium
            [70, 60, 50, 75, 65],  // Large
        ]
    }

    getMenuItem(name: ChaiName): ChaiMenuItem | undefined {
        return this.menuItems.find(item => item.name === name)
    }

    addRating(chai: ChaiName, rating: number): void {
        if (!this.ratings[chai]) {
            this.ratings[chai] = []
        }
        this.ratings[chai].push(rating)
    }

    getAverageRating(chai: ChaiName): number {
        const chaiRatings = this.ratings[chai]
        if (!chaiRatings || chaiRatings.length === 0) return 0
        const total = chaiRatings.reduce((sum, r) => sum + r, 0)
        return total / chaiRatings.length
    }

    getMenuAsTuples(): readonly MenuItemTuple[] {
        return this.menuItems.map(({ name, price }): MenuItemTuple => {
            return [name, price, true]
        })
    }

    getPriceByMatrixPosition(sizeIndex: number, categoryIndex: number): number {
        const row = this.priceMatrix[sizeIndex]
        if (!row) return 0
        return row[categoryIndex] ?? 0
    }
}
