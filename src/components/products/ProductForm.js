import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllLocations, getAllProductTypes, postNewProduct, postNewProductLocation } from "../ApiManager"
import "./Products.css"

export const ProductForm = () => {
    const [product, update] = useState({
        name: "",
        price: "",
        productTypeId: ""
    })
    const [productTypes, setProductType] = useState([])
    const [locations, setLocations] = useState([])
    let productLocations = []
    const navigate = useNavigate()

    useEffect(
        () => {
            getAllProductTypes()
                .then(data => setProductType(data))
            getAllLocations()
                .then(data => setLocations(data))
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            name: product.name,
            price: product.price,
            productTypeId: product.productTypeId
        }

        return postNewProduct(productToSendToAPI)
            .then(createdProduct => {
                productLocations.forEach(PL => {
                    PL.productId = createdProduct.id
                    postNewProductLocation(PL)
                })
            })
            .then(() => navigate("/products"))
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of candy"
                        value={product.name}
                        onChange={(evt) => {
                            const copy = {...product}
                            copy.name = evt.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Price of candy"
                        value={product.price}
                        onChange={(evt) => {
                            const copy = {...product}
                            copy.price = parseFloat(evt.target.value, 2)
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="productTypes"> Product Type: </label>
                <select
                required defaultValue="0"
                id="productTypes" 
                className="form-control"
                onChange={(evt) => {
                    const copy = {...product}
                    copy.productTypeId = parseInt(evt.target.value)
                    update(copy)
                }}>
                    <option value="0">Choose...</option>
                    {
                        productTypes.map(PT => {
                            return <option key={`productType--${PT.id}`} value={PT.id}>{PT.category}</option>
                        })
                    }
                </select>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locations" className="locations__input">Available at:</label>
                    {
                        locations.map(location => {
                            return <>
                                <div className="location__input" key={`location--${location.id}`}>
                                    <input
                                    required autoFocus
                                    type="checkbox"
                                    id={location.id}
                                    onChange={(evt) => {
                                        if (evt.target.checked) {
                                            productLocations.push({locationId: parseInt(evt.target.id)})
                                            console.log(productLocations)
                                        } else {
                                            productLocations = productLocations.filter(PL => PL.locationId !== parseInt(evt.target.id))
                                            console.log(productLocations)
                                        }
                                    }} />
                                    <label htmlFor={location.id}>{location.address}</label>
                                </div>
                            </>
                        })
                    }
                </div>
            </fieldset>
            <button onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}