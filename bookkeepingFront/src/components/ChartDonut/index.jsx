import React, {useEffect} from "react"
/* global Chart */

const ChartDonut = ({statistics}) => {
	const config = {
		type: "doughnut",
		data: {
			labels: statistics.map(category => category["name"]),
			datasets: [{
				label: "# of Votes",
				data: statistics.map(category => category["sum"]),
				backgroundColor: [
					"rgba(255, 99, 132, 0.85)",
					"rgba(255, 159, 64, 0.85)",
					"rgba(255,222,0,0.85)",
					"rgba(75, 192, 192, 0.85)",
					"rgba(54, 162, 235, 0.85)",
				],
				borderColor: [
					"rgb(255, 99, 132)",
					"rgb(255, 159, 64)",
					"rgb(255, 222, 0)",
					"rgb(75, 192, 192)",
					"rgb(54, 162, 235)",
				],
				borderWidth: 1,
				borderRadius: 1
			}]
		},
		options: {
			responsive: true,
			plugins: {
				subtitle: {
					display: false
				},
				legend: {
					position: "bottom",
				},
				tooltip: {
					displayColors: false,
					titleFontSize: 100,
					bodyFontSize: 31,
					footerFontSize: 31,
					backgroundColor: "#000000",
					bodyAlign: "center",
					callbacks: {
						label: function (context) {
							return `${context.label} ${context.raw} ₽`
						}
					},
				},
			},
		}
	}

	useEffect(() => {
		const ctx = document.getElementById("StatisticChart")
		const myChart = new Chart(ctx, config)
		return () => {
			myChart.destroy()
		}
	}, [statistics])

	return (
		<>
			<canvas id="StatisticChart"></canvas>
		</>
	)
}

export default ChartDonut
