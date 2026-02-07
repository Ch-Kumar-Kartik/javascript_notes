/*
so the problem with this normal token implementation is that it's stateful.
Stateful :
By stateful here, we mean that we need to store these tokens in a variable right now (and eventually in a database). 
Problem :
The problem is that we need to send a request to the database every time the user wants to hit an authenticated endpoint
Solution : 
Use JWT which are stateless
Basically skip DB hops, rely less on DB, prevent round trip
from server to DB and all that 
Not really an encryption but very close to it  
*/

import express, { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = "randomstuff";
const app = express();

// Define User interface
interface User {
    username: string;
    password: string;
}

// Define JWT Payload interface
interface JwtPayload {
    username: string;
}

const users: User[] = [];

app.use(express.json());

function signupHandler(req: Request, res: Response, next: NextFunction): void {
    const username: string = req.body.username;
    const password: string = req.body.password;

    // Check if user already exists
    const existingUser: User | undefined = users.find(user => user.username === username);

    if (existingUser) {
        res.status(400).json({
            message: "Username already exists"
        });
        return;
    }

    // Create new user
    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "Signup successful"
    });
}

function signinHandler(req: Request, res: Response, next: NextFunction): void {
    const username: string = req.body.username;
    const password: string = req.body.password;

    // Find user with matching credentials
    const foundUser: User | undefined = users.find(
        user => user.username === username && user.password === password
    );

    if (foundUser) {
        // Generate JWT token
        const token: string = jwt.sign({
            username: username
        } as JwtPayload, JWT_SECRET);

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Invalid username or password"
        });
    }
}

app.post("/signup", signupHandler);

app.post("/signin", signinHandler);

app.get("/me", (req: Request, res: Response): void => {
    const token: string | undefined = req.headers.authorization;

    if (!token) {
        res.status(401).json({
            message: "No token provided"
        });
        return;
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const username: string = decoded.username;

        // Find the user
        const foundUser: User | undefined = users.find(user => user.username === username);

        if (foundUser) {
            res.json({
                username: foundUser.username
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});