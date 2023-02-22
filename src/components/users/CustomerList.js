import { useEffect, useState } from "react"
import { getAllCustomersByUser } from "../ApiManager"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {
    const [customersByUser, updateCustomersByUser] = useState([])

    useEffect(
        () => {
            getAllCustomersByUser() // fetching from URL "http://localhost:8088/users?_embed=customers&_embed=purchases&isEmployee=false"
                .then(data => {
                    data.map(user => {
                        const totalQuantity = user.purchases.reduce((acc, purchase) => acc + purchase.quantity, 0)
                        user.totalQuantity = totalQuantity
                    })
                    updateCustomersByUser(data)
                })
        },
        []
    )

    return <>
        <h2>Customers</h2>
        <table>
            <tr>
                <th>Customer</th>
                <th>Quantity</th>
            </tr>
        {
            customersByUser.sort((a, b) => {
                const aQuantity = a.totalQuantity
                const bQuantity = b.totalQuantity
                return bQuantity - aQuantity
            })
            .map(user => {
                return <Customer 
                    key={`customer--${user.id}`}
                    id={user?.customers[0]?.id}
                    name={user.name}
                    totalQuantity={user.totalQuantity} />
            })
        }
        </table>
    </>
}