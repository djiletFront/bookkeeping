import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../store/reducers/rootReducer"
import {FETCH_PROFILE, FETCH_UPDATE_PROFILE, RESET_PROFILE_STATE} from "../../store/actionTypes/profile"
import "./index.scss"
import CustomInputText from "../../components/common/CustomInputText"
import {useForm} from "react-hook-form"
import {Button} from "@mui/material"
import {ApiProfileInterface} from "../../types/apiProfile.interface"
import profileSchema from "../../utils/profile.validation"
import {yupResolver} from "@hookform/resolvers/yup"
import Spinner from "../../components/Spinner"
import AlertError from "../../components/common/AlertError"
import {useSnackbar} from "notistack"
import {MessageConst} from "../../constants/message.const"
import {ErrorSnackOption, SuccessSnackOption} from "../../constants/snackbarOption.const"

const Profile = () => {
	const {
		userData,
		loading,
		successfullyUpdated,
		errorLogin,
		errorPhone,
		errorEmail,
		error
	} = useSelector((state: RootState) => state.profile)

	const dispatch = useDispatch()

	const {control, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(profileSchema)
	})

	const {enqueueSnackbar} = useSnackbar()
	const successUpdated = () => enqueueSnackbar(MessageConst.profileSuccessUpdated, SuccessSnackOption)
	const errorLoginSnack = () => enqueueSnackbar(MessageConst.profileLoginError, ErrorSnackOption)
	const errorPhoneSnack = () => enqueueSnackbar(MessageConst.profilePhoneError, ErrorSnackOption)
	const errorEmailSnack = () => enqueueSnackbar(MessageConst.profileEmailError, ErrorSnackOption)

	useEffect(() => {
		dispatch({type: FETCH_PROFILE})
		return () => {
			dispatch({type: RESET_PROFILE_STATE})
		}
	}, [dispatch])

	useEffect(() => {
		if (successfullyUpdated) successUpdated()
		if (errorLogin) errorLoginSnack()
		if (errorPhone) errorPhoneSnack()
		if (errorEmail) errorEmailSnack()
	}, [successfullyUpdated, errorLogin, errorPhone, errorEmail])

	const onSubmit = (data: ApiProfileInterface) => {
		dispatch({type: FETCH_UPDATE_PROFILE, payload: data})
	}

	if (userData === null || loading) return <Spinner/>
	if (error) return <AlertError/>
	return (
		<div className="profile">
			<form className="profile-card" onSubmit={handleSubmit(onSubmit)}>
				<CustomInputText
					control={control}
					errors={errors}
					name="name"
					title="Имя"
					defaultValue={userData.name}
				/>
				<CustomInputText
					control={control}
					errors={errors}
					name="surname"
					title="Фамилия"
					defaultValue={userData.surname}
				/>
				<CustomInputText
					control={control}
					errors={errors}
					name="login"
					title="Логин"
					defaultValue={userData.login}
				/>
				<CustomInputText
					control={control}
					errors={errors}
					name="password"
					title="Пароль"
				/>
				<CustomInputText
					control={control}
					errors={errors}
					name="phone"
					title="Телефон"
					defaultValue={userData.phone}
				/>
				<CustomInputText
					control={control}
					errors={errors}
					name="email"
					title="Email"
					defaultValue={userData.email}
				/>
				<Button
					variant="contained"
					type="submit"
					className="profile-card__submit"
				>
					Изменить данные
				</Button>
			</form>
		</div>
	)
}

export default Profile
