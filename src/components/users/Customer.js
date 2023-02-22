import { Link } from "react-router-dom"

export const Customer = ({ id, name, purchases, totalQuantity }) => {

    const sumQuantities = () => {
        let quantity = 0
        purchases.map(purchase => {
            quantity += purchase.quantity
        })
        return quantity
    }
    
    return (
        <tr className="customer">
            <td><Link to={`/customers/${id}`}>{name}</Link></td>
            <td>Quantity: {totalQuantity}</td>
        </tr>
    )
}