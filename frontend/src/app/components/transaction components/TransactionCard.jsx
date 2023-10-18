import styles from '../../styles/Card.module.css';
import Image from 'next/image';
import { useModalContext } from '../../hooks/useEditItemModalContext';
import { useInventoryContext } from '../../hooks/useInventoryContext';
import { useTransactionContext } from '../../hooks/useTransactionContext';

import editIcon from '../../../../public/icons8-edit-24 (1).png';
import trashIcon from '../../../../public/icons8-trash-24.png';

function TransactionCard({transaction}) {
    const {modalDispatch} = useModalContext();
    const {inventory} = useInventoryContext(); 
    const {transactions, transactionDispatch} = useTransactionContext(); 

    // function editItem() {
    //     modalDispatch({type: 'OPEN_MODAL', payload: transaction})
    // }

    // function deleteItem() {
    //     const shouldDelete = confirm("Are you sure you want to delete this item?")

    //     if (shouldDelete) {
    //         axios.delete(`/api/inventory/${item.code}`)
    //             .then(response => {
    //                 console.log(`Deleted ${item.code} ${item.name} from inventory.`)
    //                 dispatch({type: 'DELETE_ITEM', payload: item});
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     }
    // }

    return(
        <div className={styles.card}>
            
        <div className={`${styles.primaryInfo}`}>
            <div >
                <h3 style={{marginBottom: 0}}>Total: ${transaction.totalPrice.$numberDecimal}</h3>
            </div>
            <div>
                <p>Paid with: {transaction.formOfPayment}</p>
            </div> 
        </div>
        
        <div className={`${styles.secondaryInfo}`}>
            <table className={`${styles.table}`}>
                <thead>
                    <tr>
                        <th width="65%">Item</th>
                        <th width="35%">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.purchaseInfo.map((transactionItem) => {
                        const inventoryItem = inventory.find((saleItem) => transactionItem.itemID === saleItem._id)
                        return(
                            <tr key={`${inventoryItem._id} ${inventoryItem.code}`}>
                                <td>{inventoryItem.code} {inventoryItem.name}</td>
                                <td className={`${styles.quant}`}>{transactionItem.quantity}</td>
                            </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>

        <div className={styles.tertiaryInfo}>
            <p>{transaction.createdAt}</p> 
        </div>

        <div className={`${styles.edit}`}>
                <button 
                    className={`btn ${styles.btnSecondary}`}
                    //onClick= edit transaction function
                >
                    <Image src={editIcon} alt="pencil icon, edit item"/>
                </button> 
                <button
                    className={`btn ${styles.btnSecondary} ${styles.lowerBtn}`}
                    //onClick= delete transaction function
                >
                    <Image src={trashIcon} alt="trash bin icon, delete item"/>
                </button>
        </div>

    </div>
    )
}

export default TransactionCard; 