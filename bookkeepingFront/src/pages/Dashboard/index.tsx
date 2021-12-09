import React, {useEffect, useState} from "react"
import "./index.scss"
import StatisticsBlock from "../../components/StatisticsBlock"
import allTime from "./icons/allTime.svg"
import monthTime from "./icons/monthTime.svg"
import ChartDonut from "../../components/ChartDonut"
import {useDispatch, useSelector} from "react-redux"
import {FETCH_RECEIPTS, RESET_RECEIPTS_STATE} from "../../store/actionTypes/receipts"
import {Card,} from "@mui/material"
import MonthDatePicker from "../../components/common/MonthDatePicker"
import {RootState} from "../../store/reducers/rootReducer"
import {formatSum, statisticsForCategories, TotalSum} from "../../utils/sumForDashboard"
import Spinner from "../../components/Spinner"
import AccordionStatistics from "../../components/AccordionStatistics/index."

const Dashboard = () => {
	const dispatch = useDispatch()

	const {receipts, loading} = useSelector((state: RootState) => state.receipts)

	useEffect(() => {
		dispatch({type: FETCH_RECEIPTS})
		return () => {
			dispatch({type: RESET_RECEIPTS_STATE})
		}
	}, [dispatch])

	const [date, setDate] = useState(new Date())

	let totalSum: string | number = 0
	let currentMonthSum: string | number = 0
	let selectedMonthSum: string | number = 0
	let statistics = []

	if (!loading) {
		totalSum = formatSum(TotalSum(receipts))
		currentMonthSum = formatSum(TotalSum(receipts, new Date()))
		selectedMonthSum = formatSum(TotalSum(receipts, date))
		statistics = statisticsForCategories(receipts, date)
	}
	if (loading) return <Spinner/>
	return (
		<div className="dashboard">
			<div className="dashboard__header">
				<StatisticsBlock
					title="ЗА ВСЕ ВРЕМЯ"
					sum={totalSum}
					icon={allTime}
					iconBackground="rgb(254,163,110)"
				/>
				<StatisticsBlock
					title="ЗА ТЕКУЩИЙ МЕСЯЦ"
					sum={currentMonthSum}
					icon={monthTime}
					iconBackground="rgb(126,231,140)"
				/>
			</div>
			<Card className="dashboard__main">
				<div className="dashboard__calendar">
					<MonthDatePicker
						value={date}
						setValue={setDate}
					/>
				</div>
				<div className="dashboard__statistics">
					<div className="statistics__chart">
						<p className="chart__title">Cтатистика</p>
						<ChartDonut statistics={statistics}/>
					</div>
					<div className="statistics__accordion">
						<AccordionStatistics
							statistics={statistics}
							selectedMonthSum={selectedMonthSum}
							date={date}
						/>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default Dashboard
