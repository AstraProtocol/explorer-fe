import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import Empty from 'components/Typography/Empty'
import { isEmptyRawInput } from 'utils/evm'
import useInternalTransactions from './hook/useInternalTransactions'
import TransactionRow, { TransactionRowProps } from './TransactionRow'

type TransactionTabsProps = {
	transactions?: TransactionRowProps[]
	evmHash?: string
	cosmosHash?: string
	type?: 'evm' | 'cosmos'
	input?: string
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
export default function TransactionTabs({ transactions, evmHash, cosmosHash, type, input }: TransactionTabsProps) {
	const hashInternalTransactions = !isEmptyRawInput(input) && type === 'evm'
	const { rows: internalTransactionRows } = useInternalTransactions({
		hash: hashInternalTransactions ? evmHash : null
	})
	const tabs = [
		{ title: 'Logs', id: 'log' },
		{ title: 'Raw Trace', id: 'trace' }
	]
	const contents = {
		log: <span>Logs</span>,
		trace: <span>Raw trace</span>
	}
	if (type === 'cosmos') {
		tabs.unshift({ title: 'Token Transfer', id: 'transfers' })
		contents['transfers'] = <Transactions rows={transactions} />
	} else {
		tabs.unshift({ title: 'Internal Transactions', id: 'internalTransaction' })
		tabs.unshift({ title: 'Token Transfer', id: 'transfers' })

		contents['transfers'] = <Transactions rows={transactions} />
		contents['internalTransaction'] = <Transactions rows={internalTransactionRows} />
	}
	return (
		<BackgroundCard>
			<Tabs tabs={tabs} contents={contents}></Tabs>
		</BackgroundCard>
	)
}
