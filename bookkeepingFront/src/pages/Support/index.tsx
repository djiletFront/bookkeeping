import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import Typography from "@mui/material/Typography"
import "./index.scss"
import {useState} from "react"
import {useSnackbar} from "notistack"
import Spinner from "../../components/Spinner"
import {MessageConst} from "../../constants/message.const"
import {SuccessSnackOption} from "../../constants/snackbarOption.const"
import AlertError from "../../components/common/AlertError"
import axiosInstance from "../../api/axios"

const Support = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState(false)


	const {enqueueSnackbar} = useSnackbar()
	const successUploaded = () => enqueueSnackbar(MessageConst.supportMessageUpload, SuccessSnackOption)

	const handleSubmit = () => {
		if (message.length === 0) {
			setErrorMessage(true)
		} else {
			setLoading(true)
			setTimeout(async function () {
				try {
					setErrorMessage(false)
					await axiosInstance.post(
						`${process.env.REACT_APP_BACKEND}/message`,
						{message}
					)
					setMessage("")
					setLoading(false)
					successUploaded()
				} catch (e) {
					setLoading(false)
					setError(true)
				}
			}, 350)
		}
	}

	if (loading) return <Spinner/>
	if (error) return <AlertError/>
	return (
		<div>
			<div className="support-form">
				<Avatar sx={{m: 1, bgcolor: "#3eabb5"}}>
					<SupportAgentIcon/>
				</Avatar>
				<Typography component="h1" variant="h5" sx={{mb: "12.5px"}}>
					Поддержка
				</Typography>
				<TextField
					value={message}
					onChange={e => setMessage(e.target.value)}
					className="support-form__text"
					label="Сообщение"
					fullWidth
					multiline
					rows={9}
					placeholder="Опишите вашу проблему"
					error={errorMessage}
					helperText={errorMessage && "Введите сообщение"}
				/>
				<Button
					className="support-form__button"
					fullWidth
					variant="contained"
					onClick={handleSubmit}
				>
					Отправить
				</Button>
			</div>
		</div>
	)
}

export default Support