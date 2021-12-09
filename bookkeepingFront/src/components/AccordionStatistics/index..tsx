import React, {useEffect} from "react"
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {formatSum} from "../../utils/sumForDashboard"
import "./index.scss"
import ReceiptCard from "../ReceiptCard"
import {ApiReceiptInterface} from "../../types/apiReceipt.interface"

interface AccordionStatisticsProps {
	statistics: Array<Category>,
	selectedMonthSum: string | number,
	date: string | Date
}

interface Category {
	name: string,
	sum: string | number,
	receipts: Array<ApiReceiptInterface>
}

const AccordionStatistics = ({
	statistics,
	selectedMonthSum,
	date
}: AccordionStatisticsProps) => {

	const [expanded, setExpanded] = React.useState("")

	useEffect(() => {
		setExpanded("")
	}, [date])

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : "")
	}
	return (
		<>
			<h2 className="accordion-title">Итог: <i><u>{formatSum(selectedMonthSum)}</u></i></h2>
			{
				statistics.map((category: Category, key: number) => {
					return (
						<Accordion
							key={key}
							expanded={expanded === category.name}
							onChange={handleChange(category.name)}
							className="accordion-category"
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon/>}
								aria-controls="panel1bh-content"
								className="category__body"
							>
								<div className="category__body__text">
									<p className="category__name">{category.name}</p>
									<p className="category__sum">{formatSum(category.sum)}</p>
								</div>
							</AccordionSummary>
							<AccordionDetails sx={{display: "flex", rowGap: "10px"}}>
								{
									category.receipts.map((receipt: ApiReceiptInterface, key: number) => {
										return (
											<React.Fragment key={key}>
												<ReceiptCard receipt={receipt}/>
											</React.Fragment>
										)
									})
								}
							</AccordionDetails>
						</Accordion>
					)
				})
			}
		</>
	)
}

export default AccordionStatistics