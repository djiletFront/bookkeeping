import {Control, FieldValues} from "react-hook-form/dist/types"

export interface DatepickerInterface {
	control: Control<FieldValues, object> | undefined,
	errors: any,
	name: string,
	defaultValue?: string | Date
}
