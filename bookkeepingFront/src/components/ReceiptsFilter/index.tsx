import React, {useState} from "react"
import CustomSelect from "../common/CustomSelect"
import {Categories} from "../../constants/category.const"
import MonthDatePicker from "../common/MonthDatePicker"
import {Button} from "@mui/material"

type ReceiptFilterProps = {
	setCategoryFilter: (arg0: string) => void,
	setDateFilter: (arg0: Date | null | string) => void
}

const ReceiptsFilter = ({
	setCategoryFilter,
	setDateFilter
}: ReceiptFilterProps) => {

	const [category, setCategory] = useState<string>("")
	const [date, setDate] = useState<Date | null | string>(null)

	const resetFilters = () => {
		// local date
		setCategory("")
		setDate(null)

		// global filter
		setCategoryFilter("")
		setDateFilter(null)
	}

	const setFilters = () => {
		setCategoryFilter(category)
		setDateFilter(date)
	}

	return (
		<>
			<div className="filter-form__inputs">
				<div className="block-category">
					<CustomSelect
						title="Категория"
						selectItems={Categories}
						value={category}
						setValue={setCategory}
					/>
				</div>
				<div className="block-date">
					<MonthDatePicker
						value={date}
						setValue={setDate}
					/>
				</div>
			</div>
			<div className="filter-form__buttons">
				<Button
					variant="contained"
					className="button button-reset"
					onClick={resetFilters}
					// @ts-ignore
					// disabled={!Boolean(Date.parse(date)) && true}
				>
					Сбросить филтры
				</Button>
				<Button
					variant="contained"
					className="button"
					color="success"
					onClick={setFilters}
				>
					Отфильтровать
				</Button>
			</div>
		</>
	)
}

export default ReceiptsFilter
