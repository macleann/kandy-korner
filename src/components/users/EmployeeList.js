import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEmployee, deleteUser, getAllEmployeesExpandUserAndLocation } from "../ApiManager"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, updateEmployees] = useState([])
    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            getAllEmployees()
        },
        []
    )

    const getAllEmployees = () => {
        return getAllEmployeesExpandUserAndLocation()
            .then(data => updateEmployees(data))
    }

    const canHire = () => {
        return (
            kandyUserObject.manager
            ? <button onClick={() => navigate("/employees/new-employee") }>Hire Employee Form</button>
            : ""
        )
    }

    const canFire = (employeeObj) => {
        return (
                kandyUserObject.manager
                ?
                <>
                    <div>{employeeObj?.location?.address}</div>
                    <footer className="employee__footer"><button 
                    onClick={() => {
                    fireEmployee(employeeObj.id, employeeObj.user.id)
                    }}
                    className="fire__btn">Fire Employee</button></footer>
                </>
                : <footer className="employee__footer">{employeeObj?.location?.address}</footer>
        )
    }

    const fireEmployee = (employeeId, userId) => {
        return deleteEmployee(employeeId)
            .then(deleteUser(userId))
            .then(getAllEmployees())
    }

    return <>
        {canHire()}
        <h2>Employees</h2>
        <article className="employees">
            {
                employees.map(employee => {
                    return <section className="employee" key={`employee--${employee.id}`}>
                            <header className="employee__header">{employee?.user?.name}</header>
                            {canFire(employee)}
                        </section>
                })
            }
        </article>
    </>
}