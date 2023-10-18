'use client'
import { createContext, useReducer } from "react";

export const TransactionContext = createContext(null); 

export function transactionReducer(prevState, action) {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return {transactions: action.payload};
        case 'CREATE_NEW_TRANSACTION':
            return {transactions: [action.payload, ...prevState.transactions]}
        default:
            return prevState;
    }
}

export function TransactionContextProvider({children}) {
    const [state, transactionDispatch] = useReducer(transactionReducer, {
        transactions: []
    });

    return <TransactionContext.Provider value={{...state, transactionDispatch}}>
        {children}
    </TransactionContext.Provider>
}