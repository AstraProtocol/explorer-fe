import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import Empty from 'components/Typography/Empty'
import { useState } from 'react'
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
	const [tabId, setTabId] = useState<string>('')
	const hashInternalTransactions = !isEmptyRawInput(input) && type === 'evm'
	const { rows: internalTransactionRows } = useInternalTransactions({
		hash: hashInternalTransactions ? evmHash : null
	})

	const rawTrace = useTxRawTrace(evmHash, type)
	const _tabChange = (tabId: string) => {
		setTabId(tabId)
	}

	const tabs = [
		{ title: 'Logs', id: 'log' },
		{ title: 'Raw Trace', id: 'trace' }
	]
	const contents = {
		log: <Log logs={logs} display={tabId === 'log'} />,
		trace: <RawTrace text={JSON.stringify(rawTrace, null, '\t')} />
	}

	if (type === 'cosmos') {
		tabs.unshift({ title: 'Token Transfer', id: 'transfers' })
		contents['transfers'] = (
			<Transactions rows={transactions} emptyMsg="There are no transfer for this transaction." />
		)
	} else {
		tabs.unshift({ title: 'Internal Transactions', id: 'internalTransaction' })
		tabs.unshift({ title: 'Token Transfer', id: 'transfers' })

		contents['transfers'] = (
			<Transactions rows={transactions} emptyMsg="There are no transfer for this transaction." />
		)
		contents['internalTransaction'] = (
			<Transactions
				rows={internalTransactionRows}
				emptyMsg="There are no internal transactions for this transaction.
        "
			/>
		)
	}
	return (
		<BackgroundCard>
			<Tabs tabs={tabs} contents={contents} tabChange={_tabChange}></Tabs>\
		</BackgroundCard>
	)
}
