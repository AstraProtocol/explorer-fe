import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import StaticsCard from 'components/Card/Layout/StaticsCard'
import Row from 'components/Grid/Row'
import { Icon } from 'utils/enum'
import { formatCurrencyValue, formatGasValue } from 'utils/helper'

interface Props {
	classes?: string
	estimateCountedData: EstimateCountedInfo
	commonStatsData: CommonStats
	gasTracker: GasTracker
}

const ChainStatistics = ({ classes, commonStatsData, estimateCountedData, gasTracker }: Props) => {
	const { isMobile } = useMobileLayout('small')
	return (
		<Row classes={clsx('md-wrap', classes)} style={{ alignItem: 'space-between' }}>
			<StaticsCard
				classes={isMobile ? 'margin-bottom-lg' : 'margin-right-xl'}
				content={formatCurrencyValue(commonStatsData?.token_stats?.market_cap)}
				icon={Icon.Chart}
				title="Market Cap"
			/>
			<StaticsCard
				classes={isMobile ? 'margin-bottom-lg' : 'margin-right-xl'}
				content={formatGasValue(gasTracker?.average)}
				icon={Icon.Gas}
				title="Gas Tracker"
			/>
			<StaticsCard
				classes={isMobile ? 'margin-bottom-lg' : ''}
				content={commonStatsData?.transaction_stats?.number_of_transactions}
				icon={Icon.Analytics}
				title="Daily Transactions"
			/>
		</Row>
	)
}

export default ChainStatistics
