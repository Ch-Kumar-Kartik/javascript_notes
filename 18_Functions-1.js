/* 
- Assume a function is there say, xyz then
xyz is referencing that function and 
xyz() means executing that 

function function_name(parameters) {

    <something that it does>

    returns something
}

- But when this function is called the 
parameters passed at that time are 
arguments 

- if return statement DNE then undefined is 
returned

- anything written after return statement 
never gets executed
*/

function loginUserMessage(username){
    return `${username} just logged in`
}

console.log(loginUserMessage("kartik")) // kartik just logged in 

// if no argument is given 
console.log(loginUserMessage());
// undefined just logged in

function loginUserMessage(username){

    if (username === undefined){// or can say if(!username){...}
        
        console.log("Please enter a username");
        
        return // if no username then no need to run the code below, thus this placement of the return statement
    }

    return `${username} just logged in`
}


// improved version to handle undefined case

function loginUserMessage(username = "sam"){

    if (username === undefined){// or can say if(!username){...}
        
        console.log("Please enter a username");
        
        return // if no username then no need to run the code below, thus this placement of the return statement
    }

    return `${username} just logged in`
}

/* so if no argument is passed then sam will
be used as default value else whatever 
argument passed will override the 'sam' */


