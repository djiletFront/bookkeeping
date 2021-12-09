import * as yup from "yup"

const oldReceipSchema = yup.object().shape({
	category: yup
		.string()
		.required("Выберите категорию!"),
	sum: yup
		.number().typeError("Введите корректную сумму чека!")
		.test(
			"CheckSum",
			"Введите корректную сумму чека!",
			value => /^([1-9][0-9]*([,.][0-9]{1,2})?|0([.,][0-9]{1,2}){1})$/.test(String(value))
		),
	date: yup
		.date().typeError("Выберите корректную дату!"),
	image: yup
		.mixed()
		.notRequired()
})

export default oldReceipSchema