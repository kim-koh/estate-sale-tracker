import itemModel from "../models/itemForSale.js";
import transactionModel from "../models/transaction.js";
import mongoose from "mongoose";

//get all transactions
const getAllTransactions = async(req, res) => {
    try {
        const transactions = await transactionModel.find({}).sort({createdAt: -1});
        res.status(200).json(transactions)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
};

//post new transaction
const createTransaction = async(req, res) => {
    const {purchaseInfo, totalPrice, formOfPayment} = req.body;
    purchaseInfo.forEach((purchasedItem) => {
        purchasedItem.itemID = new mongoose.Types.ObjectId(purchasedItem.itemID)
    })
    // updating stock and availability for Inventory Items
    purchaseInfo.forEach(purchasedItem => {
        itemModel.findById(purchasedItem.itemID)
            .then(item => {
                if (item === null) {
                    console.log(item)
                    res.status(400).json(`This item does not exist in the inventory. Transaction could not be created.`)
                } else {
                    const newStock = item.stock - purchasedItem.quantity;
                    if (newStock < 1) {
                            const updatedItem = itemModel.findByIdAndUpdate(purchasedItem.itemID, {stock: newStock, saleStatus: 'Sold'}, {new: true})
                                .then(response => console.log(response))
                                .catch(err => res.status(400).json({error: err.message}));
                    } else {
                            const updatedItem = itemModel.findByIdAndUpdate(purchasedItem.itemID, {stock: newStock}, {new:true})
                                .then(response => console.log(response))
                                .catch(err => res.status(400).json({error: err.message}));
                    }
                    
                }
            })   
    })
    transactionModel.create({purchaseInfo, totalPrice, formOfPayment})
        .then(response => 
            res.status(200).json(response))
        .catch(err => 
            res.status(400).json({error: err.message})
        )
};

//patch existing transaction
const editTransaction = async(req, res) => {
    console.log("This is the edit transactions route")
    console.log(req.body); 
    // try {
    //     const updatedTransaction = await transactionModel.findByIdAndUpdate(req.params.id, {...req.body}, {new: true});
    //     if (!updatedTransaction) {
    //         res.status(400).json({error: 'No item with this id in the database'});
    //     } else {
    //         res.status(200).json(updatedTransaction)
    //     };
    // } catch (err) {
    //     res.status(400).json({error: err.message})
    // }
    
}

//delete transaction

export {
    getAllTransactions,
    createTransaction,
    editTransaction,
}