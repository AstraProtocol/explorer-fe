import { Pagination } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import Row from 'components/Grid/Row'
import Empty from 'components/Typography/Empty'
import { getTransactionType } from 'utils/cosmos'
import { TransactionTypeEnum } from 'utils/enum'
import useBlockById from 'views/block/hook/useBlockById'
import TransactionRow from 'views/transactions/TransactionRow'

interface Props {
	blockHeight: string
}

const BlockTransactionTab = ({ blockHeight }: Props) => {
	const { result, pagination, changePage } = useBlockById(blockHeight)
	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Transactions</span>
				<div>
					<Pagination
						total={pagination.total * pagination.limit}
						limit={pagination.limit}
						currentPage={pagination.page}
						onChange={changePage}
					/>
				</div>
			</Row>
			<div style={{ overflowY: 'auto' }}>
				{!result || result.length == 0 ? (
					<Empty text={'There are no transactions for this block.'} />
				) : (
					<>
						{result?.map((transaction, index) => {
							return (
								<TransactionRow
									key={transaction.hash}
									blockNumber={transaction.blockHeight}
									updatedAt={transaction.blockTime}
									fee={transaction.totalFee.amount}
									status={transaction.success}
									hash={transaction.hash}
									from={''}
									to={''}
									value={undefined}
									valueToken={process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames}
									type={getTransactionType(transaction?.messages[0]?.type as TransactionTypeEnum)}
									newBlock={false}
									style="normal"
								/>
							)
						})}
					</>
				)}
			</div>
			<div
				style={{ justifyContent: 'space-between', display: 'flex' }}
				className="padding-right-xl padding-left-xl padding-top-md"
			>
				<div></div>
				<div>
					<Pagination
						total={pagination.total * pagination.limit}
						currentPage={pagination.page}
						limit={pagination.limit}
						onChange={changePage}
					/>
				</div>
			</div>
		</div>
	)
}

export default BlockTransactionTab
