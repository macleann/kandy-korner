import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllProductLocations, getAndSortAllProducts, postNewPurchase } from "../ApiManager"
import "./Products.css"

export const ProductSearchList = ({ searchTermState }) => {
    const [productLocations, setProductLocations] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            getAndSortAllProducts() // Comment out this fetch call to fetch the products as an expansion of productLocations
                .then(data => setProducts(data)) 
            getAllProductLocations() // Fetching from this URL "http://localhost:8088/productLocations?_expand=location&_expand=product"
                .then(data => { 
                    setProductLocations(data)
                    //setProducts(data.map(PL => PL.product)) // The idea behind this line of code was to only fetch the data once by utilizing _expand
                })
                    // I wouldn't need to fetch both tables of data, specifically the "/products" table, if I uncommented the above line
                    // The issue was that I was getting duplicate products, and I couldn't figure out a good way to remove them
                    // On top of that, I had products persisting after not matching the search term
                    // Searching "" on page load doesn't populate any products, as expected
                    // Searching "T" would populate *three* "Take5" products (at the time of writing this, at most there should only be two) and the one "Twizzlers" product
                    // Searching "Tw" would populate one "Take5" and one "Twizzlers" product
                    // The "Take5" product would persist even if you completely removed the search term until you reload the page
        },
        []
    )

    useEffect(
        () => {
            if (searchTermState) {
                const searchedProducts = products.filter(product => {
                    return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
                })
                setFiltered(searchedProducts)
            } else {
                setFiltered([])
            }
        },
        [ searchTermState ]
    )

    const showMeWhereToBuy = (product) => {
        const filteredProductLocations = productLocations.filter(PL => PL.product.id === product.id)
        const locationNames = filteredProductLocations.map(PL => PL.location.address).join(",\n")
        window.alert(locationNames)
    }

    const buyProduct = (product) => {
        const purchaseToAddToAPI = {
            userId: kandyUserObject.id,
            productId: product.id,
            quantity: product.quantity
        }

        postNewPurchase(purchaseToAddToAPI)
        window.alert("Success")
        navigate("/find-candy")
    }

    return <>
        <h2>List of Matching Products</h2>

        <article className="products">
            {
                filteredProducts.map(product => {
                    return <section className="product" key={`product--${product.id}`}>
                                <header className="product__header">{product.name} <Link to="" onClick={() => showMeWhereToBuy(product)}>Show me where</Link></header>
                                <div className="product__div">Price: {product.price}</div>
                                <footer>
                                    <label>How many?:</label>
                                    <input 
                                    required
                                    type="number"
                                    defaultValue="1"
                                    onChange={(evt) => {
                                        product.quantity = parseInt(evt.target.value)
                                    }}
                                    />
                                    <button onClick={() => {
                                        buyProduct(product)
                                    }} className="btn__purchase">Purchase</button></footer>
                            </section>
                })
            }
        </article>
    </>
}