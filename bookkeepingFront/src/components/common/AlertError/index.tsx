import React from "react"
import { Alert } from "@mui/material"
import {MessageConst} from "../../../constants/message.const"

const AlertError = () =>
	(
		<Alert variant="filled" severity="error" sx={{justifyContent: "center"}}>
			{MessageConst.serverError}
		</Alert>
	)


export default AlertError
