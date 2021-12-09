import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import {SelectItem} from "../../../types/selectItem.interface"
import { FormControl } from "@mui/material"

type CustomSelectProps = {
	title: string,
	selectItems: Array<SelectItem>,
	value: string,
	setValue: (value: string) => void
}

const CustomSelect = ({
	title,
	selectItems,
	value,
	setValue
}: CustomSelectProps) => (
	<FormControl fullWidth>
		<InputLabel htmlFor="select-category1">
			{title}
		</InputLabel>
		<Select
			label={title}
			id="select-category1"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		>
			{
				selectItems.map(({value}, index) => (
					<MenuItem key={index} value={value}>
						{value}
					</MenuItem>
				))
			}
		</Select>
	</FormControl>
)


export default CustomSelect
