import React from "react"
import {Navigate} from "react-router-dom"
import {RouteComponentInterface} from "../../../types/routeComponent.interface"

const PrivateRoute = ({auth, component: Component}: RouteComponentInterface) => {
	return auth ? <Component/> : <Navigate to="/Login"/>
}

export default PrivateRoute