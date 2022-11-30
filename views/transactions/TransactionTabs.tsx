import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import Empty from 'components/Typography/Empty'
import useRouterTag from 'hooks/useRouterTag'
import { isEmptyRawInput } from 'utils/evm'
import useInternalTransactions from './hook/useInternalTransactions'
import useTxRawTrace from './hook/useTxRawTrace'
import Log from './Log'
import RawTrace from './RawTrace'
import TransactionRow, { TransactionRowProps } from './TransactionRow'

type TransactionTabsProps = {
	transactions?: TransactionRowProps[]
	evmHash?: string
	cosmosHash?: string
	type?: 'evm' | 'cosmos'
	input?: string
	logs?: EvmLog[]
}

export const Transactions = ({ rows, emptyMsg }: { rows: TransactionRowProps[]; emptyMsg: string }) => {
	return (
		<div style={{ overflowY: 'scroll' }}>
			{!rows || rows.length == 0 ? (
				<Empty text={emptyMsg} />
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
export default function TransactionTabs({
	transactions,
	evmHash,
	cosmosHash,
	type,
	input,
	logs
}: TransactionTabsProps) {
	const [defaultTag, setTag] = useRouterTag()
	const hashInternalTransactions = !isEmptyRawInput(input) && type === 'evm'
	const { rows: internalTransactionRows } = useInternalTransactions({
		hash: hashInternalTransactions ? evmHash : null
	})

	const rawTrace = useTxRawTrace(evmHash, type)

	const tabs = [
		{ title: 'Logs', id: 'logs' },
		{ title: 'Raw Trace', id: 'trace' }
	]
	const contents = {
		logs: <Log logs={logs} display evmHash={evmHash} />,
		trace: <RawTrace text={JSON.stringify(rawTrace, null, '\t')} />
	}

	if (type === 'cosmos') {
		tabs.unshift({ title: 'Token Transfers', id: 'transfers' })
		contents['transfers'] = (
			<Transactions rows={transactions} emptyMsg="There are no transfer for this transaction." />
		)
	} else {
		tabs.unshift({ title: 'Internal Transactions', id: 'internal-transactions' })
		tabs.unshift({ title: 'Token Transfers', id: 'transfers' })

		contents['transfers'] = (
			<Transactions rows={transactions} emptyMsg="There are no transfer for this transaction." />
		)
		contents['internal-transactions'] = (
			<Transactions
				rows={internalTransactionRows}
				emptyMsg="There are no internal transactions for this transaction.
        "
			/>
		)
	}

	return (
		<BackgroundCard>
			<Tabs defaultTab={defaultTag} tabs={tabs} contents={contents} tabChange={setTag} />
		</BackgroundCard>
	)
}
