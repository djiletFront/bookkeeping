import React, {useEffect, useState} from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableFooter from "@mui/material/TableFooter"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import {TableTitleConst} from "../../constants/tableTitle.const"
import "./index.scss"
import {IconButton} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import {ApiReceiptInterface} from "../../types/apiReceipt.interface"
import ButtonDelete from "./ButtonDelete"
import {NavLink} from "react-router-dom"

type ReceiptsTableProps = {
	receipts: Array<ApiReceiptInterface> | [],
}

const ReceiptsTable = ({
	receipts
}: ReceiptsTableProps) => {

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	useEffect(() => {
		setPage(0)
	}, [receipts])


	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	if (!receipts.length) {
		return (
			<h2>Чеков еще нет</h2>
		)
	}
	return (
		<TableContainer component={Paper}>
			<Table sx={{minWidth: 500}} aria-label="custom pagination table">
				<TableBody>
					<TableRow>
						{
							TableTitleConst.map((value: string, index: number) => (
								<TableCell key={index} className="table-th">
									{value}
								</TableCell>
							))
						}
					</TableRow>
					{(rowsPerPage > 0
						? receipts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: receipts
					).map((receipt: ApiReceiptInterface, index: number) => (
						<TableRow key={index}>
							<TableCell>
								{receipt.id}
							</TableCell>
							<TableCell>
								{receipt.category}
							</TableCell>
							<TableCell>
								{receipt.sum}
							</TableCell>
							<TableCell>
								{receipt.date}
							</TableCell>
							<TableCell>
								<IconButton component={NavLink} to={`/Receipts/${receipt.id}`}>
									<EditIcon/>
								</IconButton>
								&nbsp;/&nbsp;
								<ButtonDelete
									id={Number(receipt.id)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							colSpan={TableTitleConst.length}
							count={receipts.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	)
}

export default ReceiptsTable
