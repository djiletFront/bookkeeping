import moment from "moment"
import {Categories} from "../constants/category.const"
import {ApiReceiptInterface} from "../types/apiReceipt.interface"


export const TotalSum = (receipts: Array<ApiReceiptInterface>, date: Date | null = null) => {
	let sum = 0

	if (date) {
		const monthReceipts = receipts.filter(receipt =>
			moment(receipt.date).format("YYYY-MM") === moment(date).format("YYYY-MM")
		)
		monthReceipts.forEach(receipt => sum += Number(receipt.sum))
	} else {
		receipts.forEach(receipt => sum += Number(receipt.sum))
	}

	return sum.toFixed(2)
}

export const statisticsForCategories = (receipts: Array<ApiReceiptInterface>, date: Date) => {
	const dataReceipts: any = []
	Object.values(Categories).forEach(category => {
		const categoryReceipts = receipts.filter((receipt: ApiReceiptInterface) => (
			receipt.category === category.value &&
			moment(receipt.date).format("YYYY-MM") === moment(date).format("YYYY-MM")
		)
		)
		dataReceipts.push(
			{
				name: category.value,
				sum: TotalSum(categoryReceipts),
				receipts: categoryReceipts
			}
		)
	})
	return dataReceipts
}


export const formatSum = (sum: string | number) => {
	const parts = sum.toString().split(".")
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
	return parts.join(".")
}