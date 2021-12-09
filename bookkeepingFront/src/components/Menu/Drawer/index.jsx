import React from "react"
import IconButton from "@mui/material/IconButton"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import {DrawerHeader} from "../../../utils/DrawerHeader"
import {routes} from "../../../router/routes"
import CustomListItem from "./CustomListItem"

const Drawer = ({CreateDrawer, open, handleDrawerClose, theme}) => (
	<CreateDrawer variant="permanent" open={open}>
		<DrawerHeader>
			<IconButton onClick={handleDrawerClose}>
				{theme.direction === "rtl" ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
			</IconButton>
		</DrawerHeader>
		<Divider/>
		<List>
			{
				routes.filter(route => route.sidebar?.top === true).map((route, index) => (
					<CustomListItem
						link={route.link}
						title={route.title}
						icon={route.icon}
						key={index}
					/>
				))
			}
			<Divider sx={{m: "5px 0px"}}/>
			{
				routes.filter(route => route.sidebar?.top === false).map((route, index) => (
					<CustomListItem
						link={route.link}
						title={route.title}
						icon={route.icon}
						key={index}
					/>
				))
			}
		</List>
	</CreateDrawer>
)

export default Drawer