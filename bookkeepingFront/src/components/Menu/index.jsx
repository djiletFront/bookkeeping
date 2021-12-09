import * as React from "react"
import {styled, useTheme} from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "./AppBar"
import Drawer from "./Drawer"
import "./index"
import Cookies from "js-cookie"

const drawerWidth = 240

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
})

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
})

const CreateAppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const CreateDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open"})(
	({theme, open}) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
		boxSizing: "border-box",
		...(open && {
			...openedMixin(theme),
			"& .MuiDrawer-paper": openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			"& .MuiDrawer-paper": closedMixin(theme),
		}),
	}),
)

const Menu = () => {
	const theme = useTheme()
	const [open, setOpen] = React.useState(false)

	const handleLogOut = () => {
		Cookies.remove("token")
		// eslint-disable-next-line no-undef
		window.location.href = `${process.env.REACT_APP_DOMAIN}/Login`
	}

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	return (
		<>
			<CssBaseline/>
			<AppBar
				CreateAppBar={CreateAppBar}
				open={open}
				handleDrawerOpen={handleDrawerOpen}
				logOut={handleLogOut}
			/>
			<Drawer
				CreateDrawer={CreateDrawer}
				handleDrawerClose={handleDrawerClose}
				open={open}
				theme={theme}
			/>
		</>
	)
}

export default Menu