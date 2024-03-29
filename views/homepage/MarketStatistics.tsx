import { useMobileLayout } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import clsx from 'clsx'
import StaticsCard from 'components/Card/Layout/StaticsCard'
import numeral from 'numeral'
import { getLatestBlock } from 'slices/commonSlice'
import useSWR from 'swr'
import { Icon } from 'utils/enum'
import { useAppSelector } from '../../store/hooks'

interface Props {
	classes?: string
	estimateCountedData: EstimateCountedInfo
	commonStatsData: CommonStats
	hasFetchLatestBlock?: boolean
}

function getLastestBlock(latestBlock: LatestBlock) {
	return latestBlock ? parseInt(latestBlock.result.result) : undefined
}

const MarketStatistics = ({ classes, hasFetchLatestBlock, commonStatsData, estimateCountedData }: Props) => {
	const { isMobile } = useMobileLayout('small')
	const _fetchCondition = () => {
		if (!hasFetchLatestBlock) return ''
		return [API_LIST.LATEST_BLOCK]
	}
	const { data: latestBlockRaw, error: latestBlockError } = useSWR<LatestBlock>(_fetchCondition(), {
		refreshInterval: 2000
	})

	let latestBlock = useAppSelector(getLatestBlock)
	if (hasFetchLatestBlock) {
		latestBlock = getLastestBlock(latestBlockRaw)
	}

	return (
		<div className={classes}>
			<div className={clsx('row md-wrap', !isMobile && 'margin-bottom-2xl')}>
				<StaticsCard
					classes={isMobile ? 'margin-bottom-lg' : 'margin-right-xl'}
					contentClasses="money-2sm"
					content={`${commonStatsData?.average_block_time || 0} seconds`}
					icon={Icon.Recovery}
					title="Average Block Time"
				/>

				<StaticsCard
					classes={isMobile ? 'margin-bottom-lg' : ''}
					content={numeral(estimateCountedData?.total_transactions).format('0,0')}
					contentClasses="money-2sm"
					icon={Icon.Analytics}
					title="Total Transactions"
				/>
			</div>

			<div className={clsx('row md-wrap')}>
				<StaticsCard
					classes={isMobile ? 'margin-bottom-lg' : 'margin-right-xl'}
					contentClasses="money-2sm"
					content={numeral(latestBlock || estimateCountedData?.total_blocks).format('0,0')}
					icon={Icon.Database}
					title="Total Blocks"
				/>

				<StaticsCard
					classes={isMobile ? 'margin-bottom-lg' : ''}
					content={numeral(estimateCountedData?.wallet_addresses).format('0,0')}
					contentClasses="money-2sm"
					icon={Icon.Wallet}
					title="Addresses"
				/>
			</div>
		</div>
	)
}

export default MarketStatistics
