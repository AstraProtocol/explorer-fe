import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Container from 'components/Container'
import DotSpace from 'components/DotSpace'
import RowLoader from 'components/Loader/RowLoader'
import Typography from 'components/Typography'
import { convertBalanceToView, LinkMaker } from 'utils/helper'
import useTransaction from './hook/useTransaction'
import RowBrief from './TransactionBriefRow'

export function HomeTransactions() {
	const { top10 } = useTransaction()
	return (
		<Container>
			<div className="block-ver-center margin-bottom-md">
				<span className={clsx('contrast-color-70')}>Latest Transactions</span>
				<DotSpace />
				<Typography.LinkText href={LinkMaker.transaction()}>View all transactions</Typography.LinkText>
			</div>

			{!top10 || top10.length === 0 ? (
				<RowLoader row={10} />
			) : (
				<BackgroundCard>
					{top10?.map((item, index) => (
						<RowBrief
							key={item.hash}
							hash={item.hash}
							balance={{ value: convertBalanceToView('000'), token: 'ASA' }}
							from="0x123123123123123123123123123123"
							to="0x2139847192384719234"
							updatedAt={item.blockTime}
							newTransaction={item.newTransaction}
							border={index !== top10.length - 1}
							transactionType={item?.messages[0]?.type}
						/>
					))}
				</BackgroundCard>
			)}
		</Container>
	)
}
