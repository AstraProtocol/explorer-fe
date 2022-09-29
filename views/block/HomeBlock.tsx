import { astraToEth } from '@astradefi/address-converter'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Container from 'components/Container'
import DotSpace from 'components/DotSpace'
import RowLoader from 'components/Loader/RowLoader'
import { getStakingValidatorByHex } from 'utils/address'
import { LinkMaker } from 'utils/helper'
import RowBrief from './BlockBriefRow'
import useBlock from './hook/useBlock'

export function HomeBlock() {
	const { top10, getPropserAddress } = useBlock()

	return (
		<Container>
			<div className="block-ver-center margin-bottom-md">
				<span className={clsx('contrast-color-70')}>Lastest Block</span>
				<DotSpace />
				<a href={LinkMaker.block()} className="link secondary-color-normal">
					View all Blocks
				</a>
			</div>

			{!top10 || top10.length === 0 ? (
				<RowLoader row={10} />
			) : (
				<BackgroundCard>
					{top10?.map(item => {
						const proposerHash = getPropserAddress(item.committedCouncilNodes)?.address
						const proposer = getStakingValidatorByHex(proposerHash)
						return (
							<RowBrief
								key={item.blockHeight}
								blockNumber={item.blockHeight}
								proposerAddress={astraToEth(proposer.initialDelegatorAddress)}
								proposerName={proposer.moniker}
								transactions={item.transactionCount}
								updatedAt={item.blockTime}
								newBlock={item.newBlock}
							/>
						)
					})}
				</BackgroundCard>
			)}
		</Container>
	)
}
