import React from "react"
import {Avatar, Paper} from "@mui/material"
import "./index.scss"

interface StatisticsBlockProps {
	title: string,
	sum: string | number,
	icon: string
	iconBackground: string,
}

const StatisticsBlock = ({
	title,
	sum,
	icon,
	iconBackground
}: StatisticsBlockProps) => {
	return (
		<Paper elevation={3} className="statistics-block">
			<div className="statistics-block__description">
				<p className="description__title">{title}</p>
				<p className="description__sum">₽ {sum}</p>
			</div>
			<div className="statistics-block__icon">
				<Avatar sx={{backgroundColor: `${iconBackground}`, mt: "15px"}}>
					<img src={icon} width="27.5" height="27.5" alt="allTime"/>
				</Avatar>
			</div>
		</Paper>
	)
}

export default StatisticsBlock
