// union
let subs: string | number = '1M'

let apiRequestStatus: 'pending' | 'success' | 'error' = 'pending'

let airlineSeat: 'aisle' | 'window' | 'middle' = 'aisle'

airlineSeat = 'aisle'

const orders = ['12', '13', '14']

// any
/*
The any type in TypeScript basically means:
Turn off type checking for this value.
*/
let currentorder;
// let currentorder : string | undefined; // better approach
for (let order of orders) {
    if (order === '28') {
        currentorder = order
        break
    }
}

console.log(currentorder)