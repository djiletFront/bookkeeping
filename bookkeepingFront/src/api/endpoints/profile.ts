import axios from "../axios"
import { AxiosResponse } from "axios"
import {ApiProfileInterface} from "../../types/apiProfile.interface"

const endpoints = {
	getProfile: (): Promise<AxiosResponse<ApiProfileInterface>> => axios.get("/profile"),
	updateProfile: (data: ApiProfileInterface) => axios.put("/profile", data),
}

export default endpoints
