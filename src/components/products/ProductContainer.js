import { useState } from "react"
import { ProductSearch } from "./ProductSearch"
import { ProductSearchList } from "./ProductSearchList"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms} />
        <ProductSearchList searchTermState={searchTerms} />
    </>
}