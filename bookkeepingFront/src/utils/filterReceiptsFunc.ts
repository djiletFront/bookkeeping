import moment from "moment"
import {ApiReceiptInterface} from "../types/apiReceipt.interface"

export const filterReceiptsFunc = (
	receipts: Array<ApiReceiptInterface>,
	category: string,
	date: Date | string | null
): Array<ApiReceiptInterface> | [] => {

	let filteredReceipts = receipts

	if (!!category) {
		filteredReceipts = filteredReceipts.filter(receipt => receipt.category === category)
	}

	if (date) {
		filteredReceipts = filteredReceipts.filter(receipt =>
			moment(receipt.date).format("YYYY-MM") === moment(date).format("YYYY-MM")
		)
	}

	return filteredReceipts
}