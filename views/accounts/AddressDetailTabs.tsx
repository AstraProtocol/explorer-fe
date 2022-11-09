import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
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
	// contract verify?
	return (
		<BackgroundCard classes="margin-top-lg padding-bottom-lg">
			<Tabs
				classes="none"
				tabs={[
					{ title: 'Transactions', id: '1' },
					{ title: 'Token Transfer', id: '2' },
					{ title: 'Tokens', id: '3' },
					{ title: 'Internal Transactions', id: '4' },
					{ title: 'Coin Balance History', id: '5' },
					isContract && {
						title: (
							<span>
								Code <span className="icon-checked alert-color-success"></span>
							</span>
						),
						id: '6'
					}
				]}
				contents={{
					'1': isContract ? (
						<ContractTransactionTab address={address} />
					) : (
						<AddressTransactionTab address={address} />
					),
					'2': <AddressTokenTransferTab address={address} />,
					'3': <AddressTokenTab address={address} />,
					'4': <AddressInternalTransactionTab address={address} />,
					'5': <AddressCoinBalanceTab address={address} />,
					'6': <ContractCodeTab address={address} />
				}}
			></Tabs>
		</BackgroundCard>
	)
}

export default AddressDetailTab
