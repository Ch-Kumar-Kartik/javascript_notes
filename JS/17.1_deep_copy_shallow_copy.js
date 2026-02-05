// ────────────────────────────────────────────────
// Example object with nested structure (very common in real apps)
const original = {
  id: 101,
  username: "alice_dev",
  profile: {
    fullName: "Alice Kumar",
    avatarUrl: "https://cdn.example.com/avatars/alice.jpg",
    preferences: {
      theme: "dark",
      notifications: {
        email: true,
        push: false,
        marketing: true
      },
      favoriteTags: ["typescript", "react", "tailwind"]
    }
  },
  lastLogin: new Date("2025-12-20T14:30:00Z"),
  roles: ["user", "moderator"]
};

// ────────────────────────────────────────────────
// 1. Shallow copy (most common mistaken ways)

const shallow1 = { ...original };                    // spread
const shallow2 = Object.assign({}, original);        // classic
// const shallow3 = structuredClone(original);       // ← this is actually DEEP (see below)

console.log(shallow1.profile === original.profile);           // true ← same reference!
console.log(shallow1.profile.preferences === original.profile.preferences); // true
console.log(shallow1.lastLogin === original.lastLogin);       // true (Date objects are copied by reference)

// Problem demonstration:
shallow1.profile.preferences.theme = "light";         // affects original!
shallow1.profile.notifications.push = true;           // also affects original!
shallow1.lastLogin.setFullYear(2020);                 // affects original!

console.log(original.profile.preferences.theme);      // "light"   ← oh no!
console.log(original.profile.notifications.push);     // true      ← oh no!

// ────────────────────────────────────────────────
// 2. Proper deep copy methods in TypeScript (2025 reality)


// Option A ── Modern & cleanest (most recommended in 2024–2025)
const deep1 = structuredClone(original);   // Native deep copy (available since Node 17+, modern browsers)

console.log(deep1.profile === original.profile);                    // false
console.log(deep1.profile.preferences.notifications ===
  original.profile.preferences.notifications);            // false
console.log(deep1.lastLogin === original.lastLogin);                // false (new Date instance)

// Safe modification
deep1.profile.preferences.theme = "ocean";
deep1.profile.notifications.marketing = false;
deep1.lastLogin.setFullYear(2030);

console.log(original.profile.preferences.theme);      // still "dark"     ← safe!
console.log(original.lastLogin.getFullYear());        // still 2025       ← safe!


// Option B ── Popular library approach (still very common)
// const _ = require('lodash');  // CommonJS
// import _ from 'lodash';        // ES Modules (move to top of file)

// const deep2 = _.cloneDeep(original);


// Option C ── JSON way (still used, but has serious limitations)
function naiveDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const deep3 = naiveDeepCopy(original);

// Problems with JSON method:
console.log(deep3.lastLogin instanceof Date);           // false (becomes string)
console.log(typeof deep3.lastLogin);                    // "string"
// → you lose Date, Map, Set, RegExp, functions, undefined, circular refs, etc.


// ────────────────────────────────────────────────
// Quick comparison table
/*
Method               | Copies nested objects | Handles Date | Handles Map/Set | Circular refs | Performance | Recommendation 2025
─────────────────────┼───────────────────────┼──────────────┼─────────────────┼───────────────┼─────────────┼────────────────────
{ ...obj }           | No                    | No           | No              | Yes           | Fast        | Shallow only
Object.assign()      | No                    | No           | No              | Yes           | Fast        | Shallow only
structuredClone      | Yes                   | Yes          | Yes             | No            | Good        | ★ Best native choice
lodash.cloneDeep     | Yes                   | Yes          | Yes             | Yes           | Moderate    | Very good when needed
JSON.parse(stringify)| Partial               | No           | No              | No            | Fast        | Avoid unless very simple data
*/