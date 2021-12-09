import {Alert, Avatar, Button, TextField} from "@mui/material"
import React, {useState} from "react"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import "./index.scss"
import Cookies from "js-cookie"
import axios, {AxiosResponse} from "axios"
import {MessageConst} from "../../constants/message.const"

type ServerResponse = { token: string }

export default function Login() {

	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleLogin = async () => {
		try {
			setLoading(true)
			const {data}: AxiosResponse<ServerResponse> = await axios.post(
				`${process.env.REACT_APP_BACKEND}/login`,
				{login, password}
			)
			await Cookies.set("token", data.token)
			window.location.href = `${process.env.REACT_APP_DOMAIN}/Profile`
		} catch (e) {
			// @ts-ignore
			e.response.status === 401 ?
				setError(MessageConst.wrongAuth) :
				setError(MessageConst.serverError)
			setLoading(false)
		}
	}

	return (
		<div className="form-container">
			<div className="login-form">
				<Avatar
					className="login-form__avatar"
					sx={{m: "0 auto", bgcolor: "secondary.main"}}
				>
					<LockOutlinedIcon/>
				</Avatar>
				<p className="login-form__title">Вход</p>
				<TextField
					label="Логин"
					fullWidth
					variant="outlined"
					type="text"
					className="login-form__input"
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
				<TextField
					label="Пароль"
					fullWidth
					variant="outlined"
					className="login-form__input"
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				{
					error &&
					<Alert severity="error" className="login-form__alert">
						{error}
					</Alert>
				}
				<Button
					variant="contained"
					fullWidth
					className="login-form__button"
					onClick={handleLogin}
				>
					Войти
				</Button>
			</div>
		</div>
	)
}