import React from "react"
import "./index.scss"
import {Backdrop, Box, Button, Fade, IconButton, Modal} from "@mui/material"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import newReceipSchema from "../../utils/newReceipt.validation"
import CustomFormSelect from "../common/CustomFormSelect"
import FormFullDatePicker from "../common/FormFullDatePicker"
import moment from "moment"
import CustomInputFile from "../common/CustomInputFile"
import CustomInputText from "../common/CustomInputText"
import CloseIcon from "@mui/icons-material/Close"
import {Categories} from "../../constants/category.const"
import {useDispatch} from "react-redux"
import {getBase64} from "../../utils/Base64Convert"
import {FETCH_UPLOAD_RECEIPT} from "../../store/actionTypes/receipts"
import {formReceiptStartData} from "../../constants/formReceiptStartData"
import {ApiReceiptInterface} from "../../types/apiReceipt.interface"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: "20px",
} as const


// @ts-ignore
const UploadReceiptButton = () => {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const dispatch = useDispatch()

	const {control, register, watch, handleSubmit, formState: {errors}, reset, setValue} = useForm({
		resolver: yupResolver(newReceipSchema)
	})

	// @ts-ignore
	const fileName = watch("image")

	const onSubmit = async (data: ApiReceiptInterface) => {
		data.date = moment(data.date).format("YYYY-MM-DD")
		// @ts-ignore
		data.image = await getBase64(data.image[0])
		reset(formReceiptStartData)
		setValue("image", "")
		handleClose()
		dispatch({type: FETCH_UPLOAD_RECEIPT, payload: data})
	}

	return (
		<>
			<Button
				className="new-receipt-button"
				variant="contained"
				onClick={handleOpen}
			>
				Добавить чек
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				className="new-receipt-modal"
			>
				<Fade in={open}>
					<Box sx={style} className="receipt-form">
						<div className="receipt-form__button-close">
							<IconButton onClick={handleClose}>
								<CloseIcon/>
							</IconButton>
						</div>
						<p className="receipt-form__title">Добавить чек</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="receipt-form__input">
								<CustomFormSelect
									control={control}
									errors={errors}
									name="category"
									title="Категория"
									selectItems={Categories}
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
								/>
							</div>
							<div className="receipt-form__input">
								<FormFullDatePicker
									control={control}
									errors={errors}
									name="date"
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
								Добавить
							</Button>
						</form>
					</Box>
				</Fade>
			</Modal>
		</>
	)
}

export default UploadReceiptButton
