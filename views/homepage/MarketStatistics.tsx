import API_LIST from 'api/api_list'
import clsx from 'clsx'
import StaticsCard from 'components/Card/Layout/StaticsCard'
import useSWR from 'swr'
import { Icon } from 'utils/enum'

interface Props {
	classes?: string
	estimateCountedData: EstimateCountedInfo
	commonStatsData: CommonStats
}

function getLastestBlock(latestBlock: LatestBlock) {
	return latestBlock ? parseInt(latestBlock.result) : undefined
}

const MarketStatistics = ({ classes, commonStatsData, estimateCountedData }: Props) => {
	const _fetchCondition = key => {
		switch (key) {
			case 'latest_block':
				return [API_LIST.LATEST_BLOCK]
		}
	}
	const { data: latestBlockRaw, error: latestBlockError } = useSWR<LatestBlock>(_fetchCondition('latest_block'), {
		refreshInterval: 2000
	})
	const latestBlock = getLastestBlock(latestBlockRaw)

	return (
		<div className="md-wrap">
			<div className={clsx('row margin-bottom-2xl')}>
				<StaticsCard
					classes="margin-right-xl"
					contentClasses="money-2sm"
					content={`${commonStatsData?.average_block_time} seconds`}
					icon={Icon.Recovery}
					title="Average Block Time"
				/>

				<StaticsCard
					content={estimateCountedData?.total_transactions}
					contentClasses="money-2sm"
					icon={Icon.Analytics}
					title="Total Transactions"
				/>
			</div>

			<div className={clsx('row')}>
				<StaticsCard
					classes="margin-right-xl"
					contentClasses="money-2sm"
					content={latestBlock || estimateCountedData?.total_blocks}
					icon={Icon.Database}
					title="Total Blocks"
				/>

				<StaticsCard
					content={estimateCountedData?.wallet_addresses}
					contentClasses="money-2sm"
					icon={Icon.Wallet}
					title="Wallet Addresses"
				/>
			</div>
		</div>
	)
}

export default MarketStatistics
