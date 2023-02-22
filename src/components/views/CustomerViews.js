import {Outlet, Route, Routes} from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { ProductContainer } from "../products/ProductContainer"
import { Purchases } from "../products/Purchases"

export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>Come on and git yer kandy, y'all</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={ <LocationList /> } />

				<Route path="find-candy" element= { <ProductContainer/> } />

				<Route path="purchases" element={ <Purchases /> } />

			</Route>
		</Routes>
	)
}