import * as yup from "yup"

const minLogin = 5
const minPassword = 8

const profileSchema = yup.object().shape({
	name: yup
		.string()
		.required("Заполните поле имя!"),
	surname: yup
		.string()
		.required("Заполните поле фамилия!"),
	login: yup
		.string()
		.min(minLogin, `Длина должна быть не меньше ${minLogin} символов`)
		.matches(/[a-zA-Z]+/, "Используйте латиницу"),
	password: yup
		.mixed()
		.test(
			"",
			`Длина должна быть не меньше ${minPassword} символов`,
			function (value) {
				if (value.length !== 0 && value.length < 8) return false
				return true
			}
		),
	phone: yup
		.string()
		.matches(/^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm, "Введите корректно номер")
		.min(11, "Введите корректно номер")
		.max(12, "Введите корректно номер"),
	email: yup
		.string()
		.email("Введите корректный email")
		.required("Заполните поле email!"),

})

export default profileSchema