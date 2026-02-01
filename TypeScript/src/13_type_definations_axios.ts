/*
Type Declaration Files (.d.ts files) :

These files are crucial for TypeScript to provide suggestions and errors.
They typically don't contain working code but rather interface definitions that describe the structure of data and methods.
They are usually found in the node_modules folder, within the lib directory of installed packages like TypeScript itself. (2:00)
Examples include dom.d.ts (for DOM declarations like addEventListener) (3:14) and array/string declaration files (4:09).
Installing Type Declarations for Libraries (5:05):

Some libraries ship with their type declarations bundled (e.g., Axios).
For libraries that don't, you can install them separately using npm install -D @types/library_name (8:17). This is a standard practice for TypeScript.

Even if that is not available then go to the documentation and according to that declare ur own types using interfaces.
*/

import axios, { type AxiosResponse } from "axios"
// import type { AxiosResponse } from "axios" // alternative syntax

interface Todo {
    userID: number;
    ID: number;
    title: string;
    completed: boolean;
}

// axios.get('https://jsonplaceholder.typicode.com/posts')
// .then(response => {
//     console.log(response.data);
// })

const fetchData = async () => {
    try {
        const response: AxiosResponse<Todo> = await axios.get("https://jsonplaceholder.typicode.com/posts")
        console.log("todo", response.data.title)
    } catch (error: any) {
        if (axios.isAxiosError(error)) { // proper destructuring
            console.log("axios error", error.message);
            if (error.response) {
                console.log(error.response.status)
            }
        }
    }
}

// without axios 
/*
const fetchData = async() => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        if (!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        const data : Todo = await response.json()
    } catch (error : any) {
        
    }
}
*/