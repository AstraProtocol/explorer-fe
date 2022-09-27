import API_LIST from 'api/api_list'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Container from 'components/Container'
import DotSpace from 'components/DotSpace'
import RowLoader from 'components/Loader/RowLoader'
import useSWR from 'swr'
import { convertBalanceToView } from 'utils/helper'
import RowBrief from './TransactionBriefRow'

export function HomeTransactions() {
	const _fetchCondition = () => {
		return [API_LIST.ALL_TRANSACTIONS]
	}
	const { data } = useSWR<TransactionResponse>(_fetchCondition())
	const top10 = data?.items?.slice(0, 10)
	return (
		<Container>
			<div className="block-ver-center margin-bottom-md">
				<span className={clsx('contrast-color-70')}>Lastest Transactions</span>
				<DotSpace />
				<a href="/block" className="link secondary-color-normal">
					View all transactions
				</a>
			</div>

			{!top10 || top10.length === 0 ? (
				<RowLoader row={10} />
			) : (
				<BackgroundCard>
					{top10?.map(item => (
						<RowBrief
							key={item.hash}
							hash={item.hash}
							balance={{ value: convertBalanceToView(item.value.value), token: 'ASA' }}
							from="0x123123123123123123123123123123"
							to="0x2139847192384719234"
							updatedAt={new Date().getTime()}
						/>
					))}
				</BackgroundCard>
			)}
		</Container>
	)
}
