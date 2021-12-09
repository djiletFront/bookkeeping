import React, {useState} from "react"
import Modal from "@mui/material/Modal"
import {Avatar, IconButton} from "@mui/material"
import "./index.scss"
import {ApiReceiptInterface} from "../../types/apiReceipt.interface"
import {CardMedia} from "@material-ui/core"
import CloseIcon from "@mui/icons-material/Close"

interface ReceiptCardProps {
	receipt: ApiReceiptInterface
}

const ReceiptCard = ({
	receipt
}: ReceiptCardProps) => {
	const receiptImage = receipt.image.toString()

	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}


	// @ts-ignore
	return (
		<div>
			<IconButton component="span" onClick={handleOpen}>
				<Avatar className="receipt-info__button">
					{receipt.id}
				</Avatar>
			</IconButton>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<div className="receipt-info">
					<div className="receipt-info__button-close">
						<IconButton onClick={handleClose}>
							<CloseIcon/>
						</IconButton>
					</div>
					<div className="receipt-info__image">
						<CardMedia
							component="img"
							image={receiptImage}
							alt="receipt photo"
						/>
					</div>
					<p className="receipt-info__data">КАТЕГОРИЯ: <b><i>{receipt.category}</i></b></p>
					<p className="receipt-info__data">СУММА: <b><i>{receipt.sum}</i></b></p>
					<p className="receipt-info__data">ДАТА: <b><i>{receipt.date}</i></b></p>
				</div>
			</Modal>
		</div>
	)
}

export default ReceiptCard
