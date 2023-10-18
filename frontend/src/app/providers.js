'use client'

import {InventoryContextProvider} from "./context/InventoryContext.jsx"
import { EditItemModalContextProvider } from "./context/EditItemModalContext"
import { TransactionContextProvider } from "./context/TransactionsContext";
import {NewItemModalContextProvider} from './context/NewItemModalContext'

export function Providers({children}) {
    return (
        <InventoryContextProvider>
            <TransactionContextProvider>
                <EditItemModalContextProvider>
                    <NewItemModalContextProvider>
                        {children}
                    </NewItemModalContextProvider>
                </EditItemModalContextProvider>
            </TransactionContextProvider>
        </InventoryContextProvider>
    )
}