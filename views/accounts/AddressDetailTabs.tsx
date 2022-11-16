import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import useRouterTag from 'hooks/useRouterTag'
import { AddressTypeEnum } from 'utils/enum'

import AddressCoinBalanceTab from './tabs/AddressCoinBalanceTab'
import AddressInternalTransactionTab from './tabs/AddressInternalTransactionTab'
import AddressTokenTab from './tabs/AddressTokenTab'
import AddressTokenTransferTab from './tabs/AddressTokenTransferTab'
import AddressTransactionTab from './tabs/AddressTransactionTab'
import ContractCodeTab from './tabs/ContractCodeTab'
import ContractTransactionTab from './tabs/ContractTransactionTab'

interface Props {
	address: string
	addressData: Address
}

const AddressDetailTab = ({ address, addressData }: Props) => {
	const isContract = addressData.type === AddressTypeEnum.Contract
	const [defaultTag, setTag] = useRouterTag()
	const isVerify = false
	// contract verify?
	return (
		<BackgroundCard classes="margin-top-lg padding-bottom-lg">
			<Tabs
				tabChange={setTag}
				defaultTab={defaultTag}
				classes="none"
				tabs={[
					{ title: 'Transactions', id: 'transactions' },
					{ title: 'Token Transfer', id: 'token-transfer' },
					{ title: 'Tokens', id: 'tokens' },
					{ title: 'Internal Transactions', id: 'internal-transactions' },
					{ title: 'Coin Balance History', id: 'balance-history' },

					isContract && {
						title: (
							<span>
								Code <span className={isVerify ? 'icon-checked alert-color-success' : ''}></span>
							</span>
						),
						id: 'code'
					}
				]}
				contents={{
					'transactions': isContract ? (
						<ContractTransactionTab address={address} />
					) : (
						<AddressTransactionTab address={address} />
					),
					'token-transfer': <AddressTokenTransferTab address={address} />,
					'tokens': <AddressTokenTab address={address} />,
					'internal-transactions': <AddressInternalTransactionTab address={address} />,
					'balance-history': <AddressCoinBalanceTab address={address} />,
					'code': isContract ? <ContractCodeTab address={address} /> : <div />
				}}
			></Tabs>
		</BackgroundCard>
	)
}

export default AddressDetailTab
