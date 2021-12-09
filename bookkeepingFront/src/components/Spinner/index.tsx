import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

const Spinner = () => (
	<div>
		<Backdrop
			sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
			open={true}
		>
			<CircularProgress
				size={60}
				thickness={4.5}
				sx={{color: "#13ea1f"}}
			/>
		</Backdrop>
	</div>
)

export default Spinner