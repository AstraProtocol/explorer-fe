import { astraToEth } from '@astradefi/address-converter'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import DotSpace from 'components/DotSpace'
import RowLoader from 'components/Loader/RowLoader'
import Typography from 'components/Typography'
import { getStakingValidatorByHex } from 'utils/address'
import { LinkMaker } from 'utils/helper'
import BlockBriefRow from './BlockBriefRow'
import useBlock from './hook/useBlock'

import styles from './style.module.scss'

export function HomeBlock() {
	const { top10, getPropserAddress } = useBlock()

	return (
		<div>
			<div className="block-ver-center margin-bottom-md">
				<span className={clsx('contrast-color-70')}>Latest Block</span>
				<DotSpace />
				<Typography.LinkText href={LinkMaker.block()}>
					<span className="secondary-color-lighter">
						View all <span className="md-hide">Blocks</span>
					</span>
				</Typography.LinkText>
			</div>

			{!top10 || top10.length === 0 ? (
				<RowLoader row={10} />
			) : (
				<BackgroundCard classes={clsx(styles.card, 'padding-bottom-sm', 'md-min-height-unset')}>
					{top10?.map((item, index) => {
						const proposerHash = getPropserAddress(item.committedCouncilNodes)?.address
						const proposer = getStakingValidatorByHex(proposerHash) as Proposer
						return (
							<BlockBriefRow
								key={item.blockHeight}
								blockNumber={item.blockHeight}
								proposerAddress={astraToEth(proposer.initialDelegatorAddress)}
								proposerName={proposer.moniker}
								transactions={item.transactionCount}
								updatedAt={item.blockTime}
								newBlock={item.newBlock}
								border={index !== 0}
							/>
						)
					})}
				</BackgroundCard>
			)}
		</div>
	)
}
