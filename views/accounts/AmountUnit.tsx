interface Props {
	amount: string | number
	unit: string
	classes?: string
}

const AmountUnit = ({ amount, unit, classes }: Props) => {
	return (
		<span className={classes}>
			<span className="money money-sm">{amount} </span>
			<span className="money money-sm contrast-color-70">{unit}</span>
		</span>
	)
}

export default AmountUnit
