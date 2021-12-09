import {
	RESET_RECEIPT_STATE,
	SET_RECEIPT_ERROR,
	SET_RECEIPT_LOADING,
	SET_RECEIPT_SUCCESS,
	UPDATE_RECEIPT_LOADING,
	UPDATE_RECEIPT_SUCCESS
} from "../../actionTypes/receipts"
import {ApiReceiptInterface} from "../../../types/apiReceipt.interface"

interface InitialState {
	receipt: ApiReceiptInterface | null | undefined,
	loading: boolean,
	error: any,
	successfullyUpdated: boolean,
}

const initialState: InitialState = {
	receipt: null,
	loading: false,
	successfullyUpdated: false,
	error: null,
}

export default function receiptReducer(state = initialState, action: { type: any; payload: any }) {
	switch (action.type) {
	case SET_RECEIPT_LOADING:
		return {
			...state,
			loading: true,
			successfullyUpdated: false,
			error: null
		}
	case UPDATE_RECEIPT_LOADING:
		return {
			...state,
			loading: true,
			successfullyUpdated: false
		}
		//-------------------
	case SET_RECEIPT_SUCCESS:
		return {
			...state,
			loading: false,
			receipt: action.payload
		}
	case UPDATE_RECEIPT_SUCCESS:
		return {
			...state,
			loading: false,
			receipt: action.payload,
			successfullyUpdated: true
		}
		//-------------------
	case SET_RECEIPT_ERROR:
		return {
			...state,
			loading: false,
			error: action.payload,
			receipt: undefined
		}
	case RESET_RECEIPT_STATE:
		return {
			...state,
			...initialState
		}
	default:
		return state
	}
}