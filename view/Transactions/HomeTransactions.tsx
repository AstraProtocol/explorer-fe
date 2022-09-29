import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Container from 'components/Container'
import DotSpace from 'components/DotSpace'
import RowLoader from 'components/Loader/RowLoader'
import { convertBalanceToView, LinkMaker } from 'utils/helper'
import useTransaction from './hook/useTransaction'
import RowBrief from './TransactionBriefRow'

export function HomeTransactions() {
	const { top10 } = useTransaction()
	return (
		<Container>
			<div className="block-ver-center margin-bottom-md">
				<span className={clsx('contrast-color-70')}>Lastest Transactions</span>
				<DotSpace />
				<a href={LinkMaker.transaction()} className="link secondary-color-normal">
					View all transactions
				</a>
			</div>

			{!top10 || top10.length === 0 ? (
				<RowLoader row={10} />
			) : (
				<BackgroundCard>
					{top10?.map(item => (
						<RowBrief
							key={item.blockHash}
							hash={item.blockHash}
							balance={{ value: convertBalanceToView('000'), token: 'ASA' }}
							from="0x123123123123123123123123123123"
							to="0x2139847192384719234"
							updatedAt={item.blockTime}
							newTransaction={item.newTransaction}
						/>
					))}
				</BackgroundCard>
			)}
		</Container>
	)
}
