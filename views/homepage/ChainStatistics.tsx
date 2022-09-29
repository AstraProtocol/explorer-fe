import StaticsCard from 'components/Card/Layout/StaticsCard'
import { Icon } from 'utils/enum'
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
				icon={Icon.Chart}
				title="Market Cap"
			/>
			<StaticsCard
				classes="col col-4"
				content={formatUnitValue(gasTracker?.average)}
				icon={Icon.Gas}
				title="Gas Tracker"
			/>
			<StaticsCard
				classes="col col-4"
				content={commonStatsData?.transaction_stats?.number_of_transactions}
				icon={Icon.Analytics}
				title="Daily Transactions"
			/>
		</div>
	)
}

export default ChainStatistics
