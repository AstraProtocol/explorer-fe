import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Container from 'components/Container'
import DotSpace from 'components/DotSpace'
import RowLoader from 'components/Loader/RowLoader'
import { LinkMaker } from 'utils/helper'
import RowBrief from './BlockBriefRow'
import useBlock from './hook/useBlock'

export function HomeBlock() {
	const { top10 } = useBlock()
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
					{top10?.map(item => (
						<RowBrief
							key={item.number}
							blockNumber={item.number}
							proposerAddress={item.miner_hash}
							transactions={0}
							updatedAt={item.timestamp}
							newBlock={item.newBlock}
						/>
					))}
				</BackgroundCard>
			)}
		</Container>
	)
}
