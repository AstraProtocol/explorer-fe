import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Tabs from 'components/Tabs/Tabs'
import useRouterTag from 'hooks/useRouterTag'
import NftTransferTab from './tabs/NftTransfers'

interface Props {
	token: string
	tokenId: string
	tokenData: TokenNFTMetadata
}

const NftDetailTab = ({ token, tokenId, tokenData }: Props) => {
	const [defaultTag, setTag] = useRouterTag()

	return (
		<BackgroundCard classes="margin-top-lg padding-bottom-lg">
			<Tabs
				tabChange={setTag}
				defaultTab={defaultTag}
				classes="none"
				tabs={[{ title: 'Token Transfers', id: 'token-transfers' }]}
				contents={{
					'token-transfers': <NftTransferTab token={token} tokenId={tokenId} tokenData={tokenData} />
				}}
			></Tabs>
		</BackgroundCard>
	)
}

export default NftDetailTab
