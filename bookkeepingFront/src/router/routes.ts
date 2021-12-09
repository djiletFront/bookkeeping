import {lazy} from "react"
import dashboard from "./icons/dashboard.svg"
import profile from "./icons/profile.svg"
import receipt from "./icons/receipt.svg"
import support from "./icons/support.svg"
import {RouteInterface} from "../types/route.interface"

export const routes: RouteInterface[] = [
	{
		title: "Профиль",
		privatePage: true,
		sidebar: {
			top: true
		},
		icon: profile,
		component: lazy(() => import("../pages/Profile/")),
		link: "/Profile",
	},
	{
		title: "Статистика",
		privatePage: true,
		sidebar: {
			top: true
		},
		icon: dashboard,
		component: lazy(() => import("../pages/Dashboard/")),
		link: "/Dashboard",
	},
	{
		title: "Чеки",
		privatePage: true,
		sidebar: {
			top: true
		},
		icon: receipt,
		component: lazy(() => import("../pages/Receipts/")),
		link: "/Receipts",
	},
	{
		title: "Чек",
		privatePage: true,
		component: lazy(() => import("../pages/Receipt/")),
		link: "/Receipts/:id",
	},
	{
		title: "Поддержка",
		privatePage: true,
		sidebar: {
			top: false
		},
		icon: support,
		component: lazy(() => import("../pages/Support/")),
		link: "/Support",
	},
	{
		title: "Логин",
		privatePage: false,
		component: lazy(() => import("../pages/Login/")),
		link: "/Login",
	}
]