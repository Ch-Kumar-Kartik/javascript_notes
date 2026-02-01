function wrapInArray<T>(item: T): T[] {
    return [item] // returns an array of same datatype as input
}

wrapInArray("masala")
wrapInArray(25)
wrapInArray({ flavour: "Ginger" })

function pair<A, B>(a: A, b: B): [A, B] {
    return [a, b]
}

pair("masala", 25)
pair(25, "masala")
pair("25", "masala")
pair("masala", { flavour: "Ginger" })

interface Box<T> {
    content: T
}

const numberBox: Box<number> = { content: 10 }
const numberBoxCup: Box<string> = { content: "chai" }

interface APIPromise<T> {
    status: number,
    data: T
}

const res: APIPromise<{ flavour: string }> = {
    status: 200,
    data: { flavour: "Masala" }
}