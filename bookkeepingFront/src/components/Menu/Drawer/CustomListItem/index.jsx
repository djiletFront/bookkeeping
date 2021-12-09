import React from "react"
import {NavLink} from "react-router-dom"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import {ListItem} from "@mui/material"
import {useMatch} from "react-router"


const CustomListItem = ({link, icon, title}) => {
	const match = useMatch(link)
	return (
		<ListItem
			button
			component={NavLink}
			to={link}
			sx={{
				background: match ? "#3eabb5" : "inherit",
				":hover": {
					background: "#badee0"
				}
			}}
		>
			<ListItemIcon>
				<img src={icon} alt={title}/>
			</ListItemIcon>
			<ListItemText primary={title}/>
		</ListItem>
	)
}

export default CustomListItem
