export const ProductSearch = ({ setterFunction }) => {
    return (
        <div>
            <div><label>What candy are you looking for?</label></div>
            <input onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            } type="text" placeholder="Enter search terms" />
        </div>
    )
}