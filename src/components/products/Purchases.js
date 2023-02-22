import { useEffect, useState } from "react"
import { getAllPurchasesExpandProducts } from "../ApiManager"

export const Purchases = () => {
    const [purchases, setPurchases] = useState([])
    const [myPurchases, setFiltered] = useState([])
    const localKandyUser = localStorage.getItem("kandy_user")
	const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            getAllPurchasesExpandProducts() // Fetching from this url: "http://localhost:8088/purchases?_expand=product"
                .then(data => setPurchases(data))
        },
        []
    )

    useEffect(
        () => {
            const filteredPurchases = purchases.filter(purchase => purchase.userId === kandyUserObject.id)
            setFiltered(filteredPurchases)
        },
        [purchases]
    )

    const myPurchasesGroupedByProduct = myPurchases.reduce((purchaseToAcc, purchase) => {
        const matchedPurchase = purchaseToAcc.find(purchaseToFind => purchaseToFind.productId === purchase.productId)
        if (matchedPurchase) {
            matchedPurchase.quantity += purchase.quantity
            matchedPurchase.totalPrice += purchase.product.price * purchase.quantity
        } else {
            purchase.totalPrice = purchase.product.price * purchase.quantity
            purchaseToAcc.push(purchase)
        }
        return purchaseToAcc
    },[])

    return <>
        <h2>My Orders</h2>

        <table>
            <tr>
                <th>Candy</th>
                <th>Quantity</th>
                <th>Total Cost</th>
            </tr>
        {
            myPurchasesGroupedByProduct.map(purchase => {
                return <tr className="product" key={`purchase--${purchase.id}`}>
                            <td className="product__header">{purchase.product.name}</td>
                            <td>{purchase.quantity}</td>
                            <td className="product__footer">{purchase.totalPrice}</td>
                        </tr>
            })
        }
        </table>
    </>
}