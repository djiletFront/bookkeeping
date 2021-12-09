export interface ApiReceiptInterface {
	id?: number | string,
	category: string,
	sum: number,
	date: Date | string,
	image: File | string
}
