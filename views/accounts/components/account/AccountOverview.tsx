import AccountAssets from './AccountAssets'
import AccountVesting from './AccountVesting'

interface Props {
	addressData: Address
	address: string
}

const AccountOverview = ({ addressData, address }: Props) => {
	return (
		<div>
			<AccountAssets address={address} addressData={addressData} />
			{/* <AccountDelegation addressData={addressData} address={address} /> */}
			<AccountVesting addressData={addressData} />
		</div>
	)
}

export default AccountOverview
