import {call, takeEvery, put, takeLatest, delay} from "redux-saga/effects"
import api from "../../../api"
import {
	DELETE_RECEIPT,
	DELETE_RECEIPT_LOADING,
	DELETE_RECEIPT_SUCCESS,
	FETCH_DELETE_RECEIPT,
	FETCH_RECEIPT,
	FETCH_RECEIPTS,
	FETCH_UPDATE_RECEIPT,
	FETCH_UPLOAD_RECEIPT, SET_RECEIPT_ERROR,
	SET_RECEIPT_LOADING, SET_RECEIPT_SUCCESS,
	SET_RECEIPTS_ERROR,
	SET_RECEIPTS_LOADING,
	SET_RECEIPTS_SUCCESS, UPDATE_RECEIPT_LOADING, UPDATE_RECEIPT_SUCCESS,
	UPLOAD_RECEIPT_LOADING,
	UPLOAD_RECEIPT_SUCCESS
} from "../../actionTypes/receipts"


function* loadReceipts() {
	try {
		yield put({type: SET_RECEIPTS_LOADING})
		yield delay(350)
		const {data} = yield call(api.receipt.getReceipts)
		yield put({type: SET_RECEIPTS_SUCCESS, payload: data})
	} catch (e) {
		yield put({type: SET_RECEIPTS_ERROR, payload: e})
	}
}

function* uploadReceipt(action: any) {
	try {
		yield put({type: UPLOAD_RECEIPT_LOADING})
		const {data} = yield call(api.receipt.addReceipt, action.payload)
		yield delay(350)
		yield put({type: UPLOAD_RECEIPT_SUCCESS, payload: data})
	} catch (e) {
		yield put({type: SET_RECEIPTS_ERROR, payload: e})
	}
}

function* deleteReceipt(action: any) {
	try {
		yield put({type: DELETE_RECEIPT_LOADING})
		yield call(api.receipt.deleteReceipt, action.payload)
		yield put({type: DELETE_RECEIPT, payload: action.payload})
		yield put({type: DELETE_RECEIPT_SUCCESS})
	} catch (e) {
		yield put({type: SET_RECEIPTS_ERROR, payload: e})
	}
}

function* loadReceipt(action: any) {
	try {
		yield put({type: SET_RECEIPT_LOADING})
		yield delay(350)
		const {data} = yield call(api.receipt.getReceipt, action.payload)
		yield put({type: SET_RECEIPT_SUCCESS, payload: data})
	} catch (e) {
		yield put({type: SET_RECEIPT_ERROR, payload: e})
	}
}

function* updateReceipt(action: any) {
	try {
		yield put({type: UPDATE_RECEIPT_LOADING})
		const {data} = yield call(api.receipt.updateReceipt, action.payload)
		yield delay(350)
		action.payload.image = data
		yield put({type: UPDATE_RECEIPT_SUCCESS, payload: action.payload})
	} catch (e) {
		yield put({type: SET_RECEIPT_ERROR, payload: e})
	}
}

export default function* receiptsSaga() {
	yield takeEvery(FETCH_RECEIPTS, loadReceipts)
	yield takeLatest(FETCH_UPLOAD_RECEIPT, uploadReceipt)
	yield takeLatest(FETCH_DELETE_RECEIPT, deleteReceipt)
	yield takeEvery(FETCH_RECEIPT, loadReceipt)
	yield takeLatest(FETCH_UPDATE_RECEIPT, updateReceipt)
}