import item from "../models/itemForSale.js";
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
    const {newInfo, stockInfo} = req.body; 

    transactionModel.findByIdAndUpdate(req.params.id, {...newInfo}, {new: true}) 
        .then(updatedTransaction => {
            if (!updatedTransaction) {
                res.status(400).json({error: 'No item with this id in the database'});
            } else {
                try {
                    stockInfo.forEach(x => {
                        itemModel.findByIdAndUpdate(x.id, {stock: x.newStock})
                            .then(response => {
                                if (!response) {
                                    res.status(400).json({error: `Stock of item with id ${x.id} failed to update`})
                                }
                            })
                            .catch(err => {
                                res.status(400).json({error: err.message})
                            })
                    })
                    res.status(200).json(updatedTransaction)
                }
                catch (err) {
                    res.status(400).json({error: err.message})
                }
            }
        })
        .catch(err => {
            res.status(400).json({error: err.message})
        })  
}

//delete transaction
const deleteTransaction = async(req, res) => {
    const transactionId = req.params.id
    const newStockNums = req.body.newStockNums
    transactionModel.findByIdAndDelete(transactionId)
        .then(deletedTransaction => {
            if (!deletedTransaction) {
                res.status(400).json({error: 'No item with this id in the database'});
            } else {
                try {
                    newStockNums.forEach(x => {
                        const saleStatus = "Available"
                        if (x.newStock < 1) {saleStatus = "Sold"}
                        itemModel.findByIdAndUpdate(x.id, {stock: x.newStock, saleStatus: saleStatus})
                            .then(response => {
                                if (!response) {
                                    res.status(400).json({error: `Stock of item with id ${x.id} failed to update`})
                                }
                            })
                            .catch(err => {
                                res.status(400).json({error: err.message})
                            })
                    })
                    res.status(200).json(deletedTransaction)
                }
                catch (err) {
                    console.log("error because of the stock update)")
                    res.status(400).json({error: err.message})
                }
            }
        })
        .catch(err => {
            console.log("error with the delete request")
            res.status(400).json({error:err.message})
        })
}

export {
    getAllTransactions,
    createTransaction,
    editTransaction,
    deleteTransaction
}