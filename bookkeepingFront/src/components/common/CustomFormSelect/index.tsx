import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import {Controller} from "react-hook-form"
import {FormHelperText} from "@material-ui/core"
import {InputSelect} from "../../../types/inputs.interface"

const CustomFormSelect = ({
	control,
	errors = null,
	name,
	title,
	defaultValue = "",
	selectItems
}: InputSelect) => (
	<>
		<FormControl fullWidth error={!!errors?.[name]?.message}>
			<InputLabel htmlFor="select-category">
				{title}
			</InputLabel>
			<Controller
				control={control}
				name={name}
				defaultValue={defaultValue}
				render={({field}) => (
					<Select
						{...field}
						id="select-category"
						label={title}
					>
						{
							selectItems.map(({value}, index) => (
								<MenuItem key={index} value={value}>
									{value}
								</MenuItem>
							))
						}
					</Select>
				)}
			/>
		</FormControl>
		{
			!!errors?.[name]?.message &&
			<FormHelperText style={{color: "#d32f2f"}}>{errors?.[name]?.message}</FormHelperText>
		}
	</>
)


export default CustomFormSelect
