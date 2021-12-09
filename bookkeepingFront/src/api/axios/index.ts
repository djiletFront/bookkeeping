import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_BACKEND}`
})

axiosInstance.interceptors.request.use(
	config => {
		const token = Cookies.get("token")
		if (token) {
			// @ts-ignore
			config.headers["Authorization"] = "Bearer " + token
		} else {
			window.location.href = `${process.env.REACT_APP_DOMAIN}/Login`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	config => {
		return config
	},
	error => {
		const status = error.response ? error.response.status : null
		if (status === 401) {
			Cookies.remove("token")
			window.location.href = `${process.env.REACT_APP_DOMAIN}/Login`
		}
		return Promise.reject(error)
	}
)


export default axiosInstance