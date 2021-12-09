import React, {useState} from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import {TransitionProps} from "@mui/material/transitions"
import {IconButton} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import {useDispatch} from "react-redux"
import {FETCH_DELETE_RECEIPT} from "../../../store/actionTypes/receipts"

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />
})

type DeleteButtonProps = {
	id: number,
}

const ButtonDelete = ({
	id,
}: DeleteButtonProps) => {

	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const handleConfirm = () => {
		handleClose()
		dispatch({type: FETCH_DELETE_RECEIPT, payload: id})
	}

	return (
		<>
			<IconButton onClick={handleClickOpen}>
				<DeleteIcon/>
			</IconButton>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{`Вы действительно хотите удалить чек ${id} ?`}</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose}>Нет</Button>
					<Button onClick={handleConfirm}>Да</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ButtonDelete