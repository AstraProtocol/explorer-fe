import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import Empty from 'components/Typography/Empty'
import { caculateCosmosAmount, getCosmosType } from 'utils/cosmos'
import TransactionRow from 'views/transactions/TransactionRow'
import AddressTokenTransferTab from './tabs/AddressTokenTransferTab'

interface Props {
	address: string
}

const AddressDetailTabs = ({ address }: Props) => {
	const transactions = []
	return (
		<BackgroundCard classes="margin-top-lg padding-bottom-lg">
			<Tabs
				classes="none"
				tabs={[
					{ title: 'Transactions', id: '1' },
					{ title: 'Token Transfer', id: '2' },
					{ title: 'Tokens', id: '3' },
					{ title: 'Internal Transactions', id: '4' },
					{ title: 'Coin Balance History', id: '5' }
				]}
				contents={{
					'1': (
						<div>
							{!transactions || transactions.length == 0 ? (
								<Empty />
							) : (
								<>
									{transactions?.map((item, index) => {
										const fee = caculateCosmosAmount(item.fee)
										return (
											<TransactionRow
												key={item.hash}
												blockNumber={item.blockHeight}
												updatedAt={item.blockTime}
												fee={fee.amount}
												feeToken={fee.denom}
												status={item.success}
												hash={item.hash}
												from={''}
												to={''}
												value={undefined}
												valueToken="asa"
												type={getCosmosType(item?.messages[0]?.type)}
												newBlock={item.newTransaction}
												transactionType={item?.messages[0]?.type}
												style="inject"
												order={index === transactions.length - 1 ? 'end' : ''}
											/>
										)
									})}
								</>
							)}
						</div>
					),
					'2': <AddressTokenTransferTab address={address} />,
					'3': (
						<div>
							{!transactions || transactions.length == 0 ? (
								<Empty />
							) : (
								<>
									{transactions?.map((item, index) => {
										const fee = caculateCosmosAmount(item.fee)
										return (
											<TransactionRow
												key={item.hash}
												blockNumber={item.blockHeight}
												updatedAt={item.blockTime}
												fee={fee.amount}
												feeToken={fee.denom}
												status={item.success}
												hash={item.hash}
												from={''}
												to={''}
												value={undefined}
												valueToken="asa"
												type={getCosmosType(item?.messages[0]?.type)}
												newBlock={item.newTransaction}
												transactionType={item?.messages[0]?.type}
												style="inject"
												order={index === transactions.length - 1 ? 'end' : ''}
											/>
										)
									})}
								</>
							)}
						</div>
					),
					'4': (
						<div>
							{!transactions || transactions.length == 0 ? (
								<Empty />
							) : (
								<>
									{transactions?.map((item, index) => {
										const fee = caculateCosmosAmount(item.fee)
										return (
											<TransactionRow
												key={item.hash}
												blockNumber={item.blockHeight}
												updatedAt={item.blockTime}
												fee={fee.amount}
												feeToken={fee.denom}
												status={item.success}
												hash={item.hash}
												from={''}
												to={''}
												value={undefined}
												valueToken="asa"
												type={getCosmosType(item?.messages[0]?.type)}
												newBlock={item.newTransaction}
												transactionType={item?.messages[0]?.type}
												style="inject"
												order={index === transactions.length - 1 ? 'end' : ''}
											/>
										)
									})}
								</>
							)}
						</div>
					),
					'5': (
						<div>
							{!transactions || transactions.length == 0 ? (
								<Empty />
							) : (
								<>
									{transactions?.map((item, index) => {
										const fee = caculateCosmosAmount(item.fee)
										return (
											<TransactionRow
												key={item.hash}
												blockNumber={item.blockHeight}
												updatedAt={item.blockTime}
												fee={fee.amount}
												feeToken={fee.denom}
												status={item.success}
												hash={item.hash}
												from={''}
												to={''}
												value={undefined}
												valueToken="asa"
												type={getCosmosType(item?.messages[0]?.type)}
												newBlock={item.newTransaction}
												transactionType={item?.messages[0]?.type}
												style="inject"
												order={index === transactions.length - 1 ? 'end' : ''}
											/>
										)
									})}
								</>
							)}
						</div>
					)
				}}
			></Tabs>
		</BackgroundCard>
	)
}

export default AddressDetailTabs
