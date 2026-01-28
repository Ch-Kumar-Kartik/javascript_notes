function one(){
    const username = "hitesh"

    function two(){
        const website = "youtube"
        console.log(username);
    }
    // console.log(website) // will give error
    two() // hitesh as its a global variable for two()
}                                       
one()

// ------------------important example----------------

console.log(addone(5)) // can access before the function declaration (hoisted to the top of its scope)
function addone(value){
    return value + 1
}

console.log(addtwo) // can't acces before the fn declaration
const addtwo = function(value){
    return num + 2
}

// addtwo variable is declared with const and assigned a function expression
/*
Variables declared with const or let are hoisted
but remain in a temporal dead zone (TDZ) until 
their declaration is reached in the code. This 
means addtwo exists but is undefined until the 
const addtwo = ... line is executed.
*/
