import axios from "../axios"
import { AxiosResponse } from "axios"
import {ApiReceiptInterface} from "../../types/apiReceipt.interface"

const endpoints = {
	getReceipts: (): Promise<AxiosResponse<Array<ApiReceiptInterface>>> => axios.get("/receipt"),
	getReceipt: (id: number): Promise<AxiosResponse<ApiReceiptInterface>> => axios.get(`/receipt/${id}`),
	addReceipt: (data: ApiReceiptInterface): Promise<AxiosResponse<Array<ApiReceiptInterface>>> => axios.post("/receipt", data),
	updateReceipt: (data: ApiReceiptInterface): Promise<AxiosResponse<string>> => axios.put("/receipt", data),
	deleteReceipt: (id: number) => axios.delete(`/receipt/${id}`)
}

export default endpoints
