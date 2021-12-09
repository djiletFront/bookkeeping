import React from "react"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {DatePicker} from "@mui/lab"
import {TextField} from "@mui/material"

// @ts-ignore
const MonthDatePicker = ({value, setValue}) => (
	<LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
		<DatePicker
			views={["year", "month"]}
			label="Месяц и Год"
			minDate={new Date("2020-01-01")}
			maxDate={new Date()}
			value={value}
			onChange={(newValue) => {
				setValue(newValue)
			}}
			renderInput={(params) =>
				<TextField
					{...params}
					fullWidth
					onKeyDown={(e) => e.preventDefault()}
				/>
			}
		/>
	</LocalizationProvider>
)


export default MonthDatePicker
