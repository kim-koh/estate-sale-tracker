import express from "express"; 
import {
    getAllTransactions,
    createTransaction
} from '../controllers/transactionControllers.js'

const router = express.Router(); 

router.get("/", getAllTransactions);

router.get("/:id", (req, res) => {
    const itemID = req.params.id; 
    res.send("Get information on a specific transation")
});

router.post("/", createTransaction);

router.patch("/:id", (req, res) => {
    res.send("Editing an existing transaction")
});

router.delete("/:id", (req, res) => {
    res.send ("Removing a transaction from sale history")
})

//export the router 
export default router