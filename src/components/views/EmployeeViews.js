import {Outlet, Route, Routes} from "react-router-dom"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList"
import { EmployeeList } from "../users/EmployeeList"
import { CustomerList } from "../users/CustomerList"
import { CustomerDetail } from "../users/CustomerDetail"
import { EmployeeRegistration } from "../users/EmployeeRegistration"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>Come on and git yer kandy, y'all</div>

					<Outlet />
				</>
			}>

				<Route path="products" element= { <ProductList /> } />

				<Route path="product/create" element= { <ProductForm /> } />

				<Route path="employees" element= { <EmployeeList /> } />

				<Route path="employees/new-employee" element={<EmployeeRegistration />} />

				<Route path="customers" element= { <CustomerList /> } />

				<Route path="customers/:customerId" element= { <CustomerDetail /> } />

			</Route>
		</Routes>
	)
}