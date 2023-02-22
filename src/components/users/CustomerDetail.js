import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCustomerAndUserById, getCustomerByLoyaltyNumber, patchNewLoyaltyNumber } from "../ApiManager"

export const CustomerDetail = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})
    const navigate = useNavigate()

    const checkForLoyaltyDupes = (e) => {
        e.preventDefault()
        return getCustomerByLoyaltyNumber(customer.loyaltyNumber)
            .then(response => {
                if (response.length > 0) {
                    window.alert("An account with that loyalty number already exists")
                }
                else {
                    updateLoyaltyNumber()
                }
            })
    }

    const updateLoyaltyNumber = () => {
        return patchNewLoyaltyNumber(customerId, customer.loyaltyNumber)
            .then(navigate(`/customers/${customerId}`))
    }

    useEffect(
        () => {
            getCustomerAndUserById(customerId)
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    return (
        <section className="customer" >
            <header className="customer__header">{customer?.user?.name}</header>
            <div>Email: {customer?.user?.email}</div>
            <footer className="customer__footer">
                <form onSubmit={checkForLoyaltyDupes} >
                    <label>Loyalty Number:</label>
                    <input 
                    required autoFocus
                    defaultValue={customer.loyaltyNumber}
                    value={customer.loyaltyNumber}
                    onChange={(evt) => {
                        const copy = {...customer}
                        copy.loyaltyNumber = parseInt(evt.target.value)
                        updateCustomer(copy)
                    }}
                    />
                    <button className="update__btn">Update</button>
                </form>
            </footer>
        </section>
    )
}