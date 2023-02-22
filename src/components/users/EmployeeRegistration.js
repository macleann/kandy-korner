import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllLocations, postNewEmployee, postNewUser } from "../ApiManager"

export const EmployeeRegistration = () => {
    const [locations, setLocations] = useState([])
    const [user, setUser] = useState({
        email: "",
        name: "",
        isEmployee: true
    })
    const [employee, setEmployee] = useState({
        userId: null,
        locationId: "",
        payRate: "",
        startDate: ""
    })
    let navigate = useNavigate()

    useEffect(
        () => {
            getAllLocations()
                .then(data => setLocations(data))
        },
        []
    )

    const handleRegisterNewEmployee = (event) => {
        event.preventDefault()

        const employeeToSendToAPI = {
            locationId: parseInt(employee.locationId),
            payRate: parseFloat(employee.payRate),
            startDate: employee.startDate
        }

        return postNewUser(user)
            .then(createdUser => {
                employeeToSendToAPI.userId = createdUser.id
                postNewEmployee(employeeToSendToAPI)
            })
            .then(() => navigate("/employees"))
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return <>
    <form>
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
            <label htmlFor="locations"> Choose Location </label>
            <select 
            required defaultValue="0"
            id="locations" 
            className="form-control"
            onChange={(evt) => {
                const copy = {...employee}
                copy.locationId = evt.target.value
                setEmployee(copy)
            }}>
                <option value="0">Choose...</option>
                {
                    locations.map(location => {
                        return <option key={`location--${location.id}`} value={location.id}>{location.address}</option>
                    })
                }
            </select>
        </fieldset>
        <fieldset>
            <label htmlFor="payRate"> Pay Rate: </label>
            <input 
                required autoFocus
                type="number"
                placeholder="14.99"
                id="payRate"
                className="form-control"
                value={employee.payRate}
                onChange={(evt) => {
                    const copy = {...employee}
                    copy.payRate = evt.target.value
                    setEmployee(copy)
                }}
                 />
        </fieldset>
        <fieldset>
            <input 
                required autoFocus
                type="date" 
                id="startDate"
                className="form-control"
                value={employee.startDate}
                onChange={(evt) => {
                    const copy = {...employee}
                    copy.startDate = evt.target.value
                    setEmployee(copy)
                }}/>
            <label htmlFor="startDate"> Start date: </label>
        </fieldset>
        <button onClick = {(clickEvent) => handleRegisterNewEmployee(clickEvent)} className="btn btn-primary">
                Submit
            </button>
    </form>
</>
}