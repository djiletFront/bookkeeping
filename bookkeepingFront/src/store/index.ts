import {applyMiddleware, createStore} from "redux"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas/rootSaga"
import {rootReducer} from "./reducers/rootReducer"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	rootReducer,
	// @ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
		applyMiddleware(
			sagaMiddleware,
		)
	)
)

sagaMiddleware.run(rootSaga)

export default store