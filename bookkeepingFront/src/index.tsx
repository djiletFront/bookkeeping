import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./components/App"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {SnackbarProvider} from "notistack"
import store from "./store"
// @ts-ignore
import {Helmet} from "react-helmet"

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<SnackbarProvider maxSnack={1}>
				{/* Скрипт для графика */}
				<Helmet>
					<script src="https://cdn.jsdelivr.net/npm/chart.js" type="text/javascript"/>
				</Helmet>
				<App/>
			</SnackbarProvider>
		</BrowserRouter>
	</Provider>
	,
	document.getElementById("root"),
)