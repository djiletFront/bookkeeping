import React from "react"
import Box from "@mui/material/Box"
import {DrawerHeader} from "../utils/DrawerHeader"
import Menu from "../components/Menu"
import Router from "../router"
import Cookies from "js-cookie"

export default function Main() {

	const isAuth = !!Cookies.get("token")

	return (
		<Box sx={{display: "flex"}}>
			{isAuth && <Menu/>}
			<main>
				{isAuth && <DrawerHeader/>}
				<Router isAuth={isAuth}/>
			</main>
		</Box>
	)
}
