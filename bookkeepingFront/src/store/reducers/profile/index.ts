import {
	RESET_PROFILE_STATE,
	SET_EMAIL_ERROR,
	SET_LOGIN_ERROR, SET_PHONE_ERROR,
	SET_PROFILE_ERROR,
	SET_PROFILE_LOADING,
	SET_PROFILE_SUCCESS,
	UPDATE_PROFILE_LOADING,
	UPDATE_PROFILE_SUCCESS
} from "../../actionTypes/profile"

interface InitialState {
	userData: UserData | null | undefined,
	loading: boolean,
	successfullyUpdated: boolean,
	errorLogin: boolean,
	errorEmail: boolean,
	errorPhone: boolean,
	error: any
}

type UserData = {
	login: string,
	password: string,
	name: string,
	surname: string,
	phone: string,
	email: string,
}

const initialState: InitialState = {
	userData: null,
	loading: false,
	successfullyUpdated: false,
	errorLogin: false,
	errorEmail: false,
	errorPhone: false,
	error: null
}

export default function profileReducer(state = initialState, action: { type: any; payload: any }) {
	switch (action.type) {
	case SET_PROFILE_LOADING:
		return {
			...state,
			loading: true,
			successfullyUpdated: false,
			errorLogin: false,
			errorEmail: false,
			errorPhone: false,
			error: null
		}
	case UPDATE_PROFILE_LOADING:
		return {
			...state,
			loading: true,
			errorLogin: false,
			errorEmail: false,
			errorPhone: false,
			successfullyUpdated: false,
		}
		//-------------------
	case SET_PROFILE_SUCCESS:
		return {
			...state,
			loading: false,
			userData: action.payload
		}
	case UPDATE_PROFILE_SUCCESS:
		return {
			...state,
			loading: false,
			successfullyUpdated: true
		}
		//-------------------
	case RESET_PROFILE_STATE:
		return {
			...state,
			...initialState
		}
	case SET_LOGIN_ERROR:
		return {
			...state,
			loading: false,
			errorLogin: true
		}
	case SET_EMAIL_ERROR:
		return {
			...state,
			loading: false,
			errorEmail: true
		}
	case SET_PHONE_ERROR:
		return {
			...state,
			loading: false,
			errorPhone: true
		}
	case SET_PROFILE_ERROR:
		return {
			...state,
			loading: false,
			userData: undefined,
			error: action.payload
		}
	default:
		return state
	}
}