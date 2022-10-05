import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import Empty from 'components/Typography/Empty'
import useInternalTransactions from './hook/useInternalTransactions'
import TransactionRow, { TransactionRowProps } from './TransactionRow'

type TransactionTabsProps = {
	transactions?: TransactionRowProps[]
	evmHash?: string
	cosmosHash?: string
}

const Transactions = ({ rows }: { rows: TransactionRowProps[] }) => {
	return (
		<div>
			{!rows || rows.length == 0 ? (
				<Empty />
			) : (
				<>
					{rows?.map((item, index) => (
						<TransactionRow key={item.hash + index} {...item} style="inject" />
					))}
				</>
			)}
		</div>
	)
}
export default function TransactionTabs({ transactions, evmHash, cosmosHash }: TransactionTabsProps) {
	const { rows: internalTransactionRows } = useInternalTransactions({ hash: evmHash })

	return (
		<BackgroundCard>
			<Tabs
				tabs={[
					{ title: 'Token Transfer', id: 'transfers' },
					{ title: 'Internal Transactions', id: 'internalTransaction' },
					{ title: 'Logs', id: 'log' },
					{ title: 'Raw Trace', id: 'trace' }
				]}
				contents={{
					transfers: <Transactions rows={transactions} />,
					internalTransaction: <Transactions rows={internalTransactionRows} />,
					log: <span>Logs</span>,
					trace: <span>Raw trace</span>
				}}
			></Tabs>
		</BackgroundCard>
	)
}
