import styles from "./styles/page.module.css";
import axios from 'axios';

import Dashboard from './home/page.jsx';
import LoginForm from './login/page.jsx';
import {InventoryContextProvider} from "./context/InventoryContext.jsx"
import { EditItemModalContextProvider } from "./context/EditItemModalContext"
import { TransactionContextProvider } from "./context/TransactionsContext";
import {NewItemModalContextProvider} from './context/NewItemModalContext'

// async function validatePin() {
//   const res = await axios.get( INSERT API ENDPT TO VALIDATE DEVICE W/ PIN); 

//   if (!res) {
//       throw new Error("Failed to fetch data");
//   } else {
//       return res.data <-- THIS DATA SHOULD REALLY JUST BE "AUTH'D DEVICE" OR "NOT AUTH'D DEVICE"
//   }
// }

export default function Home() { 
  if (false) { //this device has not yet entered the pin
    return <LoginForm/>
  } if (true) { //user has entered pin and is logged in
    return (
      <InventoryContextProvider>
        <TransactionContextProvider>
        <EditItemModalContextProvider>
        <NewItemModalContextProvider>
          <main>
            <Dashboard/>
          </main>
          </NewItemModalContextProvider>
        </EditItemModalContextProvider>
        </TransactionContextProvider>
      </InventoryContextProvider>
    )
  }
  
}
