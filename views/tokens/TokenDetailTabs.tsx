import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import useRouterTag from 'hooks/useRouterTag'
import TokenHolderTab from './tabs/TokenHolderTab'
import AddressTransactionTab from './tabs/TokenTransactionTab'

interface Props {
	token: string
	tokenData: Token
}

const TokenDetailTab = ({ token, tokenData }: Props) => {
	const [defaultTag, setTag] = useRouterTag()
	return (
		<BackgroundCard classes="margin-top-lg padding-bottom-lg">
			<Tabs
				tabChange={setTag}
				defaultTab={defaultTag}
				classes="none"
				tabs={[
					{ title: 'Token Transfers', id: 'token-transfers' },
					{ title: 'Token Holders', id: 'token-holders' }
				]}
				contents={{
					'token-transfers': <AddressTransactionTab token={token} tokenData={tokenData} />,
					'token-holders': <TokenHolderTab token={token} tokenData={tokenData} />
				}}
			></Tabs>
		</BackgroundCard>
	)
}

export default TokenDetailTab
