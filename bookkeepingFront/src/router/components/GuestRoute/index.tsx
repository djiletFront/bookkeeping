import React from "react"
import {Navigate} from "react-router-dom"
import {RouteComponentInterface} from "../../../types/routeComponent.interface"

const GuestRoute = ({auth, component: Component} : RouteComponentInterface) => {
	return !auth ? <Component/> : <Navigate to="/Profile"/>
}


export default GuestRoute