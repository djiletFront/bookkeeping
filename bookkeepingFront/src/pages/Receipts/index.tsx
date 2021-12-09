import React, {useEffect, useState} from "react"
import UploadReceiptButton from "../../components/UploadReceiptButton"
import "./index.scss"
import ReceiptsTable from "../../components/ReceiptsTable"
import {filterReceiptsFunc} from "../../utils/filterReceiptsFunc"
import ReceiptsFilter from "../../components/ReceiptsFilter"
import {useDispatch, useSelector} from "react-redux"
import AlertError from "../../components/common/AlertError"
import Spinner from "../../components/Spinner"
import {FETCH_RECEIPTS, RESET_RECEIPTS_STATE} from "../../store/actionTypes/receipts"
import {useSnackbar} from "notistack"
import {MessageConst} from "../../constants/message.const"
import {SuccessSnackOption} from "../../constants/snackbarOption.const"
import {RootState} from "../../store/reducers/rootReducer"


const Receipts = () => {
	const dispatch = useDispatch()

	const {
		receipts: apiReceipts,
		loading,
		successfullyUploaded,
		successfullyDeleted,
		error
	} = useSelector((state: RootState) => state.receipts)

	const {enqueueSnackbar} = useSnackbar()
	const successUploaded = () => enqueueSnackbar(MessageConst.receiptSuccessUpload, SuccessSnackOption)
	const successDeleted = () => enqueueSnackbar(MessageConst.receiptSuccessDeleted, SuccessSnackOption)

	useEffect(() => {
		dispatch({type: FETCH_RECEIPTS})
		return () => {dispatch({type: RESET_RECEIPTS_STATE})}
	}, [dispatch])

	useEffect(() => {
		if (successfullyUploaded) successUploaded()
		if (successfullyDeleted) successDeleted()
	}, [successfullyUploaded, successfullyDeleted])


	const [categoryFilter, setCategoryFilter] = useState<string>("")
	const [dateFilter, setDateFilter] = useState<Date | null | string>(null)

	const receipts = filterReceiptsFunc(
		apiReceipts,
		categoryFilter,
		dateFilter
	)

	if (!!error) return <AlertError/>
	if (loading) return <Spinner/>
	return (
		<>
			<div className="receipts">
				<section className="receipts-header">
					<div className="receipts-header__add-button">
						<UploadReceiptButton/>
					</div>
					<div className="receipts-header__filter-form">
						<ReceiptsFilter
							setCategoryFilter={setCategoryFilter}
							setDateFilter={setDateFilter}
						/>
					</div>
				</section>
				<br/>
				<section className="receipts-content">
					<ReceiptsTable
						receipts={receipts}
					/>
				</section>
			</div>
		</>
	)
}

export default Receipts
