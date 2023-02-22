export const getAllLocations = () => {
    return fetch("http://localhost:8088/locations")
        .then(res => res.json())
}

export const postNewEmployee = (newEmployee) => {
    return fetch("http://localhost:8088/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })
        .then(res => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}

export const getAllCustomersByUser = () => {
    return fetch("http://localhost:8088/users?_embed=customers&_embed=purchases&isEmployee=false")
        .then(res => res.json())
}

export const postNewCustomer = (newCustomer) => {
    return fetch("http://localhost:8088/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCustomer)
    })
}

export const postNewUser = (newUser) => {
    return fetch("http://localhost:8088/users?_embed=customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
        .then(res => res.json())
}

export const getAllProductTypes = () => {
    return fetch(`http://localhost:8088/productTypes`)
        .then(response => response.json())
}

export const postNewProduct = (newProduct) => {
    return fetch("http://localhost:8088/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
        .then(res => res.json())
}

export const postNewProductLocation = (newPL) => {
    return fetch(`http://localhost:8088/productLocations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPL)
    })
        .then(response => response.json())
}

export const getAndSortAllProducts = () => {
    return fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=productType`)
        .then(res => res.json())
}

export const getAllProductLocations = () => {
    return fetch(`http://localhost:8088/productLocations?_expand=location&_expand=product`)
        .then(res => res.json())
}

export const postNewPurchase = (newPurchase) => {
    return fetch(`http://localhost:8088/purchases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPurchase)
    })
}

export const getAllPurchasesExpandProducts = () => {
    return fetch(`http://localhost:8088/purchases?_expand=product`)
        .then(response => response.json())
}

export const getCustomerByLoyaltyNumber = (loyaltyNumber) => {
    return fetch(`http://localhost:8088/customers?loyaltyNumber=${loyaltyNumber}`)
        .then(res => res.json())
}

export const patchNewLoyaltyNumber = (customerId, loyaltyNumber) => {
    return fetch(`http://localhost:8088/customers/${customerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loyaltyNumber: loyaltyNumber })
    })
        .then(response => response.json())
}

export const getCustomerAndUserById = (customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
        .then(res => res.json())
}

export const getAllEmployeesExpandUserAndLocation = () => {
    return fetch("http://localhost:8088/employees?_expand=user&_expand=location")
        .then(res => res.json())
}

export const deleteEmployee = (employeeId) => {
    return fetch(`http://localhost:8088/employees/${employeeId}`, {
        method: 'DELETE',
    })
}

export const deleteUser = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
        method: 'DELETE',
    })
}