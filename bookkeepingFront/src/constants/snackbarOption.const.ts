import {OptionsObject} from "notistack"

export const SuccessSnackOption: OptionsObject = {
	variant: "success",
	anchorOrigin: {
		vertical: "top",
		horizontal: "center"
	},
	autoHideDuration: 3500
}

export const ErrorSnackOption: OptionsObject = {
	variant: "error",
	anchorOrigin: {
		vertical: "top",
		horizontal: "center"
	},
	autoHideDuration: 4500
}


