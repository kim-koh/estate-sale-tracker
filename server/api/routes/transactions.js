import express from "express"; 
import {
    getAllTransactions,
    createTransaction,
    editTransaction, 
    deleteTransaction
} from '../controllers/transactionControllers.js'

const router = express.Router(); 

router.get("/", getAllTransactions);

router.get("/:id", (req, res) => {
    const itemID = req.params.id; 
    res.send("Get information on a specific transation")
});

router.post("/", createTransaction);

router.patch("/:id", editTransaction);

router.delete("/:id", deleteTransaction); 

//export the router 
export default router