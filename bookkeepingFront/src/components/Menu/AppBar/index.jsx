import React from "react"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const AppBar = ({CreateAppBar, open, handleDrawerOpen, logOut}) => (
	<>
		<CreateAppBar position="fixed" open={open} sx={{background: "#3eabb5"}}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: "36px",
						...(open && {display: "none"}),
					}}
				>
					<MenuIcon/>
				</IconButton>
				<Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
					Бухгалтерия
				</Typography>
				<IconButton onClick={logOut}>
					<ExitToAppIcon sx={{color: "#d9d9d9"}}/>
				</IconButton>
			</Toolbar>
		</CreateAppBar>
	</>
)

export default AppBar