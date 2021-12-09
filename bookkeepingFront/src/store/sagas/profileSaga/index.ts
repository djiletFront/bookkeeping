import {call, takeEvery, put, takeLatest, delay} from "redux-saga/effects"
import api from "../../../api"
import {
	FETCH_PROFILE, FETCH_UPDATE_PROFILE, SET_EMAIL_ERROR, SET_LOGIN_ERROR, SET_PHONE_ERROR,
	SET_PROFILE_ERROR,
	SET_PROFILE_LOADING,
	SET_PROFILE_SUCCESS,
	UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS
} from "../../actionTypes/profile"


function* loadProfile() {
	try {
		yield put({type: SET_PROFILE_LOADING})
		yield delay(350)
		const {data} = yield call(api.profile.getProfile)
		yield put({type: SET_PROFILE_SUCCESS, payload: data})
	} catch (e) {
		yield put({type: SET_PROFILE_ERROR, payload: e})
	}
}


function* updateProfile(action: any) {
	try {
		yield put({type: UPDATE_PROFILE_LOADING})
		yield delay(350)
		yield call(api.profile.updateProfile, action.payload)
		yield put({type: UPDATE_PROFILE_SUCCESS})
	} catch (e: any) {
		if (e.request.status === 409) {
			if (e.response.data === "login") yield put({type: SET_LOGIN_ERROR})
			if (e.response.data === "phone") yield put({type: SET_PHONE_ERROR})
			if (e.response.data === "email") yield put({type: SET_EMAIL_ERROR})
		} else {
			yield put({type: SET_PROFILE_ERROR, payload: e})
		}
	}
}


export default function* profileSaga() {
	yield takeEvery(FETCH_PROFILE, loadProfile)
	yield takeLatest(FETCH_UPDATE_PROFILE, updateProfile)
}