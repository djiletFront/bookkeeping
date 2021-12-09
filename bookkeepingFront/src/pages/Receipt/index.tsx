import React, {useEffect} from "react"
import {useParams} from "react-router"
import {useSnackbar} from "notistack"
import {MessageConst} from "../../constants/message.const"
import {SuccessSnackOption} from "../../constants/snackbarOption.const"
import {useDispatch, useSelector} from "react-redux"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import moment from "moment"
import {getBase64} from "../../utils/Base64Convert"
import "./index.scss"
import {CardMedia} from "@material-ui/core"
import oldReceipSchema from "../../utils/oldReceipt.validation"
import {FETCH_RECEIPT, FETCH_UPDATE_RECEIPT, RESET_RECEIPT_STATE} from "../../store/actionTypes/receipts"
import CustomFormSelect from "../../components/common/CustomFormSelect"
import {Categories} from "../../constants/category.const"
import CustomInputText from "../../components/common/CustomInputText"
import FormFullDatePicker from "../../components/common/FormFullDatePicker"
import CustomInputFile from "../../components/common/CustomInputFile"
import {Button} from "@mui/material"
import Spinner from "../../components/Spinner"
import {RootState} from "../../store/reducers/rootReducer"
import {ApiReceiptInterface} from "../../types/apiReceipt.interface"

const Receipt = () => {

	const {id} = useParams()

	const dispatch = useDispatch()
	const {
		receipt,
		loading,
		error,
		successfullyUpdated
	} = useSelector((state: RootState) => state.receipt)

	const {control, register, watch, handleSubmit, formState: {errors}, setValue} = useForm({
		resolver: yupResolver(oldReceipSchema)
	})
	const fileName = watch("image")

	const {enqueueSnackbar} = useSnackbar()
	const successUpdated = () => enqueueSnackbar(MessageConst.receiptSuccessUpdated, SuccessSnackOption)

	useEffect(() => {
		dispatch({type: FETCH_RECEIPT, payload: Number(id)})
		return () => {
			dispatch({type: RESET_RECEIPT_STATE})
		}
	}, [dispatch])

	useEffect(() => {
		if (successfullyUpdated) successUpdated()
	}, [successfullyUpdated])


	const onSubmit = async (data: ApiReceiptInterface) => {
		data.date = moment(data.date).format("YYYY-MM-DD")
		// @ts-ignore
		data.image = (!!data.image.length) ? await getBase64(data.image[0]) : ""
		data["id"] = Number(id)
		dispatch({type: FETCH_UPDATE_RECEIPT, payload: data})
		setValue("image", "")
	}

	if (!!error) return <h2>Данные по чеку не найдены!</h2>
	if (receipt === null || loading) return <Spinner/>
	return (
		<div className="receipt">
			<div className="receipt-photo">
				<CardMedia
					component="img"
					height="auto"
					image={receipt.image}
					alt="receipt photo"
				/>
			</div>
			<form className="receipt-form-data" onSubmit={handleSubmit(onSubmit)}>
				<div className="receipt-form__input">
					<CustomFormSelect
						control={control}
						errors={errors}
						name="category"
						title="Категория"
						selectItems={Categories}
						defaultValue={receipt.category}
					/>
				</div>
				<div className="receipt-form__input input_text">
					<CustomInputText
						control={control}
						errors={errors}
						name="sum"
						title="Сумма"
						type="number"
						mark="₽"
						defaultValue={receipt.sum}
					/>
				</div>
				<div className="receipt-form__input">
					<FormFullDatePicker
						control={control}
						errors={errors}
						name="date"
						defaultValue={receipt.date}
					/>
				</div>
				<div className="receipt-form__input">
					<CustomInputFile
						register={register}
						errors={errors}
						name="image"
					/>
					{fileName && fileName[0]?.name}
				</div>
				<Button
					variant="contained"
					fullWidth
					type="submit"
					className="receipt-form-button"
				>
					Изменить
				</Button>
			</form>
		</div>
	)
}

export default Receipt
