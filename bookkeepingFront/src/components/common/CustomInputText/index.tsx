import {InputAdornment} from "@material-ui/core"
import {TextField} from "@mui/material"
import React from "react"
import {Controller} from "react-hook-form"
import {InputText} from "../../../types/inputs.interface"

const CustomInputText = ({
	control,
	errors = null,
	name,
	title,
	type = "",
	mark = "",
	defaultValue = ""
}: InputText) => (
	<Controller
		name={name}
		control={control}
		defaultValue={defaultValue}
		render={({field}) => (
			<TextField
				{...field}
				fullWidth={true}
				sx={{mb: "20px"}}
				label={title}
				type={type}
				variant="outlined"
				InputProps={{
					startAdornment: type === "number" &&
						<InputAdornment position="start">{mark}</InputAdornment>,
				}}
				error={!!errors?.[name]?.message}
				helperText={errors?.[name]?.message}
			/>
		)}
	/>
)

export default CustomInputText
