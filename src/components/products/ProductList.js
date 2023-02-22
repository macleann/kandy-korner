import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import { getAndSortAllProducts } from "../ApiManager"
import "./Products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [priceyOnly, updatePriceyOnly] = useState(false)
    const navigate = useNavigate()

    useEffect(
        () => {
            getAndSortAllProducts()
                .then(data => setProducts(data))
        },
        []
    )

    useEffect(
        () => {
            setFiltered(products)
        },
        [products]
    )

    useEffect(
        () => {
            if (priceyOnly) {
                const expensiveProducts = products.filter(product => product.price >= 2.00)
                setFiltered(expensiveProducts)
            } else {
                setFiltered(products)
            }
        },
        [priceyOnly]
    )

    return <>
        <button onClick={() => updatePriceyOnly(true)}>Top Priced</button>
        <button onClick={() => updatePriceyOnly(false)}>Show All</button>
        <button onClick={() => navigate("/product/create")}>Create Product</button>
        <h2>List of Products</h2>

        <article className="products">
            {
                filteredProducts
                .map(product => {
                    return <section className="product">
                                <header>{product.name}</header>
                                <div>Price: {product.price}</div>
                                <footer>Type: {product.productType.category}</footer>
                            </section>
                })
            }
        </article>
    </>
}