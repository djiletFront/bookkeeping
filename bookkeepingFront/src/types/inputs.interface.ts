import {Control, FieldValues} from "react-hook-form/dist/types"
import {SelectItem} from "./selectItem.interface"

interface Input {
	control: Control<FieldValues, object> | undefined,
	errors: any,
	name: string,
	title: string,
	defaultValue?: string | number | undefined
}

//********************************************

export interface InputSelect extends Input {
	selectItems: Array<SelectItem>
}

//********************************************
export interface InputText extends Input{
	type?: string,
	mark?: string,
}
