import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import useRouterTag from 'hooks/useRouterTag'
import { isERC721 } from 'utils/helper'
import InventoryTab from './tabs/InventoryTab'
import TokenHolderTab from './tabs/TokenHolderTab'
import TokenTransactionTab from './tabs/TokenTransactionTab'

interface Props {
	token: string
	tokenData: Token
}

const TokenDetailTab = ({ token, tokenData }: Props) => {
	const [defaultTag, setTag] = useRouterTag()
	const isNFT = isERC721(tokenData.type)

	const tabs = [
		{ title: 'Transactions', id: 'token-transactions' },
		{ title: 'Token Holders', id: 'token-holders' }
	]
	if (isNFT) tabs.push({ title: 'Inventory', id: 'inventory' })

	return (
		<BackgroundCard classes="margin-top-lg padding-bottom-lg">
			<Tabs
				tabChange={setTag}
				defaultTab={defaultTag}
				classes="none"
				tabs={tabs}
				contents={{
					'token-transactions': <TokenTransactionTab token={token} tokenData={tokenData} />,
					'token-holders': <TokenHolderTab token={token} tokenData={tokenData} />,
					'inventory': isNFT ? <InventoryTab token={token} /> : <div />
				}}
			></Tabs>
		</BackgroundCard>
	)
}

export default TokenDetailTab
