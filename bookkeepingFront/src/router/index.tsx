import React from "react"
import {lazy, Suspense} from "react"
import {Routes, Route} from "react-router-dom"
import PrivateRoute from "./components/Private"
import GuestRoute from "./components/GuestRoute"
import {routes} from "./routes"
import Spinner from "../components/Spinner"

const Page404: React.FC = lazy(() => import("../pages/Page404/"))

type RouterProps = {
	isAuth: boolean
}

const Router = ({isAuth}: RouterProps) => {
	return (
		<>
			<Suspense fallback={<Spinner/>}>
				<Routes>
					{
						routes.map(({
							privatePage,
							component,
							link
						}, index) => (
							<Route
								key={index}
								path={link}
								element={
									privatePage ?
										<PrivateRoute auth={isAuth} component={component}/> :
										<GuestRoute auth={isAuth} component={component}/>
								}
							/>
						)
						)
					}
					<Route path="*" element={<Page404/>}/>
				</Routes>
			</Suspense>
		</>
	)
}

export default Router