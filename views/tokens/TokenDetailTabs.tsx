import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import TokenHolderTab from './tabs/TokenHolderTab'
import AddressTransactionTab from './tabs/TokenTransactionTab'

interface Props {
	token: string
	tokenData: Token
}

const TokenDetailTab = ({ token, tokenData }: Props) => {
	return (
		<BackgroundCard classes="margin-top-lg padding-bottom-lg">
			<Tabs
				classes="none"
				tabs={[
					{ title: 'Token Transfers', id: '1' },
					{ title: 'Token Holders', id: '2' }
				]}
				contents={{
					'1': <AddressTransactionTab token={token} />,
					'2': <TokenHolderTab token={token} tokenData={tokenData} />
				}}
			></Tabs>
		</BackgroundCard>
	)
}

export default TokenDetailTab
