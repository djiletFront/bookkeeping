import React from "react"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {DatePicker} from "@mui/lab"
import {TextField} from "@mui/material"
import {Controller} from "react-hook-form"
import {DatepickerInterface} from "../../../types/datepicker.interface"

const FormFullDatePicker = ({
	control,
	errors,
	name,
	defaultValue = new Date()
}: DatepickerInterface) => (
	<Controller
		name={name}
		control={control}
		defaultValue={defaultValue}
		render={({field}) => (
			<LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
				<DatePicker
					{...field}
					mask={"__.__.____"}
					value={field.value}
					maxDate={new Date()}
					onChange={(e) => field.onChange(e)}
					renderInput={(params) =>
						<TextField
							{...params}
							error={!!errors?.[name]?.message}
							helperText={errors?.[name]?.message}
						/>
					}
				/>
			</LocalizationProvider>
		)}
	/>
)

export default FormFullDatePicker
