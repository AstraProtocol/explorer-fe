import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import Image from 'next/image'

interface Props {
	token: string
	tokenId: string
	tokenData: TokenNFTMetadata
}

const NftOverview = ({ token, tokenData, tokenId }: Props) => {
	const tokenImage = tokenData?.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
	return (
		<BackgroundCard classes="padding-top-lg padding-bottom-lg margin-top-2xl padding-left-2xl padding-right-2xl">
			<Row>
				<div className="col-6 margin-right-md">
					<Row style={{ justifyContent: 'space-between' }}>
						<span className="text text-base contrast-color-50">Token ID:</span>
						<span className="text text-base">{tokenId}</span>
					</Row>
					<Row style={{ justifyContent: 'space-between' }}>
						<span className="text text-base contrast-color-50">Name:</span>
						<span className="text text-base">{tokenData.name}</span>
					</Row>

					<Row style={{ justifyContent: 'space-between' }}>
						<span className="text text-base contrast-color-50">Description:</span>
						<span className="text text-base">{tokenData.description}</span>
					</Row>
				</div>
				<div className="col-6 flex flex-justify-end">
					<Image src={tokenImage} alt={tokenData.name} height={100} width={120} layout="fixed" />
				</div>
			</Row>
		</BackgroundCard>
	)
}

export default NftOverview
