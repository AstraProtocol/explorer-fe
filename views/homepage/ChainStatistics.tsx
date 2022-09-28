import StaticsCard from 'components/Card/Layout/StaticsCard'
import { formatCurrencyValue, formatUnitValue } from 'utils/helper'

interface Props {
	classes?: string
	estimateCountedData: EstimateCountedInfo
	commonStatsData: CommonStats
	gasTracker: GasTracker
}

const ChainStatistics = ({ classes, commonStatsData, estimateCountedData, gasTracker }: Props) => {
	return (
		<div className="row md-wrap">
			<StaticsCard
				classes="col col-4"
				content={formatCurrencyValue(commonStatsData?.token_stats?.market_cap)}
				icon="copy-icon"
				title="Market Cap"
			/>
			<StaticsCard
				classes="col col-4"
				content={formatUnitValue(gasTracker?.average)}
				icon="copy-icon"
				title="Gas Tracker"
			/>
			<StaticsCard
				classes="col col-4"
				content={commonStatsData?.transaction_stats?.number_of_transactions}
				icon="copy-icon"
				title="Daily Transactions"
			/>
		</div>
	)
}

export default ChainStatistics
