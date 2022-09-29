import { ethToAstra } from '@astradefi/address-converter'
import API_LIST from 'api/api_list'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Container from 'components/Container'
import DotSpace from 'components/DotSpace'
import RowLoader from 'components/Loader/RowLoader'
import { getValidatorSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import useSWR from 'swr'
import { LinkMaker } from 'utils/helper'
import RowBrief from './BlockBriefRow'

export function HomeBlock() {
	const validatorSummary = useAppSelector(getValidatorSummary)
	const _fetchCondition = () => {
		return [API_LIST.ALL_BLOCKS]
	}

	const { data } = useSWR<BlockResponse>(_fetchCondition(), { refreshInterval: 2000 })
	const blockTop10 = data?.items?.slice(0, 10)

	console.log(blockTop10)

	return (
		<Container>
			<div className="block-ver-center margin-bottom-md">
				<span className={clsx('contrast-color-70')}>Lastest Block</span>
				<DotSpace />
				<a href={LinkMaker.block()} className="link secondary-color-normal">
					View all Blocks
				</a>
			</div>

			{!blockTop10 || blockTop10.length === 0 ? (
				<RowLoader row={10} />
			) : (
				<BackgroundCard>
					{blockTop10?.map(item => (
						<RowBrief
							validator={validatorSummary.find(
								(v: ValidatorData) => v.initialDelegatorAddress == ethToAstra(item.miner_hash)
							)}
							key={item.number}
							blockNumber={item.number}
							proposerAddress={item.miner_hash}
							transactions={0}
							updatedAt={item.timestamp}
						/>
					))}
				</BackgroundCard>
			)}
		</Container>
	)
}
