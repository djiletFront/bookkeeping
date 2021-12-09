import {combineReducers} from "redux"
import receiptReducer from "./receipt"
import receiptsReducer from "./receipts"
import profileReducer from "./profile"


export const rootReducer = combineReducers({
	profile: profileReducer,
	receipts: receiptsReducer,
	receipt: receiptReducer
})

export type RootState = ReturnType<typeof rootReducer>