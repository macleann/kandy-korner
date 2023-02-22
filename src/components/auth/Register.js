import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCustomersByUser, getUserByEmail, postNewCustomer, postNewUser } from "../ApiManager"
import "./Login.css"

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        name: "",
        isEmployee: false
    })
    const [customer, setCustomer] = useState({
        userId: "",
        loyaltyNumber: ""
    })
    const [nextLoyaltyNumber, setNextLoyaltyNumber] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllCustomersByUser()
            .then(users => {
                const unsortedCustomers = users.map(user => ({...user.customers[0]}))
                const sortedCustomers = unsortedCustomers.sort((a, b) => b.loyaltyNumber - a.loyaltyNumber)
                setNextLoyaltyNumber(sortedCustomers[0].loyaltyNumber + 1)
            })
        },
        []
    )

    const registerNewCustomer = () => {
        return postNewCustomer(customer)
    }

    const registerNewUser = () => {
        return postNewUser(user)
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("kandy_user", JSON.stringify({
                        id: createdUser.id,
                        employee: createdUser.isEmployee
                    }))

                    const localKandyUser = localStorage.getItem("kandy_user")
                    const kandyUserObject = JSON.parse(localKandyUser)

                    customer.userId = kandyUserObject.id
                    customer.loyaltyNumber = nextLoyaltyNumber
                    registerNewCustomer()
                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return getUserByEmail(user.email)
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Kandy Korner</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

