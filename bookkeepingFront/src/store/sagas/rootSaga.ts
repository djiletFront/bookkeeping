import {all, spawn} from "redux-saga/effects"
import receiptsSaga from "./receiptsSaga"
import profileSaga from "./profileSaga"


export default function* rootSaga() {
	yield all([
		spawn(receiptsSaga),
		spawn(profileSaga)
	])
}