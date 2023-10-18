import express, { urlencoded } from "express"; 
import dotenv from "dotenv"; 
import mongoose from "mongoose";
import cors from "cors";

import inventoryRoutes from './routes/itemInventory.js'
import transactionRoutes from "./routes/transactions.js"; 
import reservationRoutes from "./routes/reservedItems.js"

dotenv.config(); 
const app = express(); 

//middleware to look at the requests we're getting
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use((req, rest, next) => {
    console.log(req.path, req.method);
    next(); 
}); 

app.use("/api/:collection", (req, res, next) => {
    if (req.params.collection === "inventory") {
        inventoryRoutes(req, res, next); 
    } if (req.params.collection === "transaction") {
        transactionRoutes(req, res, next); 
    } else if (req.params.collection === "reservation"){
        reservationRoutes(req, res, next); 
    }
}); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log(`The server is listening on port ${process.env.PORT}`)
        });     
    }) 
    .catch((err) => {
        console.log(err); 
    })

//exporting express API
export default app; 


