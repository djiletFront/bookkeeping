import React, {ReactNode} from "react"

export interface RouteInterface {
	title: string,
	privatePage: boolean,
	sidebar?: Sidebar,
	icon?: ReactNode,
	component: React.FC,
	link: string
}

type Sidebar = {
	top: boolean
}