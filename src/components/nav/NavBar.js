import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"
import { kandyUserObject } from "../ApiManager"

export const NavBar = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.employee) {
        return <EmployeeNav />
    } else {
        return <CustomerNav />
    }
}

