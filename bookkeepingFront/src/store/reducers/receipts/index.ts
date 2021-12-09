import {
	DELETE_RECEIPT, DELETE_RECEIPT_LOADING, DELETE_RECEIPT_SUCCESS, RESET_RECEIPTS_STATE,
	SET_RECEIPTS_ERROR,
	SET_RECEIPTS_LOADING, SET_RECEIPTS_SUCCESS, UPLOAD_RECEIPT_LOADING, UPLOAD_RECEIPT_SUCCESS
} from "../../actionTypes/receipts"
import {ApiReceiptInterface} from "../../../types/apiReceipt.interface"

type InitialState = {
	receipts: Array<ApiReceiptInterface> | [],
	loading: boolean,
	error: any,
	successfullyUploaded: boolean,
	successfullyDeleted: boolean,
}

const initialState: InitialState = {
	receipts: [],
	loading: false,
	successfullyUploaded: false,
	successfullyDeleted: false,
	error: null,
}

export default function receiptsReducer(state = initialState, action: { type: any; payload: any }) {
	switch (action.type) {
	case DELETE_RECEIPT:
		return {
			...state,
			receipts: state.receipts.filter(receipt => receipt.id !== action.payload)
		}
		//-------------------
	case SET_RECEIPTS_LOADING:
		return {
			...state,
			loading: true,
			successfullyUploaded: false,
			successfullyDeleted: false,
			error: null
		}
	case UPLOAD_RECEIPT_LOADING:
		return {
			...state,
			loading: true,
			successfullyUploaded: false,
			successfullyDeleted: false
		}
	case DELETE_RECEIPT_LOADING:
		return {
			...state,
			successfullyDeleted: false,
			successfullyUploaded: false
		}
		//-------------------
	case SET_RECEIPTS_SUCCESS:
		return {
			...state,
			loading: false,
			receipts: action.payload
		}
	case UPLOAD_RECEIPT_SUCCESS:
		return {
			...state,
			loading: false,
			receipts: action.payload,
			successfullyUploaded: true
		}
	case DELETE_RECEIPT_SUCCESS:
		return {
			...state,
			successfullyDeleted: true
		}
		//-------------------
	case SET_RECEIPTS_ERROR:
		return {
			...state,
			loading: false,
			error: action.payload
		}
	case RESET_RECEIPTS_STATE:
		return {
			...state,
			...initialState
		}
	default:
		return state
	}
}